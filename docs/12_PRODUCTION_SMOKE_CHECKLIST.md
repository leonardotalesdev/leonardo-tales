# 12 Production Smoke Checklist

Use this checklist before sending public traffic to the lead form.

## Pre-Deploy Blockers Carried To Sprint 3.4

Do not resume Vercel/deploy work until these local MVP issues are resolved and re-tested:

- Harmful or illegal intent must be refused deterministically and must not open the lead form.
- Oversized product requests must be framed realistically as MVP/prototype discovery, not accepted as full-scale build promises.
- Optional website field must not block users who leave it empty or type a common `www.example.com` style address.
- Preferred contact channel copy must be clearer.
- Opening assistant message and response pacing should be improved without adding OpenAI/LLM.
- Exact small-mobile behavior should be checked again after Sprint 3.4 changes.

## Sprint 3.3 Manual Browser QA Pass

Date: 2026-06-22.

Scope:

- Local development only.
- Firefox WebDriver QA through local `geckodriver`.
- No Vercel/deploy work.
- No production domain work.
- No `.env.local` reading, printing, editing, or committing.
- No OpenAI/LLM.
- No new integrations.
- No UI redesign.

Result summary:

- Route checks passed for `/`, `/en`, `/manifesto`, `/en/manifesto`, `/robots.txt`, and `/sitemap.xml`.
- Desktop rendered QA passed: top nav, chat shell, left protocol panel, readable chat area, integrated dark scrollbar, and composer were visible and stable.
- Chat scenario QA passed for greeting, casual/no-intent, website + AI representative, beauty center, pricing, and direct form-open intent.
- Tiny fix applied: the deterministic classifier now recognizes the exact manual QA phrase `güzellik merkezim`.
- Form QA passed: empty required fields and invalid email were blocked by browser validation; valid form submitted; form closed after success.
- Browser-captured form submission returned `persistence: "stored"` and `notification: "sent"`.
- Hidden honeypot was not visible.
- Narrow responsive QA passed under the `max-width: 640px` layout breakpoint with no horizontal overflow. Firefox headless reported an inner width of 500px even when 390px was requested.
- Browser console logs were not captured by this WebDriver setup; no framework error overlay was detected.

## Sprint 3.2 Local Telegram Recheck + Manual Browser QA

Date: 2026-06-22.

Scope:

- Local development only.
- No Vercel/deploy work.
- No production domain work.
- No `.env.local` reading, printing, editing, or committing.
- No OpenAI/LLM.
- No new product features.
- No UI redesign.

Result summary:

- Local eval, lint, and build checks passed.
- Local dev server loaded `.env.local`, but no secret values were printed.
- A safe synthetic `POST /api/leads` payload returned HTTP 200 with `ok: true` and `persistence: "stored"`.
- The first Sprint 3.2 API attempt returned `notification: "skipped"` because local notification mode was still `LEADS_NOTIFICATION_MODE=none`.
- The developer corrected local mode to `LEADS_STORAGE_MODE=supabase` and `LEADS_NOTIFICATION_MODE=telegram` without exposing values.
- Follow-up developer-confirmed local recheck returned `persistence: "stored"` and `notification: "sent"`.
- Telegram message receipt was confirmed by the developer.
- Route-level HTTP smoke passed for `/`, `/en`, `/manifesto`, and `/en/manifesto`.
- Browser automation and local Playwright/Chrome were unavailable, so manual browser QA was guided for the developer rather than independently automated here.

## Environment

- [ ] Vercel project is linked to the correct repository. Postponed.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the deployment origin. Postponed.
- [ ] `SUPABASE_URL` is present in Vercel environment variables. Postponed.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is present in Vercel environment variables and is never exposed to the browser. Postponed.
- [ ] `LEADS_STORAGE_MODE=supabase` is set for production. Postponed.
- [ ] `TELEGRAM_BOT_TOKEN` is present if Telegram notifications are enabled. Postponed for deployed production.
- [ ] `TELEGRAM_CHAT_ID` is present if Telegram notifications are enabled. Postponed for deployed production.
- [ ] `LEADS_NOTIFICATION_MODE=telegram` is set only after Telegram is verified. Postponed for deployed production.
- [x] `.env.local` remains local only and is not committed.

## Local Checks

- [x] `npm run eval:agent` passes. Sprint 3.2 result: 10/10 passed.
- [x] `npm run eval:leads` passes. Sprint 3.2 result: 6/6 passed with the existing non-failing Node module-type warning.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.

## Lead Flow

- [x] Form success path works from the visible chat UI. Sprint 3.3 Firefox WebDriver result: valid form submitted and closed after success.
- [x] API success response includes `persistence: "stored"`. Sprint 3.3 browser-captured form submit result: passed.
- [x] API success response includes `notification: "sent"` or an expected non-blocking notification status. Sprint 3.3 browser-captured form submit result: `notification: "sent"`.
- [x] Supabase `public.leads` receives the submitted test lead. Sprint 3.3 browser-captured form submit returned `persistence: "stored"`.
- [x] Telegram message is received when notification mode is enabled. Sprint 3.2 follow-up local recheck: developer confirmed message receipt.
- [ ] Telegram failure does not block a successful Supabase insert.
- [x] Required-field validation path works. Sprint 3.3 browser validation blocked empty required submit before API submission.
- [x] Invalid email validation path works. Sprint 3.3 browser validation blocked invalid email submit before API submission.
- [x] Honeypot-filled payload is rejected and does not create a Supabase row. Covered by `npm run eval:leads`.
- [x] Too-fast payload is rejected and does not create a Supabase row. Covered by `npm run eval:leads`.
- [x] Sixth lead submission from the same IP inside 10 minutes returns HTTP 429. Covered by `npm run eval:leads`.

## UI Smoke

- [x] Turkish homepage loads. Sprint 3.3 Firefox route smoke: `/` rendered with content and no framework overlay.
- [x] English homepage loads. Sprint 3.3 Firefox route smoke: `/en` rendered with content and no framework overlay.
- [x] Turkish manifesto loads. Sprint 3.3 Firefox route smoke: `/manifesto` rendered with content and no framework overlay.
- [x] English manifesto loads. Sprint 3.3 Firefox route smoke: `/en/manifesto` rendered with content and no framework overlay.
- [x] `robots.txt` loads. Sprint 3.3 Firefox route smoke rendered content.
- [x] `sitemap.xml` loads. Sprint 3.3 Firefox route smoke rendered content.
- [x] Chat remains usable on mobile viewport. Sprint 3.3 narrow Firefox viewport verified chat shell, input, and form under the mobile CSS breakpoint.
- [x] Contact form remains visually compact and hidden anti-spam fields are not visible. Sprint 3.3 Firefox check: honeypot not visible.
- [ ] No console errors appear during normal form submission. Browser console logs were not available through this WebDriver setup; no framework error overlay was detected.

## Deployment

- [ ] Vercel deploy URL is tested end-to-end. Postponed.
- [ ] Production domain `leonardotales.com` is tested after DNS/domain routing is active. Postponed.
- [ ] Test leads are marked or removed from production data after smoke testing.

## Notes

- The current IP rate limiter is in-memory and best-effort only.
- It can reset between deployments, cold starts, process restarts, regions, or multiple instances.
- Add a shared external limiter later if abuse volume increases.
