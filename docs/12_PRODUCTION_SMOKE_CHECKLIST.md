# 12 Production Smoke Checklist

Use this checklist before sending public traffic to the lead form.

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

- [ ] Form success path works from the visible chat UI.
- [x] API success response includes `persistence: "stored"`. Sprint 3.2 local Telegram recheck result: passed.
- [x] API success response includes `notification: "sent"` or an expected non-blocking notification status. Sprint 3.2 follow-up local Telegram recheck result: `notification: "sent"`.
- [ ] Supabase `public.leads` receives the submitted test lead.
- [x] Telegram message is received when notification mode is enabled. Sprint 3.2 follow-up local recheck: developer confirmed message receipt.
- [ ] Telegram failure does not block a successful Supabase insert.
- [ ] Required-field validation path returns a safe Turkish error.
- [ ] Invalid email validation path returns a safe Turkish error.
- [ ] Honeypot-filled payload is rejected and does not create a Supabase row.
- [ ] Too-fast payload is rejected and does not create a Supabase row.
- [ ] Sixth lead submission from the same IP inside 10 minutes returns HTTP 429.

## UI Smoke

- [x] Turkish homepage loads. Sprint 3.2 HTTP route smoke: `/` returned 200.
- [x] English homepage loads. Sprint 3.2 HTTP route smoke: `/en` returned 200.
- [x] Turkish manifesto loads. Sprint 3.2 HTTP route smoke: `/manifesto` returned 200.
- [x] English manifesto loads. Sprint 3.2 HTTP route smoke: `/en/manifesto` returned 200.
- [ ] Chat remains usable on mobile viewport. Manual browser QA was guided; independent confirmation remains pending.
- [ ] Contact form remains visually compact and hidden anti-spam fields are not visible. Manual browser QA was guided; independent confirmation remains pending.
- [ ] No console errors appear during normal form submission. Postponed until browser automation or developer manual confirmation is available.

## Deployment

- [ ] Vercel deploy URL is tested end-to-end. Postponed.
- [ ] Production domain `leonardotales.com` is tested after DNS/domain routing is active. Postponed.
- [ ] Test leads are marked or removed from production data after smoke testing.

## Notes

- The current IP rate limiter is in-memory and best-effort only.
- It can reset between deployments, cold starts, process restarts, regions, or multiple instances.
- Add a shared external limiter later if abuse volume increases.
