# 10 Sprint Log

## 2026-06-20 - Project OS Documentation Sprint

Scope:

- Inspect repository structure.
- Identify tech stack, app structure, routes, UI components, chat implementation, and deployment readiness.
- Preserve visual direction.
- Create Codex-readable project documentation.

Findings:

- The app uses Next.js 16 App Router under `src/app`.
- Main reusable components live in `src/components`.
- The homepage and manifesto exist in Turkish and English.
- The chat is a client-side prototype with fixed responses.
- No verified backend, LLM, Supabase, Telegram, WhatsApp, or Resend integration exists.
- Current prototype does not require private environment variables.
- `.env*` files are ignored.

Files created or updated in this sprint:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/00_PROJECT_BRIEF.md`
- `docs/01_BRAND_AND_POSITIONING.md`
- `docs/02_BUSINESS_MODEL.md`
- `docs/03_MVP_SCOPE.md`
- `docs/04_AGENT_SYSTEM_DESIGN.md`
- `docs/05_TECHNICAL_ARCHITECTURE.md`
- `docs/06_UI_DESIGN_SYSTEM.md`
- `docs/07_CONTENT_AND_TONE_GUIDE.md`
- `docs/08_EXECUTION_BACKLOG.md`
- `docs/09_DECISION_LOG.md`
- `docs/10_SPRINT_LOG.md`
- `docs/11_DO_NOT_TOUCH.md`

Checks:

- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Build a deterministic, no-external-service discovery assistant flow inside the existing `CoreAiChat` UI.

## 2026-06-20 - Sprint 1 Discovery Assistant

Scope:

- Convert `CoreAiChat` from fixed response prototype into a deterministic local discovery flow.
- Preserve the terminal-like Leonardo Tales AI OS visual language.
- Add in-chat contact form without external services.
- Keep lead data in component state only.

Implemented:

- Added `DiscoveryCategory`, `DiscoveryStep`, `DiscoveryMessage`, `LeadDraft`, and `ContactPreference` types.
- Added a step-based flow: business description, friction question, classification, contact prompt, contact form, completion.
- Added local keyword-based classification into the four MVP paths.
- Added an in-chat contact form with required field and email validation.
- Stored submitted lead drafts in React component state.
- Added compact terminal-style form CSS.

Still not connected:

- LLM assistant.
- Supabase persistence.
- Telegram or WhatsApp notifications.
- Backend lead submission route.
- Email/Resend.

Checks:

- `npm run lint` passed.
- `npm run build` passed.
- No automated test script exists in `package.json`.

Next safest sprint:

Connect the validated lead draft to a small server-side lead submission boundary, then add Supabase persistence and Telegram notification behind verified environment variables.

## 2026-06-20 - Sprint 1.1 Discovery Assistant UX + Copy Calibration

Scope:

- Refine assistant copy and chat behavior.
- Improve the initial Turkish greeting.
- Replace cold technical wording in user-facing prompts.
- Add deterministic no-price-quote response.
- Improve form UX after successful local submit.
- Preserve existing terminal-like visual language.

Implemented:

- Opened the chat with a polished discovery-agent greeting instead of technical boot logs.
- Replaced user-facing "sürtünme" copy with "sizi en çok zorlayan süreç" language.
- Added pricing-intent detection and a no-price-quote policy response.
- Kept the form closed until the visitor confirms with intent like "evet", "tamam", "formu aç", or "iletişim".
- Hid the contact form after successful local submission.
- Reset the visible form draft while keeping the submitted lead in local state.
- Updated left panel status values: `MODE: LOCAL`, `PATH: WAITING/category`, `LEAD: LOCAL/DRAFT/READY`.
- Darkened the chat message area slightly for readability without changing brand colors.

Still not connected:

- LLM assistant.
- Supabase persistence.
- Telegram or WhatsApp notifications.
- Backend/API route.
- Email/Resend.

Checks:

- `npm run lint` passed.
- `npm run build` passed.
- No automated test script exists in `package.json`.

Next safest sprint:

Commit Sprint 1 + Sprint 1.1 together, then add a small server-side lead submission boundary before connecting Supabase and Telegram.

## 2026-06-20 - Sprint 1.2 Short Business-Aware Lead Capture Flow

Scope:

- Improve deterministic classification.
- Shorten the conversation so clear leads are not over-questioned.
- Make the assistant act more like a warm AI customer representative.
- Ask at most one clarifying question for unclear leads.
- Avoid pushing the form for casual/no-intent visitors.
- Refine form timing.
- Keep pricing response clear and authority-bounded.
- Preserve terminal-like visual language.

Implemented:

- Added weighted classifier boosts for combinations like web sitesi + AI asistan, web sitesi + müşteri karşılama, emlak ofisi + web/customer assistant, chatbot, WhatsApp customer reception.
- Updated path status codes to `WAITING`, `SUPPORT_WEB`, `SALES_PROPOSAL`, `OPERATIONS`, and `UNCLEAR`.
- Added customer-services-system and customer-representative boosts for support/web classification.
- Replaced longer discovery summaries with short business-aware user-facing confirmations.
- Added business-specific explanation for beauty centers and real estate offices.
- Added casual/no-intent handling for messages like "Canım sıkıldı", "Öylesine yazdım", or "Sadece bakıyorum".
- Changed unclear handling to one clarifying question, then contact-form offer if the need remains unclear.
- Kept form opening gated behind user confirmation or explicit contact intent.
- Preserved local-only lead draft behavior.

Still not connected:

- LLM assistant.
- Supabase persistence.
- Telegram or WhatsApp notifications.
- Backend/API route.
- Email/Resend.

Checks:

- `npm run lint` passed.
- `npm run build` passed.
- No automated test script exists in `package.json`.

Next safest sprint:

Commit Sprint 1 + Sprint 1.1 + Sprint 1.2 together, then add a small server-side lead submission boundary before Supabase and Telegram integration.

## 2026-06-21 - Sprint 1.4 Agent Conversation Eval Sprint

Scope:

- Add deterministic local conversation evals for the Leonardo Tales customer representative agent.
- Cover greeting, casual/no-intent, clear website + AI customer representative, beauty center, sales/proposal, operations/workflow, pricing, human contact, unclear AI interest, and valid form submission scenarios.
- Keep the assistant short, Turkish-first, business-aware, and local-only.
- Do not add LLM, Supabase, Telegram, WhatsApp, backend routes, or a heavy test framework.

Implemented:

- Added `src/lib/agent/evals.ts` as a lightweight local eval runner.
- Added `npm run eval:agent`.
- Added deterministic quality rules: concise Turkish response, no price numbers, no fake integration claims, no internal category codes, no early form opening for greeting/casual messages, form offer for clear intent, and immediate form handoff for human-contact intent.
- Improved simple greeting handling so "Merhaba" asks for business/project/need instead of jumping directly to category discovery.
- Fixed Turkish locale normalization for uppercase `AI`, which could become `aı` and miss AI-interest intent checks.
- Updated the customer representative agent protocol and agent system docs.

Weak behaviors found:

- Simple greeting was too quickly routed toward category discovery.
- Uppercase `AI` inside Turkish locale normalization could miss the technical-guidance branch.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Add a small server-side lead submission boundary with validation before connecting Supabase or Telegram.

## 2026-06-21 - Sprint 2 Server-side Lead Submission Boundary

Scope:

- Create a safe server-side API boundary for lead form submission.
- Add shared lead types and validation helpers.
- Prepare Supabase persistence without exposing service keys to the browser.
- Prepare Telegram notification without claiming it works before verification.
- Keep deterministic assistant behavior and premium chat UI intact.

Implemented:

- Added `POST /api/leads` Route Handler.
- Added `src/lib/leads/types.ts` and `src/lib/leads/validation.ts`.
- Added `src/lib/leads/supabase.ts` using server-side REST insert preparation.
- Added `src/lib/notifications/telegram.ts` using server-side Telegram API preparation.
- Added `supabase/migrations/001_create_leads.sql` with a `public.leads` table, constraints, indexes, RLS enabled, and a service-role policy.
- Added `.env.example` with placeholders only.
- Updated `CoreAiChat` so valid form submissions go through `/api/leads`.
- Added submit loading behavior and kept the form open on API failure.

Runtime behavior:

- `LEADS_STORAGE_MODE=local` returns local-only success for development and does not claim Supabase persistence.
- Supabase mode requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; missing env vars return setup-aware failure.
- Telegram notification runs only server-side and reports `not_configured` when env vars are missing.
- Telegram success is not required for lead storage success.

Verified later:

- Live Telegram bot/chat delivery was verified in Sprint 2.2.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Run a complete UI-to-Supabase-to-Telegram smoke test before public launch and then add anti-spam controls.

## 2026-06-21 - Sprint 2.1 Supabase + Telegram Live Verification

Scope:

- Verify the real Supabase persistence and Telegram notification path locally.
- Keep the verification secret-safe.
- Do not add product features or UI redesigns.

Inspection:

- `POST /api/leads` exists and returns setup-aware JSON.
- `.env.local` remains ignored.
- `.env.example` is allowed through `.gitignore`.
- Supabase migration exists at `supabase/migrations/001_create_leads.sql`.

Current environment status:

- `SUPABASE_URL`: set.
- `SUPABASE_SERVICE_ROLE_KEY`: set.
- `TELEGRAM_BOT_TOKEN`: missing.
- `TELEGRAM_CHAT_ID`: missing.
- `LEADS_STORAGE_MODE`: set.
- `LEADS_NOTIFICATION_MODE`: set.

Verification result:

- Supabase migration was applied manually in Supabase SQL Editor.
- `public.leads` is visible in Supabase Table Editor.
- Live Supabase insert was tested through `POST /api/leads`.
- Initial Supabase REST insert returned HTTP 403 / PostgREST `42501` permission denied for `public.leads`.
- Manual SQL grants were applied in Supabase SQL Editor:
  - `grant usage on schema public to service_role;`
  - `grant select, insert, update, delete on table public.leads to service_role;`
- After the service-role grants, direct Supabase REST insert returned HTTP 201.
- `POST /api/leads` returned `ok: true`.
- API response included `persistence: "stored"`.
- API response included `notification: "skipped"`, which is correct because Telegram is not configured yet.
- A test lead was created in `public.leads`.
- Live Telegram notification was not run.
- Local-only API path was smoke tested and returned `persistence: "local_only"` plus `notification: "skipped"`.
- No secret values were printed.
- Supabase helper was hardened so REST request exceptions return controlled storage failures instead of falling into the API route's generic unexpected-error branch.

Next action:

- Keep Supabase env vars in `.env.local` only.
- Delete or mark Sprint 2.1 test leads in Supabase if they should not remain in production data.
- Configure Telegram only when ready, then verify `notification: "sent"` with a separate smoke test.

## 2026-06-21 - Sprint 2.2 Telegram Lead Notification Verification

Scope:

- Verify Telegram lead notification after successful Supabase persistence.
- Keep Supabase storage as the source of truth.
- Do not expose Telegram or Supabase secrets.
- Do not test or add OpenAI/LLM.

Verified:

- Supabase persistence remained `persistence: "stored"`.
- Telegram notification returned `notification: "sent"`.
- Telegram message was received.
- Telegram notification did not block Supabase persistence.
- No secret values were printed or committed.

Current integration status:

- Supabase lead persistence: verified.
- Telegram lead notification: verified.
- WhatsApp, Resend, OpenAI/LLM: not configured.

Next safest sprint:

Add basic spam/rate-limit protection and a production smoke-test checklist before sending public traffic to the form.

## 2026-06-21 - Sprint 2.3 Spam / Rate Limit / Production Smoke Checklist

Scope:

- Add minimal anti-spam protection to `POST /api/leads`.
- Keep the deterministic assistant and premium chat UI unchanged.
- Keep Supabase persistence and Telegram notification behavior intact.
- Do not add OpenAI/LLM or external rate-limit infrastructure.
- Add a production smoke checklist for the first public traffic pass.

Implemented:

- Added `website_url` honeypot and `form_started_at` fields to the chat form payload.
- Kept those anti-spam fields hidden/offscreen and out of the visible UI.
- Added server-side normalization and trimming for lead strings.
- Added server-side max length checks for name, email, phone, company/project, website, note, business type, detected need, and conversation summary.
- Rejected filled honeypot submissions before persistence.
- Rejected form submissions under 2 seconds before persistence.
- Added a process-local IP limiter at 5 lead submissions per IP per 10 minutes.
- Added safe Turkish `400` responses for invalid/spam submissions and `429` responses for rate-limited submissions.
- Hardened Telegram notification request failures so stored leads still return success with `notification: "failed"`.
- Added `npm run eval:leads` for deterministic validation/rate-limit checks.
- Added `docs/12_PRODUCTION_SMOKE_CHECKLIST.md`.

Known limitation:

- The in-memory rate limiter is best-effort only. It can reset on server restart and does not coordinate across serverless regions or multiple instances.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run eval:leads` passed 6/6 scenarios.
- `npm run lint` passed.
- `npm run build` passed.

