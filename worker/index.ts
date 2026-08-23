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

export interface Env {
  ASSETS: Fetcher;
  IYZICO_API_KEY?: string;
  IYZICO_SECRET_KEY?: string;
  IYZICO_BASE_URL?: string;
}

// In-memory payment session record for temporary verification (keyed by token or conversationId)
interface PaymentSession {
  conversationId: string;
  packageId: PackageId;
  market: Market;
  language: Language;
  initialPayment: number;
  currency: 'TRY' | 'USD';
  createdAt: number;
}

const paymentSessions = new Map<string, PaymentSession>();

// Cleanup stale sessions older than 2 hours
function cleanupSessions() {
  const now = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;
  for (const [key, session] of paymentSessions.entries()) {
    if (now - session.createdAt > twoHours) {
      paymentSessions.delete(key);
    }
  }
}

function jsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS preflight for /api/*
    if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
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
        return jsonResponse({
          ok: true,
          service: 'velnar-api',
        });
      }
      return jsonResponse({ error: 'Method Not Allowed' }, 405);
    }

    // -------------------------------------------------------------
    // 2. GET /api/payment/config (Safe public payment info & sandbox indicator)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/config') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';
        const isSandbox = baseUrl.toLowerCase().includes('sandbox');
        return jsonResponse({
          ok: true,
          isSandbox,
          sandboxBadge: isSandbox ? 'SANDBOX / TEST PAYMENT' : null,
          prices: SERVER_PRICES,
        });
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
      const basketId = `BSK-${crypto.randomUUID().slice(0, 8)}`;
      const buyerId = `BYR-${crypto.randomUUID().slice(0, 8)}`;

      // Construct callback URL
      const callbackUrl = new URL('/api/payment/callback', request.url).toString();

      // Extract client IP safely
      const clientIp =
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        '127.0.0.1';

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
          // Save session data for verification
          cleanupSessions();
          const session: PaymentSession = {
            conversationId,
            packageId,
            market,
            language: lang,
            initialPayment,
            currency,
            createdAt: Date.now(),
          };
          if (iyzicoResponse.token) {
            paymentSessions.set(iyzicoResponse.token, session);
          }
          paymentSessions.set(conversationId, session);

          return jsonResponse({
            ok: true,
            paymentPageUrl: iyzicoResponse.paymentPageUrl,
            conversationId,
            token: iyzicoResponse.token,
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
      let conversationId = '';

      // iyzico typically posts application/x-www-form-urlencoded or multipart form data
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        try {
          const formData = await request.formData();
          token = sanitizeString(formData.get('token'), 200);
          conversationId = sanitizeString(formData.get('conversationId'), 100);
        } catch {
          // Fallback parsing from text
          const rawText = await request.text();
          const params = new URLSearchParams(rawText);
          token = sanitizeString(params.get('token'), 200);
          conversationId = sanitizeString(params.get('conversationId'), 100);
        }
      } else if (contentType.includes('application/json')) {
        try {
          const jsonBody = (await request.json()) as any;
          token = sanitizeString(jsonBody?.token, 200);
          conversationId = sanitizeString(jsonBody?.conversationId, 100);
        } catch {
          // Ignore
        }
      }

      const session = (token && paymentSessions.get(token)) || (conversationId && paymentSessions.get(conversationId));
      const targetLang: Language = session?.language || 'tr';

      if (!token) {
        const failUrl = new URL(`/${targetLang}/payment/failed?reason=missing_token`, request.url);
        return Response.redirect(failUrl.toString(), 303);
      }

      const apiKey = env.IYZICO_API_KEY;
      const secretKey = env.IYZICO_SECRET_KEY;
      const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

      if (!apiKey || !secretKey) {
        const failUrl = new URL(`/${targetLang}/payment/failed?reason=unconfigured`, request.url);
        return Response.redirect(failUrl.toString(), 303);
      }

      try {
        const detail = await retrieveIyzicoCheckoutForm(baseUrl, apiKey, secretKey, {
          locale: targetLang === 'tr' ? 'tr' : 'en',
          conversationId: conversationId || session?.conversationId || crypto.randomUUID(),
          token,
        });

        // Strict payment verification:
        // status must be "success" AND paymentStatus must be "SUCCESS"
        if (detail.status === 'success' && detail.paymentStatus === 'SUCCESS') {
          const pkgName = session?.packageId ? getPackagePriceInfo(session.market, session.packageId).name : 'VELNAR';
          const paidAmount = detail.paidPrice ? String(detail.paidPrice) : String(session?.initialPayment || '');
          const currency = detail.currency || session?.currency || 'TRY';

          const successUrl = new URL(`/${targetLang}/payment/success`, request.url);
          successUrl.searchParams.set('pkg', pkgName);
          successUrl.searchParams.set('amount', paidAmount);
          successUrl.searchParams.set('curr', currency);
          successUrl.searchParams.set('ref', detail.conversationId || conversationId || token.slice(0, 10));

          return Response.redirect(successUrl.toString(), 303);
        } else {
          const failUrl = new URL(`/${targetLang}/payment/failed`, request.url);
          failUrl.searchParams.set('code', detail.errorCode || 'PAYMENT_FAILED');
          return Response.redirect(failUrl.toString(), 303);
        }
      } catch (err) {
        const failUrl = new URL(`/${targetLang}/payment/failed?reason=gateway_error`, request.url);
        return Response.redirect(failUrl.toString(), 303);
      }
    }

    // -------------------------------------------------------------
    // 5. GET /api/payment/status
    // -------------------------------------------------------------
    if (pathname === '/api/payment/status') {
      const token = sanitizeString(url.searchParams.get('token'), 200);
      const conversationId = sanitizeString(url.searchParams.get('conversationId'), 100);

      const session = (token && paymentSessions.get(token)) || (conversationId && paymentSessions.get(conversationId));

      if (!token && !conversationId) {
        return jsonResponse({ ok: false, error: 'Token or conversationId is required' }, 400);
      }

      const apiKey = env.IYZICO_API_KEY;
      const secretKey = env.IYZICO_SECRET_KEY;
      const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

      if (!apiKey || !secretKey) {
        return jsonResponse({
          ok: true,
          status: 'UNCONFIGURED',
          session: session ? { packageId: session.packageId, initialPayment: session.initialPayment, currency: session.currency } : null,
        });
      }

      if (token) {
        try {
          const detail = await retrieveIyzicoCheckoutForm(baseUrl, apiKey, secretKey, {
            locale: session?.language === 'en' ? 'en' : 'tr',
            conversationId: conversationId || session?.conversationId || crypto.randomUUID(),
            token,
          });

          return jsonResponse({
            ok: true,
            status: detail.paymentStatus || (detail.status === 'success' ? 'SUCCESS' : 'FAILED'),
            price: detail.price,
            paidPrice: detail.paidPrice,
            currency: detail.currency,
          });
        } catch {
          return jsonResponse({ ok: false, error: 'Unable to retrieve status from gateway' }, 502);
        }
      }

      return jsonResponse({
        ok: true,
        session: session ? { packageId: session.packageId, initialPayment: session.initialPayment, currency: session.currency } : null,
      });
    }

    // -------------------------------------------------------------
    // 6. Default: Fallback to Cloudflare Static Asset binding
    // -------------------------------------------------------------
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
