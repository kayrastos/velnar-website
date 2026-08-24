# iyzico Checkout Form Integration (Sandbox Only)

This repository includes a server-side Cloudflare Worker payment gateway integration for **iyzico Checkout Form (Sandbox)** with Cloudflare D1 persistence and V3 webhook verification.

---

## 1. Security & Architecture Principles

- **Sandbox Only**: Configured strictly for testing and validation. No real live payment processing or automatic captures.
- **No Client-Side Credentials**: No API keys, secret keys, or authentication headers are stored in client code or frontend bundles.
- **Server-Side Price Table**: Payment amounts, currencies, and 50% milestone calculations are strictly enforced by the Worker backend (`worker/pricing.ts`). Browser-sent amounts or overrides are completely ignored.
- **PCI Compliance & Data Minimization**: Cardholder data (Card Number, CVV, Expiry Date) is entered **exclusively** on the hosted iyzico 256-bit SSL Checkout Form. VELNAR never collects, transmits, or stores card information or raw webhook payloads.
- **Cloudflare D1 Persistence & Idempotency**: All payment transactions and webhook events are persisted with atomic state transitions (`INITIALIZING` -> `PENDING` -> `VERIFIED` / `FAILED`).
- **Webhook V3 HMAC Verification**: All server-to-server webhook notifications verify the `X-IYZ-SIGNATURE-V3` HMAC-SHA256 signature with constant-time equality checks.

---

## 2. Cloudflare Worker Configuration & D1 Database

### D1 Database Binding
Configured in `wrangler.jsonc`:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "velnar-payments",
    "database_id": "8e0583cb-d5b8-4d1c-bfcd-b2b277ca381c",
    "migrations_dir": "migrations"
  }
]
```

### Database Migration
Run migration:
```bash
wrangler d1 migrations apply velnar-payments --remote
# or for local testing:
wrangler d1 migrations apply velnar-payments --local
```

Schema file: `migrations/0001_payment_persistence.sql`

---

## 3. Cloudflare Worker Runtime Environment Variables

To run and test the Worker with iyzico Sandbox in Cloudflare Workers / Wrangler, configure the following secrets via Cloudflare Dashboard or Wrangler CLI (`wrangler secret put <KEY>`):

```bash
# Cloudflare Worker Secrets (DO NOT commit real secret values to Git)
IYZICO_API_KEY="sandbox-..."
IYZICO_SECRET_KEY="sandbox-..."
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"
```

---

## 4. Payment Flow & Race Condition Handling

1. **Session Initialization (`POST /api/payment/create`)**:
   - Customer submits contact and billing details with client-generated `idempotencyKey` (UUID).
   - Worker validates input, computes authoritative 50% amounts from server prices, and checks D1 for existing attempts.
   - Inserts `INITIALIZING` record in D1.
   - Generates `IYZWSv2` HMAC-SHA256 authorization headers and calls iyzico Checkout Form Initialize API.
   - Computes SHA-256 hash of the iyzico token and updates D1 status to `PENDING`.
   - Returns a secure `paymentPageUrl` and `conversationId`.

2. **Hosted Checkout**:
   - Customer completes test transaction on the official iyzico Sandbox Checkout Form.

3. **Callback (`POST /api/payment/callback`) & Webhook (`POST /api/payment/webhook`)**:
   - **Callback**: Customer is redirected back with token. Worker verifies HMAC state payload, matches token hash, verifies status with iyzico Detail API, and atomically updates D1 status to `VERIFIED`. Redirects to `/tr/payment/success?ref=<public_ref>` or `/en/payment/success?ref=<public_ref>`.
   - **Webhook**: iyzico sends server-to-server V3 signed notification. Worker verifies signature (`secretKey + iyziEventType + iyziPaymentId + token + paymentConversationId + status`), verifies event idempotency, independently queries iyzico Detail API, and atomically updates D1 status to `VERIFIED`.
   - **First-To-Verify Wins**: Both callback and webhook use atomic SQL conditional updates (`WHERE conversation_id = ? AND status != 'VERIFIED'`). The first to complete marks the record verified; subsequent updates succeed idempotently.

4. **Safe Status Verification (`GET /api/payment/status?ref=<public_ref>`)**:
   - Returns only safe verification status, package, market, and verified amount.

---

## 5. Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Returns `{ "ok": true, "service": "velnar-api" }` |
| `/api/payment/config` | GET | Returns public sandbox indicator and price structure |
| `/api/payment/status` | GET | Queries safe payment verification status by `ref` |
| `/api/payment/create` | POST | Validates buyer details, checks D1 idempotency, and initializes iyzico Checkout Form |
| `/api/payment/callback` | POST | Handles iyzico postback token and atomically updates D1 |
| `/api/payment/webhook` | POST | Verifies V3 signature, ensures event idempotency, and updates D1 |

---

## 6. How to Test (Sandbox)

1. Navigate to the pricing section (`/#paketler` or `/en#paketler`).
2. Click **"Projeyi Başlat (%50 Ödeme)"** / **"Start with 50% Initial Payment"**.
3. Confirm buyer and billing information.
4. Proceed to the iyzico checkout form and complete the test with official iyzico Sandbox test cards.
5. Verify automatic redirection to the success confirmation view with verified reference ID.