Next safest sprint:

Keep local development active, review the production smoke checklist, and postpone Vercel/deploy work until a deliberate production readiness sprint resumes it.

## 2026-06-22 - Sprint 3.0 Agent Control Principles & Architecture Alignment

Scope:

- Add a long-term architectural principles document for designing, limiting, monitoring, and controlling AI agents.
- Align project docs with the verified local MVP state.
- Keep this sprint documentation-only.
- Do not add OpenAI/LLM, runtime behavior, UI redesign, Vercel/deploy changes, or `.env.local` changes.

Implemented:

- Added `docs/13_AGENT_CONTROL_PRINCIPLES.md`.
- Defined the core thesis: as agents become more capable, the control layer becomes more central.
- Framed agents as bounded operational components requiring permission boundaries, telemetry, human handoff, audit logs, sandboxing, rollback, kill-switches, and measurable business outcomes.
- Added Agent Control Layer as a future product category, not current MVP scope.
- Clarified product impact for AI Müşteri Temsilcisi, AI Satış ve Teklif Sistemleri, AI Operasyon Otomasyonu, Agent Operating Systems, and AGI Development.
- Updated project brief, business model, agent system design, technical architecture, execution backlog, do-not-touch rules, and README references.

MVP scope:

- Unchanged.
- Current MVP remains the deterministic discovery assistant plus lead capture path.
- Supabase persistence and Telegram notification remain verified local lead infrastructure.
- OpenAI/LLM, WhatsApp, Resend, CRM/admin, automated pricing, and deploy remain outside current verified scope.

