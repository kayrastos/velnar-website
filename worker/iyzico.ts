/// <reference types="@cloudflare/workers-types" />

export interface BuyerInput {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  identityNumber?: string;
}

export interface IyzicoInitializeRequest {
  locale: 'tr' | 'en';
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: 'TRY' | 'USD';
  basketId: string;
  paymentGroup: 'PRODUCT';
  callbackUrl: string;
  enabledInstallments: number[];
  buyer: {
    id: string;
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    lastLoginDate?: string;
    registrationDate?: string;
    registrationAddress: string;
    ip: string;
    city: string;
    country: string;
    zipCode: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  basketItems: Array<{
    id: string;
    name: string;
    category1: string;
    category2: string;
    itemType: 'VIRTUAL';
    price: string;
  }>;
}

export interface IyzicoInitializeResponse {
  status: 'success' | 'failure';
  paymentPageUrl?: string;
  token?: string;
  conversationId?: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
}

export interface IyzicoDetailRequest {
  locale: 'tr' | 'en';
  conversationId: string;
  token: string;
}

export interface IyzicoDetailResponse {
  status: 'success' | 'failure';
  paymentStatus?: 'SUCCESS' | 'FAILURE' | 'INIT_THREEDS' | 'CALLBACK_THREEDS';
  price?: string | number;
  paidPrice?: string | number;
  currency?: string;
  basketId?: string;
  conversationId?: string;
  token?: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
  itemTransactions?: Array<{
    itemId?: string;
    paymentTransactionId?: string;
    price?: number;
    paidPrice?: number;
  }>;
}

/**
 * Computes HMAC-SHA256 hash formatted as a hex string.
 */
export async function computeHmacSha256Hex(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates the IYZWSv2 Authorization header and random key for iyzico API v2.
 */
export async function generateIyzwsV2Auth(
  apiKey: string,
  secretKey: string,
  uriPath: string,
  requestBodyJson: string
): Promise<{ authorization: string; randomKey: string }> {
  // Generate cryptographically secure random key for this specific request
  const randomBytes = new Uint8Array(8);
  crypto.getRandomValues(randomBytes);
  const randomHex = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  const randomKey = `${Date.now()}_${randomHex}`;

  const dataToSign = `${randomKey}${uriPath}${requestBodyJson}`;
  const signatureHex = await computeHmacSha256Hex(secretKey, dataToSign);
  const authPayload = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signatureHex}`;
  
  // Base64 encode the auth payload
  let base64Auth: string;
  if (typeof btoa === 'function') {
    base64Auth = btoa(unescape(encodeURIComponent(authPayload)));
  } else {
    base64Auth = Buffer.from(authPayload, 'utf-8').toString('base64');
  }

  return {
    authorization: `IYZWSv2 ${base64Auth}`,
    randomKey,
  };
}

/**
 * Calls iyzico Checkout Form Initialize API.
 */
export async function initializeIyzicoCheckoutForm(
  baseUrl: string,
  apiKey: string,
  secretKey: string,
  payload: IyzicoInitializeRequest
): Promise<IyzicoInitializeResponse> {
  const uriPath = '/payment/iyzipos/checkoutform/initialize/auth/ecom';
  const url = `${baseUrl.replace(/\/+$/, '')}${uriPath}`;
  const bodyJson = JSON.stringify(payload);

  const { authorization, randomKey } = await generateIyzwsV2Auth(
    apiKey,
    secretKey,
    uriPath,
    bodyJson
  );

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-iyzi-rnd': randomKey,
      Authorization: authorization,
    },
    body: bodyJson,
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const parsed = JSON.parse(errorText) as IyzicoInitializeResponse;
      return parsed;
    } catch {
      return {
        status: 'failure',
        errorMessage: `HTTP ${response.status}: Failed to initialize checkout form`,
      };
    }
  }

  const data = (await response.json()) as IyzicoInitializeResponse;
  return data;
}

/**
 * Calls iyzico Checkout Form Retrieve / Detail API to verify payment.
 */
export async function retrieveIyzicoCheckoutForm(
  baseUrl: string,
  apiKey: string,
  secretKey: string,
  payload: IyzicoDetailRequest
): Promise<IyzicoDetailResponse> {
  const uriPath = '/payment/iyzipos/checkoutform/auth/ecom/detail';
  const url = `${baseUrl.replace(/\/+$/, '')}${uriPath}`;
  const bodyJson = JSON.stringify(payload);

  const { authorization, randomKey } = await generateIyzwsV2Auth(
    apiKey,
    secretKey,
    uriPath,
    bodyJson
  );

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-iyzi-rnd': randomKey,
      Authorization: authorization,
    },
    body: bodyJson,
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const parsed = JSON.parse(errorText) as IyzicoDetailResponse;
      return parsed;
    } catch {
      return {
        status: 'failure',
        errorMessage: `HTTP ${response.status}: Failed to retrieve checkout details`,
      };
    }
  }

  const data = (await response.json()) as IyzicoDetailResponse;
  return data;
}

/**
 * Computes standard SHA-256 hash as lowercase hex string.
 */
export async function sha256Hex(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time comparison between two strings to prevent timing attacks.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export interface IyzicoWebhookPayload {
  iyziEventType?: string;
  iyziPaymentId?: string | number;
  token?: string;
  paymentConversationId?: string;
  status?: string;
  iyziReferenceCode?: string;
  [key: string]: unknown;
}

/**
 * Verifies iyzico Checkout Form (HPP) Webhook Signature V3.
 *
 * For HPP the signature input is EXACTLY:
 * secretKey + iyziEventType + iyziPaymentId + token + paymentConversationId + status
 *
 * It is hashed with HMAC-SHA256 using env.IYZICO_SECRET_KEY and returned as lowercase hex.
 */
export async function verifyIyzicoHppWebhookV3(
  secretKey: string,
  payload: IyzicoWebhookPayload,
  signatureHeader: string | null
): Promise<boolean> {
  if (!secretKey || !signatureHeader || typeof signatureHeader !== 'string') {
    return false;
  }

  const iyziEventType = payload.iyziEventType ? String(payload.iyziEventType) : '';
  const iyziPaymentId = payload.iyziPaymentId !== undefined && payload.iyziPaymentId !== null ? String(payload.iyziPaymentId) : '';
  const token = payload.token ? String(payload.token) : '';
  const paymentConversationId = payload.paymentConversationId ? String(payload.paymentConversationId) : '';
  const status = payload.status ? String(payload.status) : '';

  const signatureInput = `${secretKey}${iyziEventType}${iyziPaymentId}${token}${paymentConversationId}${status}`;
  const calculatedSignatureHex = (await computeHmacSha256Hex(secretKey, signatureInput)).toLowerCase();
  const providedSignatureHex = signatureHeader.trim().toLowerCase();

  return timingSafeEqual(calculatedSignatureHex, providedSignatureHex);
}
