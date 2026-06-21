# 12 Production Smoke Checklist

Use this checklist before sending public traffic to the lead form.

## Environment

- [ ] Vercel project is linked to the correct repository.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the deployment origin.
- [ ] `SUPABASE_URL` is present in Vercel environment variables.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is present in Vercel environment variables and is never exposed to the browser.
- [ ] `LEADS_STORAGE_MODE=supabase` is set for production.
- [ ] `TELEGRAM_BOT_TOKEN` is present if Telegram notifications are enabled.
- [ ] `TELEGRAM_CHAT_ID` is present if Telegram notifications are enabled.
- [ ] `LEADS_NOTIFICATION_MODE=telegram` is set only after Telegram is verified.
- [ ] `.env.local` remains local only and is not committed.

## Local Checks

- [ ] `npm run eval:agent` passes.
- [ ] `npm run eval:leads` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Lead Flow

- [ ] Form success path works from the visible chat UI.
- [ ] API success response includes `persistence: "stored"`.
- [ ] API success response includes `notification: "sent"` or an expected non-blocking notification status.
- [ ] Supabase `public.leads` receives the submitted test lead.
- [ ] Telegram message is received when notification mode is enabled.
- [ ] Telegram failure does not block a successful Supabase insert.
- [ ] Required-field validation path returns a safe Turkish error.
- [ ] Invalid email validation path returns a safe Turkish error.
- [ ] Honeypot-filled payload is rejected and does not create a Supabase row.
- [ ] Too-fast payload is rejected and does not create a Supabase row.
- [ ] Sixth lead submission from the same IP inside 10 minutes returns HTTP 429.

## UI Smoke

- [ ] Turkish homepage loads.
- [ ] English homepage loads.
- [ ] Turkish manifesto loads.
- [ ] English manifesto loads.
- [ ] Chat remains usable on mobile viewport.
- [ ] Contact form remains visually compact and hidden anti-spam fields are not visible.
- [ ] No console errors appear during normal form submission.

## Deployment

- [ ] Vercel deploy URL is tested end-to-end.
- [ ] Production domain `leonardotales.com` is tested after DNS/domain routing is active.
- [ ] Test leads are marked or removed from production data after smoke testing.

## Notes

- The current IP rate limiter is in-memory and best-effort only.
- It can reset between deployments, cold starts, process restarts, regions, or multiple instances.
- Add a shared external limiter later if abuse volume increases.