Delivery posture:

- Local development continues.
- Vercel/deploy is postponed.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run eval:leads` passed 6/6 scenarios.
- `npm run lint` passed.
- `npm run build` passed.
- Note: `npm run eval:leads` emitted the existing Node module-type warning for `src/lib/leads/validation.ts`; the eval still passed.

Next safest sprint:

Run a focused production readiness pass locally: verify evals, lint, build, review the production smoke checklist, and only then decide whether to resume Vercel/deploy work.

## 2026-06-22 - Sprint 3.2 Local Telegram Recheck + Manual Browser QA

Scope:

- Re-check the local Telegram notification path with a safe synthetic lead payload.
- Guide a small manual browser QA pass.
- Keep Vercel/deploy, production domain work, OpenAI/LLM, new product features, UI redesign, `.env.local` edits, and MVP scope unchanged.

Verification:

- `.env.local` was not read, printed, edited, or committed.
- The local dev server loaded `.env.local` without exposing values.
- Initial safe synthetic `POST /api/leads` result: HTTP 200, `ok: true`, `persistence: "stored"`, `notification: "skipped"`.
- The skipped notification was caused by local notification mode still being `LEADS_NOTIFICATION_MODE=none`.
- The developer corrected local mode to `LEADS_STORAGE_MODE=supabase` and `LEADS_NOTIFICATION_MODE=telegram` without exposing values.
- Follow-up developer-confirmed local recheck returned `persistence: "stored"` and `notification: "sent"`.
- Developer confirmed the Telegram message was received.
- Supabase persistence remained healthy.
- Telegram local notification path is verified for Sprint 3.2.
- HTTP route smoke returned 200 for `/`, `/en`, `/manifesto`, and `/en/manifesto`.
- Manual browser QA steps were provided to the developer, but independent browser automation was unavailable and Playwright/Chrome were not installed locally.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run eval:leads` passed 6/6 scenarios with the existing non-failing Node module-type warning.
- `npm run lint` passed.
- `npm run build` passed.

