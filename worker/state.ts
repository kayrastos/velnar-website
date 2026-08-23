/// <reference types="@cloudflare/workers-types" />

import { PackageId, Market, Language, isValidPackageId, isValidMarket, isValidLanguage } from './pricing';

export interface PaymentStatePayload {
  conversationId: string;
  packageId: PackageId;
  market: Market;
  language: Language;
  expectedInitialPayment: number;
  currency: 'TRY' | 'USD';
  expiresAt: number;
  nonce: string;
}

const DOMAIN_PREFIX = 'velnar-payment-state-v1|';

/**
 * Base64URL encoding (URL-safe without padding).
 */
export function base64UrlEncode(data: Uint8Array | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Base64URL decoding to Uint8Array.
 */
export function base64UrlDecodeToBytes(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Base64URL decoding to UTF-8 string.
 */
export function base64UrlDecodeToString(base64url: string): string {
  const bytes = base64UrlDecodeToBytes(base64url);
  return new TextDecoder().decode(bytes);
}

/**
 * Derives CryptoKey from secret string.
 */
async function getHmacKey(secretKey: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates a signed, stateless payment state token.
 * Format: base64url(payload) + "." + base64url(hmacSignature)
 */
export async function createSignedPaymentState(
  payload: PaymentStatePayload,
  secretKey: string
): Promise<string> {
  const payloadJson = JSON.stringify(payload);
  const base64Payload = base64UrlEncode(payloadJson);
  const dataToSign = new TextEncoder().encode(`${DOMAIN_PREFIX}${base64Payload}`);

  const key = await getHmacKey(secretKey);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataToSign);
  const base64Signature = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${base64Payload}.${base64Signature}`;
}

/**
 * Verifies and decodes a signed payment state token.
 * Returns null if signature is invalid, payload is malformed, or state has expired.
 */
export async function verifySignedPaymentState(
  stateToken: string,
  secretKey: string
): Promise<PaymentStatePayload | null> {
  if (!stateToken || typeof stateToken !== 'string') {
    return null;
  }

  const parts = stateToken.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [base64Payload, base64Signature] = parts;
  if (!base64Payload || !base64Signature) {
    return null;
  }

  try {
    const key = await getHmacKey(secretKey);
    const dataToVerify = new TextEncoder().encode(`${DOMAIN_PREFIX}${base64Payload}`);
    const signatureBytes = base64UrlDecodeToBytes(base64Signature);

    const isValidSig = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      dataToVerify
    );

    if (!isValidSig) {
      return null;
    }

    const payloadJson = base64UrlDecodeToString(base64Payload);
    const parsed = JSON.parse(payloadJson) as Partial<PaymentStatePayload>;

    // Validate payload fields
    if (
      !parsed.conversationId ||
      typeof parsed.conversationId !== 'string' ||
      !isValidPackageId(parsed.packageId) ||
      !isValidMarket(parsed.market) ||
      !isValidLanguage(parsed.language) ||
      typeof parsed.expectedInitialPayment !== 'number' ||
      (parsed.currency !== 'TRY' && parsed.currency !== 'USD') ||
      typeof parsed.expiresAt !== 'number' ||
      !parsed.nonce
    ) {
      return null;
    }

    // Check expiration (2 hours maximum from issuance)
    if (Date.now() > parsed.expiresAt) {
      return null;
    }

    return parsed as PaymentStatePayload;
  } catch {
    return null;
  }
}
