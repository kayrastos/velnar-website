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
  IyzicoWebhookPayload,
  initializeIyzicoCheckoutForm,
  retrieveIyzicoCheckoutForm,
  sha256Hex,
  verifyIyzicoHppWebhookV3,
} from './iyzico';
import {
  createSignedPaymentState,
  verifySignedPaymentState,
  PaymentStatePayload,
} from './state';

export interface PaymentRecord {
  id: string;
  public_ref: string;
  idempotency_key: string;
  conversation_id: string;
  package_id: string;
  market: string;
  language: string;
  amount_minor: number;
  currency: string;
  buyer_email: string | null;
  buyer_name: string | null;
  status: 'INITIALIZING' | 'PENDING' | 'VERIFIED' | 'FAILED' | 'EXPIRED';
  iyzico_payment_id: string | null;
  iyzico_token_hash: string | null;
  payment_page_url: string | null;
  failure_code: string | null;
  created_at: number;
  updated_at: number;
  expires_at: number;
  verified_at: number | null;
}

export interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  IYZICO_API_KEY?: string;
  IYZICO_SECRET_KEY?: string;
  IYZICO_BASE_URL?: string;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUuid(uuid: unknown): uuid is string {
  return typeof uuid === 'string' && UUID_REGEX.test(uuid);
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

    // Handle CORS preflight for /api/* (same-origin only for payment)
    if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
      const isAllowed = isAllowedOrigin(request);
      if (!isAllowed) {
        return new Response(null, { status: 403 });
      }
      const origin = request.headers.get('origin') || url.origin;
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
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
          200
        );
      }
      return jsonResponse({ error: 'Method Not Allowed' }, 405);
    }

    // -------------------------------------------------------------
    // 2. GET /api/payment/config (Safe public info & sandbox indicator)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/config') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        if (!isAllowedOrigin(request)) {
          return jsonResponse({ ok: false, error: 'Cross-origin requests forbidden' }, 403);
        }

        const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';
        const isSandbox = baseUrl.toLowerCase().includes('sandbox');
        return jsonResponse(
          {
            ok: true,
            isSandbox,
            sandboxBadge: isSandbox ? 'SANDBOX / TEST PAYMENT' : null,
            prices: SERVER_PRICES,
          },
          200
        );
      }
      return jsonResponse({ error: 'Method Not Allowed' }, 405);
    }

    // -------------------------------------------------------------
    // 3. GET /api/payment/status (Safe payment status by public_ref)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/status') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return jsonResponse({ ok: false, error: 'Method Not Allowed' }, 405);
      }

      if (!isAllowedOrigin(request)) {
        return jsonResponse({ ok: false, error: 'Cross-origin requests forbidden' }, 403);
      }

      const publicRef = sanitizeString(url.searchParams.get('ref'), 100);
      if (!publicRef) {
        return jsonResponse({ ok: false, error: 'Missing ref parameter' }, 400);
      }

      if (env.DB) {
        try {
          const payment = await env.DB.prepare('SELECT * FROM payments WHERE public_ref = ?')
            .bind(publicRef)
            .first<PaymentRecord>();

          if (!payment) {
            return jsonResponse({ ok: false, error: 'Payment not found' }, 404);
          }

          return jsonResponse({
            ok: true,
            status: payment.status,
            packageId: payment.package_id,
            market: payment.market,
            currency: payment.currency,
            paidAmount: payment.status === 'VERIFIED' ? payment.amount_minor / 100 : undefined,
            referenceId: payment.public_ref,
          });
        } catch {
          return jsonResponse({ ok: false, error: 'Database query failed' }, 500);
        }
      }

      return jsonResponse({
        ok: true,
        status: 'VERIFIED',
        referenceId: publicRef,
      });
    }

    // -------------------------------------------------------------
    // 4. POST /api/payment/create (Initialize Checkout Form & D1 Idempotency)
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

      const { packageId, market, language, buyer, idempotencyKey } = body || {};

      // Validate idempotencyKey
      if (!isValidUuid(idempotencyKey)) {
        return jsonResponse(
          { ok: false, error: 'Invalid or missing idempotencyKey. Must be a valid UUID.' },
          400
        );
      }

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
      const amountMinor = Math.round(initialPayment * 100);
      const currency = priceInfo.currency;
      const formattedPrice = initialPayment.toFixed(2);

      // Check D1 idempotency if database is attached
      if (env.DB) {
        try {
          const existing = await env.DB.prepare('SELECT * FROM payments WHERE idempotency_key = ?')
            .bind(idempotencyKey)
            .first<PaymentRecord>();

          if (existing) {
            // A. If package/market/amount/currency mismatch -> HTTP 409 Conflict
            if (
              existing.package_id !== packageId ||
              existing.market !== market ||
              existing.amount_minor !== amountMinor ||
              existing.currency !== currency
            ) {
              return jsonResponse(
                {
                  ok: false,
                  error: 'IDEMPOTENCY_MISMATCH',
                  message: 'A payment attempt already exists with this idempotency key but different parameters.',
                },
                409
              );
            }

            // B. If status is VERIFIED -> Return safe response
            if (existing.status === 'VERIFIED') {
              return jsonResponse(
                {
                  ok: false,
                  error: 'PAYMENT_ALREADY_COMPLETED',
                  referenceId: existing.public_ref,
                },
                200
              );
            }

            // C. If status is PENDING and stored payment_page_url has not expired -> Return same url
            if (
              existing.status === 'PENDING' &&
              existing.payment_page_url &&
              existing.expires_at > Date.now()
            ) {
              return jsonResponse({
                ok: true,
                paymentPageUrl: existing.payment_page_url,
                conversationId: existing.conversation_id,
              });
            }
          }
        } catch (dbReadErr) {
          console.error('D1 check error:', dbReadErr);
        }
      }

      const paymentId = crypto.randomUUID();
      const publicRef = `REF-${crypto.randomUUID().slice(0, 12).toUpperCase()}`;
      const conversationId = crypto.randomUUID();
      const nonce = crypto.randomUUID();
      const now = Date.now();
      const expiresAt = now + 2 * 60 * 60 * 1000; // 2 hours expiry
      const buyerFullName = `${name} ${surname}`;

      // Insert INITIALIZING record in D1 if available
      if (env.DB) {
        try {
          await env.DB.prepare(
            `INSERT INTO payments (
              id, public_ref, idempotency_key, conversation_id,
              package_id, market, language, amount_minor, currency,
              buyer_email, buyer_name, status,
              created_at, updated_at, expires_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'INITIALIZING', ?, ?, ?)`
          )
            .bind(
              paymentId,
              publicRef,
              idempotencyKey,
              conversationId,
              packageId,
              market,
              lang,
              amountMinor,
              currency,
              email,
              buyerFullName,
              now,
              now,
              expiresAt
            )
            .run();
        } catch (insertErr) {
          console.error('D1 insert INITIALIZING error:', insertErr);
          return jsonResponse({ ok: false, error: 'Failed to record payment attempt.' }, 409);
        }
      }

      const basketId = `BSK-${crypto.randomUUID().slice(0, 8)}`;
      const buyerId = `BYR-${crypto.randomUUID().slice(0, 8)}`;

      // Check iyzico credentials
      const apiKey = env.IYZICO_API_KEY;
      const secretKey = env.IYZICO_SECRET_KEY;
      const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

      if (!apiKey || !secretKey) {
        if (env.DB) {
          try {
            await env.DB.prepare('UPDATE payments SET status = ?, failure_code = ?, updated_at = ? WHERE id = ?')
              .bind('FAILED', 'UNCONFIGURED_GATEWAY', Date.now(), paymentId)
              .run();
          } catch {}
        }
        return jsonResponse(
          {
            ok: false,
            error: 'iyzico payment service is not configured with runtime API keys in Cloudflare Worker environment.',
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
          // SHA-256 hash the iyzico token before updating D1
          const tokenHash = iyzicoResponse.token ? await sha256Hex(iyzicoResponse.token) : null;

          if (env.DB) {
            try {
              await env.DB.prepare(
                `UPDATE payments SET
                  status = 'PENDING',
                  iyzico_token_hash = ?,
                  payment_page_url = ?,
                  updated_at = ?
                WHERE id = ? AND status = 'INITIALIZING'`
              )
                .bind(tokenHash, iyzicoResponse.paymentPageUrl, Date.now(), paymentId)
                .run();
            } catch (updateErr) {
              console.error('D1 update PENDING error:', updateErr);
            }
          }

          // Hardened API response: Only return paymentPageUrl and conversationId
          return jsonResponse({
            ok: true,
            paymentPageUrl: iyzicoResponse.paymentPageUrl,
            conversationId,
          });
        }

        if (env.DB) {
          try {
            await env.DB.prepare(
              'UPDATE payments SET status = ?, failure_code = ?, updated_at = ? WHERE id = ? AND status = ?'
            )
              .bind('FAILED', iyzicoResponse.errorCode || 'INIT_FAILED', Date.now(), paymentId, 'INITIALIZING')
              .run();
          } catch {}
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
        if (env.DB) {
          try {
            await env.DB.prepare(
              'UPDATE payments SET status = ?, failure_code = ?, updated_at = ? WHERE id = ? AND status = ?'
            )
              .bind('FAILED', 'GATEWAY_NETWORK_ERROR', Date.now(), paymentId, 'INITIALIZING')
              .run();
          } catch {}
        }

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
    // 5. POST /api/payment/callback (iyzico Checkout Form Callback + D1 Verification)
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
      const tokenHash = await sha256Hex(token);

      // Check D1 database state if available
      let paymentRecord: PaymentRecord | null = null;
      if (env.DB) {
        try {
          paymentRecord = await env.DB.prepare('SELECT * FROM payments WHERE conversation_id = ?')
            .bind(statePayload.conversationId)
            .first<PaymentRecord>();

          // If already verified, handle idempotently and redirect to success
          if (paymentRecord && paymentRecord.status === 'VERIFIED') {
            const successUrl = new URL(`/${targetLang}/payment/success`, request.url);
            successUrl.searchParams.set('ref', paymentRecord.public_ref);
            return Response.redirect(successUrl.toString(), 303);
          }

          // Token hash validation against stored hash
          if (
            paymentRecord &&
            paymentRecord.iyzico_token_hash &&
            paymentRecord.iyzico_token_hash !== tokenHash
          ) {
            const failUrl = new URL(`/${targetLang}/payment/failed?reason=token_mismatch`, request.url);
            return Response.redirect(failUrl.toString(), 303);
          }
        } catch (dbErr) {
          console.error('D1 callback lookup error:', dbErr);
        }
      }

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
          const verifiedPaymentId = detail.paymentStatus === 'SUCCESS' && detail.itemTransactions?.[0]?.paymentTransactionId
            ? String(detail.itemTransactions[0].paymentTransactionId)
            : 'iyzi-verified';

          const now = Date.now();
          const publicRef = paymentRecord ? paymentRecord.public_ref : statePayload.conversationId;

          // Atomically mark VERIFIED in D1
          if (env.DB) {
            try {
              await env.DB.prepare(
                `UPDATE payments SET
                  status = 'VERIFIED',
                  iyzico_payment_id = ?,
                  verified_at = ?,
                  updated_at = ?,
                  payment_page_url = NULL
                WHERE conversation_id = ? AND status != 'VERIFIED'`
              )
                .bind(verifiedPaymentId, now, now, statePayload.conversationId)
                .run();
            } catch (dbUpdateErr) {
              console.error('D1 atomic VERIFIED update error:', dbUpdateErr);
            }
          }

          const successUrl = new URL(`/${targetLang}/payment/success`, request.url);
          successUrl.searchParams.set('ref', publicRef);
          return Response.redirect(successUrl.toString(), 303);
        } else {
          if (env.DB) {
            try {
              await env.DB.prepare(
                `UPDATE payments SET
                  status = 'FAILED',
                  failure_code = ?,
                  updated_at = ?
                WHERE conversation_id = ? AND status != 'VERIFIED'`
              )
                .bind(detail.errorCode || 'VERIFICATION_FAILED', Date.now(), statePayload.conversationId)
                .run();
            } catch {}
          }

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
    // 6. POST /api/payment/webhook (iyzico HPP Webhook & Event Idempotency)
    // -------------------------------------------------------------
    if (pathname === '/api/payment/webhook') {
      if (request.method !== 'POST') {
        return jsonResponse({ ok: false, error: 'Method Not Allowed' }, 405);
      }

      // Webhook is server-to-server: No browser origin check
      const signatureHeader =
        request.headers.get('x-iyz-signature-v3') ||
        request.headers.get('X-IYZ-SIGNATURE-V3');

      if (!signatureHeader) {
        return jsonResponse({ ok: false, error: 'Missing X-IYZ-SIGNATURE-V3 signature header' }, 401);
      }

      let payload: IyzicoWebhookPayload;
      try {
        payload = (await request.json()) as IyzicoWebhookPayload;
      } catch {
        return jsonResponse({ ok: false, error: 'Malformed JSON body' }, 400);
      }

      const secretKey = env.IYZICO_SECRET_KEY;
      if (!secretKey) {
        return jsonResponse({ ok: false, error: 'Webhook service unconfigured' }, 503);
      }

      // Verify HMAC-SHA256 signature
      const isValidSig = await verifyIyzicoHppWebhookV3(secretKey, payload, signatureHeader);
      if (!isValidSig) {
        return jsonResponse({ ok: false, error: 'Invalid webhook signature' }, 401);
      }

      const iyziEventType = sanitizeString(payload.iyziEventType, 50);
      const iyziPaymentId =
        payload.iyziPaymentId !== undefined && payload.iyziPaymentId !== null
          ? sanitizeString(String(payload.iyziPaymentId), 50)
          : '';
      const token = sanitizeString(payload.token, 200);
      const paymentConversationId = sanitizeString(payload.paymentConversationId, 100);
      const status = sanitizeString(payload.status, 50);
      const iyziReferenceCode = sanitizeString(payload.iyziReferenceCode, 100);

      // Deterministic event key for idempotency
      const eventKey = iyziReferenceCode
        ? `REF_${iyziReferenceCode}`
        : `SIG_${await sha256Hex(`${iyziEventType}:${iyziPaymentId}:${token}:${paymentConversationId}:${status}`)}`;

      // Check D1 event idempotency
      if (env.DB) {
        try {
          const existingEvent = await env.DB.prepare('SELECT id FROM payment_events WHERE event_key = ?')
            .bind(eventKey)
            .first();

          if (existingEvent) {
            // Duplicate notification acknowledged idempotently
            return jsonResponse({ ok: true, duplicate: true }, 200);
          }
        } catch (dbErr) {
          console.error('D1 event check error:', dbErr);
        }
      }

      // Handle irrelevant events
      if (iyziEventType !== 'CHECKOUT_FORM_AUTH') {
        if (env.DB) {
          try {
            await env.DB.prepare(
              `INSERT INTO payment_events (
                event_key, payment_id, source, event_type, event_status,
                iyzico_payment_id, iyzi_reference_code, received_at
              ) VALUES (?, NULL, 'IYZICO_WEBHOOK', ?, ?, ?, ?, ?)`
            )
              .bind(eventKey, iyziEventType, status, iyziPaymentId || null, iyziReferenceCode || null, Date.now())
              .run();
          } catch {}
        }
        return jsonResponse({ ok: true, ignored: true }, 200);
      }

      // For CHECKOUT_FORM_AUTH with status SUCCESS: Retrieve & verify independently
      if (status === 'SUCCESS') {
        if (!token || !paymentConversationId) {
          return jsonResponse({ ok: false, error: 'Missing required webhook token or paymentConversationId' }, 400);
        }

        let paymentRecord: PaymentRecord | null = null;
        if (env.DB) {
          try {
            paymentRecord = await env.DB.prepare('SELECT * FROM payments WHERE conversation_id = ?')
              .bind(paymentConversationId)
              .first<PaymentRecord>();
          } catch (lookupErr) {
            console.error('D1 payment lookup error:', lookupErr);
          }
        }

        if (!paymentRecord && env.DB) {
          return jsonResponse({ ok: false, error: 'Payment not found for conversationId' }, 404);
        }

        // If already verified, record event and return 200
        if (paymentRecord && paymentRecord.status === 'VERIFIED') {
          if (env.DB) {
            try {
              await env.DB.prepare(
                `INSERT INTO payment_events (
                  event_key, payment_id, source, event_type, event_status,
                  iyzico_payment_id, iyzi_reference_code, received_at
                ) VALUES (?, ?, 'IYZICO_WEBHOOK', ?, ?, ?, ?, ?)`
              )
                .bind(eventKey, paymentRecord.id, iyziEventType, status, iyziPaymentId || null, iyziReferenceCode || null, Date.now())
                .run();
            } catch {}
          }
          return jsonResponse({ ok: true, alreadyVerified: true }, 200);
        }

        // Perform independent iyzico retrieve verification
        const apiKey = env.IYZICO_API_KEY || '';
        const baseUrl = env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com';

        try {
          const detail = await retrieveIyzicoCheckoutForm(baseUrl, apiKey, secretKey, {
            locale: paymentRecord?.language === 'en' ? 'en' : 'tr',
            conversationId: paymentConversationId,
            token,
          });

          const isSuccess = detail.status === 'success' && detail.paymentStatus === 'SUCCESS';
          const expectedCurrency = paymentRecord ? paymentRecord.currency : 'TRY';
          const expectedAmount = paymentRecord ? paymentRecord.amount_minor / 100 : 0;
          const isCurrencyMatch = detail.currency === expectedCurrency;
          const paidPriceNum = Number(detail.paidPrice ?? detail.price ?? 0);
          const isPriceMatch = Math.abs(paidPriceNum - expectedAmount) < 0.01;
          const isConversationMatch = !detail.conversationId || detail.conversationId === paymentConversationId;

          const tokenHash = await sha256Hex(token);
          const isTokenMatch = !paymentRecord?.iyzico_token_hash || paymentRecord.iyzico_token_hash === tokenHash;

          if (isSuccess && isCurrencyMatch && isPriceMatch && isConversationMatch && isTokenMatch) {
            const now = Date.now();
            const verifiedPaymentId = iyziPaymentId || 'iyzi-webhook-verified';

            if (env.DB && paymentRecord) {
              try {
                await env.DB.prepare(
                  `UPDATE payments SET
                    status = 'VERIFIED',
                    iyzico_payment_id = ?,
                    verified_at = ?,
                    updated_at = ?,
                    payment_page_url = NULL
                  WHERE conversation_id = ? AND status != 'VERIFIED'`
                )
                  .bind(verifiedPaymentId, now, now, paymentConversationId)
                  .run();

                await env.DB.prepare(
                  `INSERT INTO payment_events (
                    event_key, payment_id, source, event_type, event_status,
                    iyzico_payment_id, iyzi_reference_code, received_at
                  ) VALUES (?, ?, 'IYZICO_WEBHOOK', ?, ?, ?, ?, ?)`
                )
                  .bind(eventKey, paymentRecord.id, iyziEventType, status, verifiedPaymentId, iyziReferenceCode || null, now)
                  .run();
              } catch (dbErr) {
                console.error('D1 atomic webhook update error:', dbErr);
              }
            }

            return jsonResponse({ ok: true, verified: true }, 200);
          } else {
            if (env.DB && paymentRecord) {
              try {
                await env.DB.prepare(
                  `UPDATE payments SET
                    status = 'FAILED',
                    failure_code = ?,
                    updated_at = ?
                  WHERE conversation_id = ? AND status != 'VERIFIED'`
                )
                  .bind(detail.errorCode || 'WEBHOOK_VERIFY_MISMATCH', Date.now(), paymentConversationId)
                  .run();

                await env.DB.prepare(
                  `INSERT INTO payment_events (
                    event_key, payment_id, source, event_type, event_status,
                    iyzico_payment_id, iyzi_reference_code, received_at
                  ) VALUES (?, ?, 'IYZICO_WEBHOOK', ?, ?, ?, ?, ?)`
                )
                  .bind(eventKey, paymentRecord.id, iyziEventType, status, iyziPaymentId || null, iyziReferenceCode || null, Date.now())
                  .run();
              } catch {}
            }

            return jsonResponse({ ok: false, error: 'Webhook verification mismatch' }, 200);
          }
        } catch (retrieveErr) {
          return jsonResponse({ ok: false, error: 'Error querying iyzico detail' }, 502);
        }
      }

      // For failure events
      if (status === 'FAILURE') {
        if (env.DB && paymentConversationId) {
          try {
            const paymentRecord = await env.DB.prepare('SELECT id FROM payments WHERE conversation_id = ?')
              .bind(paymentConversationId)
              .first<PaymentRecord>();

            await env.DB.prepare(
              `UPDATE payments SET
                status = 'FAILED',
                failure_code = 'WEBHOOK_FAILURE',
                updated_at = ?
              WHERE conversation_id = ? AND status != 'VERIFIED'`
            )
              .bind(Date.now(), paymentConversationId)
              .run();

            await env.DB.prepare(
              `INSERT INTO payment_events (
                event_key, payment_id, source, event_type, event_status,
                iyzico_payment_id, iyzi_reference_code, received_at
              ) VALUES (?, ?, 'IYZICO_WEBHOOK', ?, ?, ?, ?, ?)`
            )
              .bind(eventKey, paymentRecord ? paymentRecord.id : null, iyziEventType, status, iyziPaymentId || null, iyziReferenceCode || null, Date.now())
              .run();
          } catch {}
        }
        return jsonResponse({ ok: true, status: 'FAILED' }, 200);
      }

      return jsonResponse({ ok: true }, 200);
    }

    // -------------------------------------------------------------
    // 7. Default: Fallback to Cloudflare Static Asset binding
    // -------------------------------------------------------------
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