Remaining risks:

- Manual browser QA still needs developer confirmation or a browser automation tool.
- Local synthetic smoke leads may need manual cleanup in Supabase.
- Vercel/deploy and production-domain verification remain postponed.

Next safest sprint:

Complete the manual browser QA checklist, then decide whether to add lightweight browser automation before any deploy work resumes.

## 2026-06-22 - Sprint 3.3 Manual Browser QA Pass

Scope:

- Perform a focused local browser QA pass for the Leonardo Tales MVP.
- Keep Vercel/deploy, production domain work, OpenAI/LLM, new integrations, UI redesign, `.env.local`, and MVP scope unchanged.

Verification method:

- Used local Firefox through `geckodriver`.
- Captured screenshots outside the repo under `/tmp`.
- Did not read, print, edit, or commit `.env.local`.

Route QA:

- `/`, `/en`, `/manifesto`, `/en/manifesto`, `/robots.txt`, and `/sitemap.xml` rendered with content and no framework error overlay.

Desktop UI QA:

- Top nav rendered correctly.
- Chat shell rendered correctly.
- Left protocol panel looked stable.
- Chat area remained readable.
- Composer input worked.
- Dark integrated chat scrollbar remained consistent; no distracting white strip was visible.
- Response pacing worked through the browser-driven chat scenarios.

