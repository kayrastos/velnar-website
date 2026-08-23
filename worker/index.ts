/// <reference types="@cloudflare/workers-types" />

import {
  SERVER_PRICES,
  isValidPackageId,
  isValidMarket,
  isValidLanguage,
  getPackagePriceInfo,
  PackageId,
  Market,
  Language,
} from './pricing';
import {
  BuyerInput,
  IyzicoInitializeRequest,
  initializeIyzicoCheckoutForm,
  retrieveIyzicoCheckoutForm,
} from './iyzico';
import {
  createSignedPaymentState,
  verifySignedPaymentState,
  PaymentStatePayload,
} from './state';

export interface Env {
  ASSETS: Fetcher;
  IYZICO_API_KEY?: string;
  IYZICO_SECRET_KEY?: string;
  IYZICO_BASE_URL?: string;
}

function jsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function sanitizeString(str: unknown, maxLen = 200): string {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const url = new URL(request.url);
  return origin === url.origin;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS preflight for /api/*
    if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
      const origin = request.headers.get('origin') || '';
      const isAllowed = isAllowedOrigin(request);
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': isAllowed && origin ? origin : url.origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // -------------------------------------------------------------
    // 1. GET /api/health
    // -------------------------------------------------------------
    if (pathname === '/api/health') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        return jsonResponse(
          {
            ok: true,
            service: 'velnar-api',
          },
          200,
          { 'Access-Control-Allow-Origin': '*' }
        );
      }
      return jsonResponse({ error: 'Method Not Allowed' }, 405);
    }

    // -------------------------------------------------------------
    // 2. GET /api/payment/config (Safe public info & sandbox indicator)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/config') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';
        const isSandbox = baseUrl.toLowerCase().includes('sandbox');
        return jsonResponse(
          {
            ok: true,
            isSandbox,
            sandboxBadge: isSandbox ? 'SANDBOX / TEST PAYMENT' : null,
            prices: SERVER_PRICES,
          },
          200,
          { 'Access-Control-Allow-Origin': '*' }
        );
      }
      return jsonResponse({ error: 'Method Not Allowed' }, 405);
    }

    // -------------------------------------------------------------
    // 3. POST /api/payment/create (Initialize Checkout Form)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/create') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: 'Method Not Allowed' }, 405);
      }

      // Verify origin
      if (!isAllowedOrigin(request)) {
        return jsonResponse({ ok: false, error: 'Cross-origin requests forbidden' }, 403);
      }

      let body: any;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ ok: false, error: 'Invalid JSON payload' }, 400);
      }

      const { packageId, market, language, buyer } = body || {};

      // Validate package ID allowlist
      if (!isValidPackageId(packageId)) {
        return jsonResponse({ ok: false, error: 'Invalid packageId. Must be starter, business, or ai-business.' }, 400);
      }

      // Validate market allowlist
      if (!isValidMarket(market)) {
        return jsonResponse({ ok: false, error: 'Invalid market. Must be turkey or international.' }, 400);
      }

      // Validate language allowlist
      const lang: Language = isValidLanguage(language) ? language : 'tr';

      // Validate buyer info
      if (!buyer || typeof buyer !== 'object') {
        return jsonResponse({ ok: false, error: 'Missing buyer information.' }, 400);
      }

      const name = sanitizeString(buyer.name, 50);
      const surname = sanitizeString(buyer.surname, 50);
      const email = sanitizeString(buyer.email, 100).toLowerCase();
      const phone = sanitizeString(buyer.phone, 30);
      const address = sanitizeString(buyer.address, 200);
      const city = sanitizeString(buyer.city, 50);
      const country = sanitizeString(buyer.country, 50);
      const zipCode = sanitizeString(buyer.zipCode, 20);
      const identityNumber = sanitizeString(buyer.identityNumber, 20) || '11111111111';

      if (!name || !surname) {
        return jsonResponse({ ok: false, error: 'First name and surname are required.' }, 400);
      }
      if (!email || !isValidEmail(email)) {
        return jsonResponse({ ok: false, error: 'A valid email address is required.' }, 400);
      }
      if (!phone) {
        return jsonResponse({ ok: false, error: 'A valid phone number is required.' }, 400);
      }
      if (!address || !city || !country) {
        return jsonResponse({ ok: false, error: 'Address, city, and country are required.' }, 400);
      }

      // STRICT SERVER-SIDE AMOUNT CALCULATION (Never trust client-sent amounts)
      const priceInfo = getPackagePriceInfo(market, packageId);
      const initialPayment = priceInfo.initialPayment;
      const currency = priceInfo.currency;
      const formattedPrice = initialPayment.toFixed(2);

      const conversationId = crypto.randomUUID();
      const nonce = crypto.randomUUID();
      const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 hours expiry

      const basketId = `BSK-${crypto.randomUUID().slice(0, 8)}`;
      const buyerId = `BYR-${crypto.randomUUID().slice(0, 8)}`;

      // Check iyzico credentials
      const apiKey = env.IYZICO_API_KEY;
      const secretKey = env.IYZICO_SECRET_KEY;
      const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

      if (!apiKey || !secretKey) {
        return jsonResponse(
          {
            ok: false,
            error:
              'iyzico payment service is not configured with runtime API keys in Cloudflare Worker environment.',
            isSandbox: baseUrl.includes('sandbox'),
          },
          503
        );
      }

      // Create stateless signed payment state
      const statePayload: PaymentStatePayload = {
        conversationId,
        packageId,
        market,
        language: lang,
        expectedInitialPayment: initialPayment,
        currency,
        expiresAt,
        nonce,
      };

      const signedState = await createSignedPaymentState(statePayload, secretKey);

      // Construct callback URL with signed state
      const callbackUrlObj = new URL('/api/payment/callback', request.url);
      callbackUrlObj.searchParams.set('state', signedState);
      const callbackUrl = callbackUrlObj.toString();

      // Extract client IP safely
      const clientIp =
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        '127.0.0.1';

      const itemTitle = `VELNAR ${priceInfo.name} - 50% Project Initial Payment`;

      const iyzicoRequest: IyzicoInitializeRequest = {
        locale: lang === 'tr' ? 'tr' : 'en',
        conversationId,
        price: formattedPrice,
        paidPrice: formattedPrice,
        currency,
        basketId,
        paymentGroup: 'PRODUCT',
        callbackUrl,
        enabledInstallments: [1],
        buyer: {
          id: buyerId,
          name,
          surname,
          gsmNumber: phone.startsWith('+') ? phone : `+${phone}`,
          email,
          identityNumber,
          registrationAddress: address,
          ip: clientIp,
          city,
          country,
          zipCode: zipCode || '34000',
        },
        shippingAddress: {
          contactName: `${name} ${surname}`,
          city,
          country,
          address,
          zipCode: zipCode || '34000',
        },
        billingAddress: {
          contactName: `${name} ${surname}`,
          city,
          country,
          address,
          zipCode: zipCode || '34000',
        },
        basketItems: [
          {
            id: `ITM-${packageId}`,
            name: itemTitle,
            category1: 'Digital Services',
            category2: 'Web Design',
            itemType: 'VIRTUAL',
            price: formattedPrice,
          },
        ],
      };

      try {
        const iyzicoResponse = await initializeIyzicoCheckoutForm(
          baseUrl,
          apiKey,
          secretKey,
          iyzicoRequest
        );

        if (iyzicoResponse.status === 'success' && iyzicoResponse.paymentPageUrl) {
          // Hardened API response: Only return paymentPageUrl and conversationId
          return jsonResponse({
            ok: true,
            paymentPageUrl: iyzicoResponse.paymentPageUrl,
            conversationId,
          });
        }

        return jsonResponse(
          {
            ok: false,
            error: iyzicoResponse.errorMessage || 'Failed to initialize iyzico payment page.',
            errorCode: iyzicoResponse.errorCode,
          },
          400
        );
      } catch (err: any) {
        return jsonResponse(
          {
            ok: false,
            error: 'Network error communicating with iyzico payment gateway.',
          },
          502
        );
      }
    }

    // -------------------------------------------------------------
    // 4. POST /api/payment/callback (iyzico Checkout Form Callback)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/callback') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: 'Method Not Allowed' }, 405);
      }

      let token = '';
      let callbackConversationId = '';

      // iyzico posts application/x-www-form-urlencoded or multipart form data
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        try {
          const formData = await request.formData();
          token = sanitizeString(formData.get('token'), 200);
          callbackConversationId = sanitizeString(formData.get('conversationId'), 100);
        } catch {
          const rawText = await request.text();
          const params = new URLSearchParams(rawText);
          token = sanitizeString(params.get('token'), 200);
          callbackConversationId = sanitizeString(params.get('conversationId'), 100);
        }
      } else if (contentType.includes('application/json')) {
        try {
          const jsonBody = (await request.json()) as any;
          token = sanitizeString(jsonBody?.token, 200);
          callbackConversationId = sanitizeString(jsonBody?.conversationId, 100);
        } catch {
          // Ignore
        }
      }

      const stateQuery = url.searchParams.get('state') || '';
      const secretKey = env.IYZICO_SECRET_KEY;
      const apiKey = env.IYZICO_API_KEY;
      const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

      if (!secretKey || !apiKey) {
        const failUrl = new URL('/tr/payment/failed?reason=unconfigured', request.url);
        return Response.redirect(failUrl.toString(), 303);
      }

      if (!token || !stateQuery) {
        const failUrl = new URL('/tr/payment/failed?reason=missing_data', request.url);
        return Response.redirect(failUrl.toString(), 303);
      }

      // Verify signed payment state
      const statePayload = await verifySignedPaymentState(stateQuery, secretKey);
      if (!statePayload) {
        const failUrl = new URL('/tr/payment/failed?reason=invalid_or_expired_state', request.url);
        return Response.redirect(failUrl.toString(), 303);
      }

      const targetLang: Language = statePayload.language || 'tr';

      try {
        const detail = await retrieveIyzicoCheckoutForm(baseUrl, apiKey, secretKey, {
          locale: targetLang === 'tr' ? 'tr' : 'en',
          conversationId: statePayload.conversationId,
          token,
        });

        // 1. Check iyzico status & paymentStatus
        const isSuccess = detail.status === 'success' && detail.paymentStatus === 'SUCCESS';
        
        // 2. Strict currency check
        const isCurrencyMatch = detail.currency === statePayload.currency;

        // 3. Strict amount check
        const paidPriceNum = Number(detail.paidPrice ?? detail.price ?? 0);
        const isPriceMatch = Math.abs(paidPriceNum - statePayload.expectedInitialPayment) < 0.01;

        // 4. Conversation ID check if returned
        const isConversationMatch = !detail.conversationId || detail.conversationId === statePayload.conversationId;

        if (isSuccess && isCurrencyMatch && isPriceMatch && isConversationMatch) {
          const successUrl = new URL(`/${targetLang}/payment/success`, request.url);
          successUrl.searchParams.set('ref', detail.conversationId || statePayload.conversationId);
          return Response.redirect(successUrl.toString(), 303);
        } else {
          const failUrl = new URL(`/${targetLang}/payment/failed`, request.url);
          failUrl.searchParams.set('reason', 'verification_failed');
          if (detail.errorCode) {
            failUrl.searchParams.set('code', detail.errorCode);
          }
          return Response.redirect(failUrl.toString(), 303);
        }
      } catch (err) {
        const failUrl = new URL(`/${targetLang}/payment/failed?reason=gateway_error`, request.url);
        return Response.redirect(failUrl.toString(), 303);
      }
    }

    // -------------------------------------------------------------
    // 5. Default: Fallback to Cloudflare Static Asset binding
    // -------------------------------------------------------------
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
