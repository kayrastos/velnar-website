# iyzico Checkout Form Integration (Sandbox Only)

This repository includes a server-side Cloudflare Worker payment gateway integration for **iyzico Checkout Form (Sandbox)**.

---

## 1. Security & Architecture Principles

- **Sandbox Only**: Configured strictly for testing and validation. No real live payment processing or automatic captures.
- **No Client-Side Credentials**: No API keys, secret keys, or authentication headers are stored in client code or frontend bundles.
- **Server-Side Price Table**: Payment amounts, currencies, and 50% milestone calculations are strictly enforced by the Worker backend (`worker/pricing.ts`). Browser-sent amounts or overrides are completely ignored.
- **PCI Compliance**: Cardholder data (Card Number, CVV, Expiry Date) is entered **exclusively** on the hosted iyzico 256-bit SSL Checkout Form. VELNAR never collects, transmits, or stores card information.

---

## 2. Cloudflare Worker Runtime Environment Variables

To run and test the Worker with iyzico Sandbox in Cloudflare Workers / Wrangler, configure the following secrets via Cloudflare Dashboard or Wrangler CLI (`wrangler secret put <KEY>`):

```bash
# Cloudflare Worker Secrets (DO NOT commit real secret values to Git)
IYZICO_API_KEY="sandbox-..."
IYZICO_SECRET_KEY="sandbox-..."
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"
```

*Note: In local Vite dev mode, if credentials are not configured, the dev middleware falls back safely to simulation mode.*

---

## 3. Payment Flow

1. **Package Selection & Summary**:
   Customer clicks **"Start with 50% Initial Payment"** on any tier (Starter, Business, AI Business).
   A summary modal displays:
   - **Project Total**
   - **Initial Payment Today (50%)**
   - **Remaining Before Delivery (50%)**
   - Mandatory milestone disclosure: *"This is the initial project payment and represents 50% of the total project fee."*

2. **Session Initialization (`POST /api/payment/create`)**:
   - Customer submits contact and billing details.
   - Worker computes the exact 50% amount based on the verified `packageId` and `market`.
   - Worker generates `IYZWSv2` HMAC-SHA256 authorization headers and calls iyzico Checkout Form Initialize API (`/payment/iyzipos/checkoutform/initialize/auth/ecom`).
   - Returns a secure `paymentPageUrl`.

3. **Hosted Checkout**:
   - Customer is redirected to the iyzico Checkout Form.
   - Payment is made using iyzico Sandbox test card numbers.

4. **Callback & Verification (`POST /api/payment/callback`)**:
   - iyzico posts the authorization `token` to `/api/payment/callback`.
   - Worker queries iyzico Checkout Form Detail API (`/payment/iyzipos/checkoutform/auth/ecom/detail`) to verify `status === "success"` and `paymentStatus === "SUCCESS"`.
   - If verified, redirects to `/tr/payment/success` or `/en/payment/success`.
   - If failed or cancelled, redirects to `/tr/payment/failed` or `/en/payment/failed`.

---

## 4. Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Returns `{ "ok": true, "service": "velnar-api" }` |
| `/api/payment/config` | GET | Returns public sandbox indicator and price structure |
| `/api/payment/create` | POST | Validates buyer details and initializes iyzico Checkout Form |
| `/api/payment/callback` | POST | Handles iyzico postback token and verifies payment status |
| `/api/payment/status` | GET | Queries current transaction verification state |

---

## 5. How to Test (Sandbox)

1. Navigate to the pricing section (`/#paketler` or `/en#paketler`).
2. Click **"Projeyi Başlat (%50 Ödeme)"** / **"Start with 50% Initial Payment"**.
3. Confirm buyer and billing information.
4. Proceed to the iyzico checkout form and complete the test with official iyzico Sandbox test cards.
5. Verify automatic redirection to the success confirmation view.