Chat behavior QA:

- `Merhaba` returned a short Turkish greeting and did not open the form.
- `Canım sıkıldı, öylesine yazdım.` responded lightly and did not open the form.
- `Web sitesi istiyorum, içinde yapay zekâ müşteri temsilcisi olsun.` classified the need and offered the form without a long consulting flow.
- `Benim bir güzellik merkezim var.` now returns the beauty-center web + appointment/customer assistant guidance.
- `Fiyat ne kadar?` did not quote a price.
- `Formu aç` opened the form.
- No fake integration claims appeared in chat responses.

Fix:

- Added `güzellik merkezim` to the deterministic classifier and mirrored eval logic so the exact manual QA phrase maps to the beauty-center path.

Form QA:

- Empty required submit was blocked by browser validation.
- Invalid email submit was blocked by browser validation.
- Valid form submitted through the visible chat UI.
- Form closed after success.
- Success message was accurate.
- Browser-captured API result returned `persistence: "stored"` and `notification: "sent"`.
- Hidden honeypot was not visible.

Mobile QA:

- Narrow Firefox viewport triggered the mobile CSS layout under the `max-width: 640px` breakpoint.
- Chat shell, input, and form remained usable.
- No horizontal overflow was detected.
- Firefox headless reported an inner width of 500px even when 390px was requested, so exact 390px verification remains a residual manual-device risk.

Checks:

- `npm run eval:agent` passed 10/10 scenarios.
- `npm run eval:leads` passed 6/6 scenarios with the existing non-failing Node module-type warning.
- `npm run lint` passed.
- `npm run build` passed.

Remaining risks:

- Browser console logs were not available through this WebDriver setup; no framework overlay was detected.
- Local synthetic smoke leads may need manual cleanup in Supabase.
- Vercel/deploy and production-domain verification remain postponed.

Next safest sprint:

Either verify exact 390px mobile behavior on a real browser/device or add a lightweight browser QA command before any deploy work resumes.

## 2026-06-22 - Session Closeout & Sprint 3.4 Preparation

Scope:

- Pause active implementation.
- Record the verified local MVP state.
- Capture manual QA findings and next-sprint objectives.
- Do not add OpenAI/LLM, new runtime features, new integrations, UI redesign, Vercel/deploy work, or `.env.local` changes.

Current verified local MVP state:

- Local MVP is working.
- Supabase persistence is verified locally with `persistence: "stored"`.
- Telegram notification is verified locally with `notification: "sent"` and message received.
- Spam protections exist: honeypot, minimum dwell time, field limits, and best-effort in-memory IP rate limit.
- `npm run eval:agent` passes 10/10.
- `npm run eval:leads` passes 6/6.
- `npm run lint` passes.
- `npm run build` passes.
- Vercel/deploy remains intentionally postponed.

Manual QA findings carried forward:

- Opening assistant message works but should feel more distinctive, warm, slightly witty, intelligent, and professional without claiming consciousness or sounding mystical/arrogant.
- Response pacing still feels too instant; next sprint should adjust the deterministic thinking state and delay.
- Optional website field can block `www.leonardotales.com`; next sprint should accept empty website and normalize `www.example.com` to `https://www.example.com`.
- Preferred contact channel label is unclear; next sprint should use clearer Turkish copy and add a neutral option like `Fark etmez` or `Kararsızım`.
- Harmful intent such as unauthorized hacking was accepted too easily; this is a deploy blocker.
- Oversized product requests such as building a Google competitor need realistic MVP framing.
- The future UI direction is chat-first hero architecture, especially on mobile, but no redesign is started in this closeout.

Sprint 3.4 prepared:

- Name: `Sprint 3.4 - Chat UX, Safety Guardrails & Form Refinement`.
- Purpose: fix chat UX, harmful-intent refusal, oversized-scope framing, and form clarity before deploy work resumes.
- Constraints: no OpenAI/LLM, no new integrations, no Vercel/deploy, no MVP expansion, preserve the current terminal-like premium visual style.

