# Security intelligence repositioning

## Scope and implementation

Work was performed only in `C:\Users\kayra\Downloads\velnar-website` on
`feat/security-intelligence-positioning`, starting from clean HEAD
`3a8f78d77428d8a97dfcf1aa791c3ea5eaa22efe`.
No commits, pushes, merges, deployments, live payment calls, or paid model calls.
No changes to worker code, payment credentials, databases, DNS, or wrangler configuration.

The active entry point now uses `src/security/LanguageContext.tsx` and the typed
English/Turkish dictionaries in `src/security/en.ts` and `src/security/tr.ts`.
The older language context and dictionaries remain unreferenced by the active entry point.
`VelnarMonogram` is reused from the existing logo module; its unused studio lockup
and configuration are excluded by the production bundle.

The single page includes platform positioning, the security triage problem,
five-stage architecture, evidence and authority, a three-level capability model,
engineering evidence, staged markets, grouped business-model layers, critical
systems, global vision, the pilot-access form, privacy/contact information, and
bilingual navigation/footer.

## Routes and SEO

`/` is the English default and remains at the public root. `/en` remains available
as an internal locale route; both English routes canonicalize to
`https://velnar.studio` to avoid duplicate-index ambiguity. `/tr` has Turkish
prerendered content and canonicalizes to `https://velnar.studio/tr`.
`scripts/prerender.tsx` generates the locale pages after Vite's build. Hreflang
uses the root for English and x-default, and `/tr` for Turkish. The sitemap lists
only the canonical root and Turkish marketing URLs. No infrastructure routing,
DNS, or Cloudflare configuration was changed.

The six existing unprefixed/EN/TR payment success and failure URLs now have neutral
prerendered pages with `noindex, follow`. They do not display a transaction result,
initiate a payment, or contact payment APIs. Unknown client routes show the same
neutral unavailable-page experience and set noindex. Prerendered page markers
prevent hydration of a mismatched SPA fallback (for example, an unknown route).
Retired pages intentionally retain the existing asset-serving behavior; this work
does not introduce HTTP 410 responses or alter production routing configuration.

## Design-partner form

The previous form was a mailto composer, not a submission backend. The new form
reuses the existing contact destination, `hello@velnar.studio`. Name, work email,
and company are required. Role, company type, engineering team size, and message
are optional. It has browser validation, whitespace checks, explicit
labels, bounded input lengths, focus handling, and a plain-text draft fallback.

Preparing a draft does not submit anything. The user separately chooses to open
an email app or copy a draft. Clipboard errors leave the draft selectable. Email
opening is not presented as successful delivery. Fields stay in React state and
are not stored in localStorage or sent to a backend. Source code and secrets are
explicitly discouraged. With JavaScript unavailable, the form is disabled to
prevent native GET submission of personal data; a direct email link remains.

Before enabling server-side submissions, add and validate a dedicated lead
endpoint, server-side validation, abuse/rate controls, storage/retention choices,
email delivery, and accurate delivery/error states. Confirm the receiving mailbox
and establish the contact-data policy before opening the program. No delivery or
mailbox availability was tested, and no test email was sent.

The privacy disclosure describes this frontend's actual draft behavior. It does
not invent company legal details, retention periods, or compliance certifications.

## Maturity and claim discipline

The capability model uses three explicit levels: BUILT TODAY for M0/M1, M2, and
the bounded M3 detector foundation; PROVING NEXT for real-repository benchmarks,
precision/recall and TP/FP/FN measurement, design partners, Controlled PoV, and
continued Fulgor work; and SCALING LATER for broader coverage, Security Memory,
Controlled Action, deployment, distribution, and high-trust architecture.

Within the five-stage architecture, Understand/Detect are marked as the current
foundation. Verify is separately marked as verification architecture under
development, with Fulgor described only as an independent verification layer
under development. Remember/Security Memory and Act/Controlled Action are
roadmap stages.

The supplied M3 110/110, M2 121/121, intelligence 427/427, and full 1191/1191
numbers are displayed as reported engineering regressions. They were supplied
in the brief, not reproduced or independently audited in this website repository.
The prominent disclaimer states that these are not production accuracy metrics.
There are no real-world precision, false-positive, customer, revenue, or broad
coverage claims. AI cannot directly grant VERIFIED authority.

The business model is grouped into VELNAR Cloud as the initial commercial product,
VELNAR Enterprise as future expansion, and VELNAR Platform as planned platform
expansion. Future revenue channels are not presented as active. Defense and
critical systems appear only as strategic expansion, with no current product,
customer, deployment, or production-readiness claim.

## Validation

- `npm install`: completed; added package-lock.json while retaining bun.lock.
  No dependencies were added to package.json. npm reported 3 moderate advisories.
  Dependency upgrades and automatic audit fixes were outside this frontend scope.
- `npm run lint`: passed (TypeScript check).
- `npm run build`: passed; Vite build followed by EN/TR and retired-page prerendering.
- `node scripts/validate-marketing.mjs`: passed; checks generated HTML and production JS
  for legacy marketing/payment endpoints; verifies locale metadata, canonical and
  alternate links, unique IDs, all section anchors, form labels, maturity text,
  regression disclosures, retired-page noindex, and local production HTTP routes.
- `npm audit --omit=dev`: completed with exit 1 and reported 3 moderate advisories
  in the production Express/body-parser/qs dependency chain. No automatic audit fix
  or dependency mutation was performed.
- `git diff --check`: passed; final diff reviewed and branch/HEAD/status verified.

Responsive layouts cover wide screens, tablets, and narrow screens. Navigation
has a keyboard-usable mobile disclosure, Escape handling, skip link, and visible
focus styles. CSS supports reduced motion and uses local system fonts.
A local preview was inspected at desktop and 390 × 844 mobile viewports. Browser
checks covered the hero, five-stage maturity treatment, three-level capability
system, business-model cards, mobile navigation, pilot form, footer, `/`, `/en`,
and `/tr`. The mobile page had no horizontal overflow; the sticky header and
86-pixel mobile scroll offset were active. Static and browser checks do not
substitute for final visual acceptance testing on the production host.

## Deliberately retained legacy code

Unreferenced agency components remain under `src/components/`, including
DemoPortfolio, DemoModal, DemoRequestForm, Pricing, PaymentModal,
PaymentSuccessPage, PaymentFailedPage, FloatingWhatsApp, and the previous
Navbar/Hero/Footer/LegalModal and supporting sections. The previous context,
locales, config, tokens, and types also retain unused agency content.

The payment worker (`worker/`), pricing/state code, migrations,
`docs/IYZICO_SANDBOX.md`, and Vite development payment middleware remain untouched.
They have no active marketing UI entry point. Payment APIs are not disabled by
this frontend change and require a separate backend lifecycle decision.

Both bun.lock and the requested npm install's package-lock.json are retained;
standardizing on one package manager is a separate maintenance decision.

## Changed-file manifest

Modified (6), relative to the repository root:
- index.html
- metadata.json
- package.json
- src/App.tsx
- src/index.css
- src/main.tsx

Added (10):
- docs/SECURITY_INTELLIGENCE_REPOSITIONING.md
- package-lock.json
- public/robots.txt
- public/sitemap.xml
- scripts/prerender.tsx
- scripts/validate-marketing.mjs
- src/security/DesignPartnerForm.tsx
- src/security/LanguageContext.tsx
- src/security/en.ts
- src/security/tr.ts

Final state: all 6 modifications are unstaged; all 10 additions are untracked.
HEAD and branch are unchanged. The working tree is intentionally dirty.
Local preview and validation servers were stopped after checking.
