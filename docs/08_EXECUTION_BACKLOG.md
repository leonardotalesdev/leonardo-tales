# 08 Execution Backlog

## Sprint 0 - Project OS Documentation

Status: in progress during this documentation sprint.

- Create project OS docs.
- Document current architecture.
- Record visual constraints.
- Record MVP scope.
- Run lint/build checks.

## Sprint 1 - Discovery Assistant Prototype

Status: completed.

Goal: convert `CoreAiChat` from fixed response prototype into a deterministic discovery flow without external integrations.

Tasks:

- Define assistant state machine.
- Add Turkish-first questions.
- Add local classification rules.
- Add lead path result.
- Add in-chat contact form UI.
- Keep all data local/no persistence for this sprint.
- Add basic tests if practical.

Result:

- Implemented in `src/components/CoreAiChat.tsx`.
- Added minimal matching CSS in `src/app/globals.css`.
- No external service was added.
- No automated tests exist in the repo yet.

## Sprint 1.1 - Discovery Assistant UX + Copy Calibration

Status: completed.

Goal: refine chat behavior, copy, form UX, and readability before backend/API integration.

Tasks:

- Replace cold technical user-facing wording.
- Improve the initial assistant greeting.
- Add pricing-question handling without quoting prices.
- Ensure the form opens only after confirmation.
- Hide the form after valid local submission.
- Keep one active form at a time.
- Improve chat message readability without changing brand colors.
- Make left protocol panel status values intentional.

Result:

- Calibrated Turkish-first assistant copy.
- Replaced user-facing "sürtünme" wording with clearer "zorlayan süreç" language.
- Added deterministic price-intent response.
- Kept submitted leads in local component state only.
- Confirmed no external service, backend route, or API integration was added.

## Sprint 1.2 - Short Business-Aware Lead Capture Flow

Status: completed.

Goal: shorten the deterministic assistant flow while making it warmer and more business-aware.

Tasks:

- Strengthen classification for website + AI assistant/customer reception intents.
- Map sales/proposal language to `AI Satış ve Teklif Sistemi`.
- Map operations/task/workflow language to `AI Operasyon Otomasyonu`.
- Avoid detailed follow-up questions once the need is already clear.
- Ask only one simple clarifying question when the need is unclear.
- Respond lightly to casual/no-intent visitors without pushing the form.
- Add short business-specific explanation for clear business types.
- Offer the form after clear confirmation or continued interest.
- Keep pricing response authority-bounded and number-free.
- Keep confirmations short and user-facing.
- Keep left panel status values coherent.

Result:

- Added weighted deterministic scoring and phrase/combination boosts.
- Added short lead-capture confirmations instead of long discovery summaries.
- Added one-question unclear flow.
- Added business-aware explanation for examples such as beauty center and real estate office.
- Added casual/no-intent handling that asks what the visitor does.
- Preserved local-only form storage and existing terminal visual language.
- Confirmed no external integration was added.

## Sprint 1.3 - Premium Chat UI Polish

Status: completed.

Goal: improve the chat panel's premium feel without redesigning the site or adding integrations.

Result:

- Replaced bright scrollbar behavior with dark integrated scrollbars.
- Made the left protocol/status panel feel more active with restrained green glow and status depth.
- Added deterministic response pacing with a short local "Yanıt hazırlanıyor..." state.
- Preserved the terminal-like Leonardo Tales AI OS visual language.

## Sprint 1.4 - Agent Conversation Eval Sprint

Status: completed.

Goal: create a lightweight deterministic conversation evaluation system for the local customer representative agent.

Tasks:

- Add local eval scenarios for greeting, casual/no-intent, clear web + AI assistant need, beauty center, sales/proposal, operations, pricing, human contact, unclear AI interest, and form submission.
- Add quality rules for Turkish-first concise replies, no price quotes, no fake integration claims, no internal category codes, and correct form timing.
- Improve greeting behavior so "Merhaba" asks for business/project/need instead of jumping to category discovery.
- Normalize Turkish-locale `AI` casing so uppercase `AI` is recognized as `ai`.

Result:

- Added `src/lib/agent/evals.ts`.
- Added `npm run eval:agent`.
- Kept all behavior deterministic and local.
- No external service, backend route, or heavy test framework was added.

## Sprint 2 - Lead Capture Backend

Status: completed as server-side boundary and integration preparation.

Goal: store classified leads safely.

Tasks:

- Choose Server Action or Route Handler.
- Define lead payload schema.
- Add server-side validation.
- Add Supabase project and table only after credentials are available.
- Insert lead into Supabase.
- Do not commit `.env*`.
- Verify locally with real env vars.

Result:

- Chose `POST /api/leads` Route Handler.
- Added shared lead types and server-side validation.
- Added Supabase REST insert helper using server-only `SUPABASE_SERVICE_ROLE_KEY`.
- Added Telegram notification helper using server-only bot env vars.
- Added `supabase/migrations/001_create_leads.sql`.
- Added `.env.example` with placeholder env names only.
- Updated `CoreAiChat` to submit form data through the API route.
- Kept form open when API submission fails.
- No OpenAI, WhatsApp, Resend, dashboard, or admin panel was added.
- Live Supabase insert was verified after applying the migration and service-role grants.
- Telegram notification still requires real env vars and live bot/chat verification.

## Sprint 3 - Lead Notifications

Goal: notify team after lead capture.

Tasks:

- Add Telegram bot notification first.
- Keep WhatsApp as later option.
- Include lead summary, classification, and contact details.
- Add failure handling that does not lose the lead.

## Sprint 4 - Production Readiness

Goal: prepare the MVP for public traffic.

Tasks:

- Run full build.
- Add 404/error states if missing.
- Review metadata and OG assets.
- Add rate limiting or spam protection if public form is live.
- Verify deployment environment.
- Smoke test all routes.

## Backlog Rules

- Keep each sprint small and shippable.
- Do not build an admin platform before leads are being captured.
- Do not add pricing automation in the assistant.
- Preserve existing visual direction.