Next safest prompt:

`Start Sprint 3.4: Chat UX, Safety Guardrails & Form Refinement. First inspect docs/10_SPRINT_LOG.md, docs/08_EXECUTION_BACKLOG.md, docs/04_AGENT_SYSTEM_DESIGN.md, docs/agent-templates/leonardo-tales-customer-representative-agent.md, src/components/CoreAiChat.tsx, src/lib/agent/evals.ts, and src/lib/leads/validation.ts. Do not add OpenAI/LLM or resume deploy. Implement only the documented Sprint 3.4 fixes, then run evals, lint, build, and browser QA.`

## 2026-06-22 - Sprint 3.4 Public Repositioning To Hakan Leonardo

Scope:

- Reposition the current repository as Hakan Leonardo's public business/services website.
- Preserve the existing Next.js architecture, deterministic AI discovery assistant, lead API, Supabase path, Telegram path, routes, and terminal-like UI style.
- Do not add OpenAI/LLM, new integrations, new product features, UI redesign, Vercel/deploy work, or `.env.local` changes.

Decision:

- This repository is no longer the final Leonardo Tales Core, Dev, Science, agent OS, or software factory project.
- Those larger systems should be created later in clean, separate repositories.
- Public copy should focus on practical AI systems: AI customer representative, AI sales/proposal assistant, and AI operations automation.

Implementation summary:

- Rebranded public metadata, homepage copy, terminal logs, wordmark text, manifesto intro, chat assistant copy, lead success copy, Telegram lead title, README, and `public/llms.txt` to Hakan Leonardo.
- Updated project docs to record the new repository purpose and prevent Core/Dev/Science or agent OS scope creep.
- Kept the existing lead data contract `source: "leonardo_tales_ai_representative"` unchanged to avoid schema/API churn during a positioning sprint.
- Kept deployment/domain settings unchanged.

Known references intentionally preserved or deferred:

- Historical sprint log references to Leonardo Tales remain as history.
- File names such as `docs/agent-templates/leonardo-tales-customer-representative-agent.md` remain unchanged for now.
- Internal source identifier `leonardo_tales_ai_representative` remains until a deliberate data-contract migration.
- Default `NEXT_PUBLIC_SITE_URL` fallback and production domain choice require a later deployment/domain decision.

Next safest sprint:

Start Sprint 3.5: Chat UX, Safety Guardrails & Form Refinement, using the Hakan Leonardo public-site positioning as the baseline. Do not resume Vercel/deploy.

## 2026-06-22 - Sprint 3.5 Vision Rename, Single Assistant Surface & Public Site Completion

Scope:

- Complete Hakan Leonardo public-site alignment.
- Convert public Manifesto language to Vizyon.
- Leave `.env.local`, secrets, deploy, database migrations, OpenAI/LLM, and Leonardo Tales Core/Dev/Science scope untouched.

Implementation summary:

- Added `/vizyon` and `/en/vision` as the public vision routes.
- Redirected `/manifesto` to `/vizyon` and `/en/manifesto` to `/en/vision`.
- Updated public nav, footer links, sitemap, README, and `public/llms.txt` for Vizyon/Vision.
- Replaced the long manifesto copy with Hakan Leonardo Vizyonu copy and principles.
- Moved the active `CoreAiChat` into the hero as the single assistant surface.
- Removed the lower duplicate chat section from the homepage flow.
- Added `Nasıl Çalışır` / `How It Works` process cards.
- Added harmful/illegal intent refusal and oversized product MVP/prototype framing to deterministic chat behavior.
- Updated agent evals to cover the new safety and scope guardrails.

Known deferred items:

- Internal style class names may still contain `manifesto-*`; they are not visible copy.
- Internal source identifier `leonardo_tales_ai_representative` remains unchanged by design.
- Production domain and deploy work remain postponed.

Next safest sprint:

Run a focused visual QA/follow-up pass on the Hakan Leonardo public site, then decide whether to clean internal naming such as CSS class names or data-source identifiers in a separate migration-safe sprint.

## 2026-06-22 - Sprint 3.6 Hero Chat Repair, Process Polish & Vision Simplification

Scope:

