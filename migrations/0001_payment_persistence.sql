-- VELNAR Payment Persistence Migration
-- Minor units are used for all monetary amounts (cents / kuruş).

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  public_ref TEXT NOT NULL UNIQUE,
  idempotency_key TEXT NOT NULL UNIQUE,
  conversation_id TEXT NOT NULL UNIQUE,
  package_id TEXT NOT NULL,
  market TEXT NOT NULL,
  language TEXT NOT NULL,
  amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  buyer_email TEXT,
  buyer_name TEXT,
  status TEXT NOT NULL,
  iyzico_payment_id TEXT,
  iyzico_token_hash TEXT,
  payment_page_url TEXT,
  failure_code TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  verified_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_payments_conversation_id ON payments(conversation_id);
CREATE INDEX IF NOT EXISTS idx_payments_public_ref ON payments(public_ref);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

CREATE TABLE IF NOT EXISTS payment_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_key TEXT NOT NULL UNIQUE,
  payment_id TEXT,
  source TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_status TEXT,
  iyzico_payment_id TEXT,
  iyzi_reference_code TEXT,
  received_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payment_events_event_key ON payment_events(event_key);
CREATE INDEX IF NOT EXISTS idx_payment_events_payment_id ON payment_events(payment_id);