- Repair the hero assistant layout.
- Remove confusing technical labels from the public chat surface.
- Remove `/vizyon` from the public navbar while keeping the route available.
- Simplify the homepage vision section.
- Polish the `Nasıl Çalışır` section into premium process cards.
- Do not add OpenAI/LLM, integrations, deploy/domain work, database migrations, new product features, or `.env.local` changes.

Implementation summary:

- Removed the visible `ACTIVE_PROTOCOLS` sidebar from `CoreAiChat`.
- Changed the public chat title to `Yapay Zekâ İş Temsilcisi`.
- Changed the public chat status to `HAKAN_LEONARDO / ONLINE`.
- Kept the homepage to one active assistant surface.
- Removed `/vizyon` from the public navbar and changed the hero secondary CTA to `SİSTEMLERİ_GÖR` pointing at `#systems`.
- Replaced the homepage vision section with the focused Hakan Leonardo Vizyonu paragraph, quote, and signature.
- Removed the Soyutlama / Zekâ / Kontrol / Etki cards from the homepage vision section.
- Reworked `Nasıl Çalışır` into four dark terminal-style process cards.

Verification:

- `npm run eval:agent` passed 12/12.
- `npm run eval:leads` passed 6/6 with the existing non-failing Node module-type warning.
- `npm run lint` passed.
- `npm run build` passed.
- Firefox/geckodriver QA passed for `/` at 390-requested, 768, and 1440 viewport sizes: one chat surface, no visible Active Protocols panel, correct chat title, visible input when the assistant is in view, no horizontal overflow, no `/vizyon` navbar item, simplified vision section, polished process copy, and no framework overlay.
- Direct `Formu aç` interaction opened the form and the honeypot remained hidden.

Known deferred items:

- Firefox headless reports an inner width around 500px when 390px is requested, so a real-device 390px pass remains useful.
- Browser-plugin console capture is unavailable in this local setup.
- Vercel/deploy and production-domain checks remain postponed.

Next safest sprint:

Run one final real-device mobile QA pass for the public homepage, then prepare a deploy-readiness-only sprint when deployment work is deliberately resumed.

## 2026-06-22 - Sprint 3.7 SEO/GEO, Share Preview, Security Final Check & Project Parking

Scope:

- Prepare the Hakan Leonardo public site for project parking before deployment resumes later.
- Align SEO/GEO metadata and social preview assets.
- Add low-risk minimum security headers.
- Run bounded security checks without reading or exposing `.env.local`.
- Do not add OpenAI/LLM, deploy/domain work, database migrations, new product scope, or Leonardo Tales Core/Dev/Science work.

Implementation summary:

- Changed public metadata, sitemap, robots, and `llms.txt` production fallback to `https://hakanleonardo.com`.
- Updated Turkish metadata to `Hakan Leonardo | Yapay Zekâ İş Sistemleri`.
- Updated English metadata to `Hakan Leonardo | AI Business Systems`.
- Added Open Graph and Twitter/X `summary_large_image` metadata.
- Added sade Organization and WebSite JSON-LD without fake address, fake reviews, fake prices, awards, or unverified social links.
- Added new Hakan Leonardo OG image, brand logo, app icon, apple icon, and favicon.
- Added minimum security headers through `next.config.ts`.
- Created `docs/14_PROJECT_PARKING_REPORT.md`.

Verification:

- `npm run eval:agent` passed 12/12.
- `npm run eval:leads` passed 6/6 with the existing non-failing Node module-type warning.
- `npm run lint` passed.
- `npm run build` passed.
- `npm audit --omit=dev` reported 2 moderate findings through Next's transitive PostCSS dependency; no breaking `--force` fix was applied.
- Bounded security check found no private env usage in client components and confirmed `.env.local` is not tracked.
- Local metadata QA confirmed title, description, OG/Twitter fields, icons, OG image path, robots, sitemap, and security headers on a production server at port 3001.
- Browser QA passed for mobile, tablet, and desktop: no horizontal overflow, no visible Manifesto/Leonardo Tales public copy, no `/vizyon` navbar item, CTA links to `#assistant`, chat input present, and `Formu aç` opens the form.

Known deferred items:

- Real production domain verification remains postponed.
- WhatsApp/social crawler preview must be verified after the public domain is live.
- Strict CSP was not added because it should be handled as a dedicated hardening pass.
- Dependency advisory remediation should wait for a safe Next/PostCSS upgrade path.

Next safest sprint:

Resume with domain/Vercel connection only when deployment work is deliberately started, then run the production smoke checklist and real social preview checks.
