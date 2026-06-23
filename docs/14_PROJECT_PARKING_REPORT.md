# 14 Project Parking Report

Date: 2026-06-22

## Current State

The Hakan Leonardo public business/services website is ready to park locally for the day.

Verified local state:

- Public homepage is positioned around practical AI business systems.
- The deterministic AI discovery assistant remains active in the hero.
- Lead capture flow remains protected by validation, honeypot, minimum dwell time, and best-effort in-memory rate limiting.
- Supabase and Telegram paths remain implemented and previously verified locally.
- Vercel/deploy and production-domain work remain postponed.
- `.env.local` was not read, printed, edited, or committed.

## Public Site Purpose

This repository is the public Hakan Leonardo business/services website.

Primary services:

- AI customer representative + website.
- AI sales and proposal assistant.
- AI operations automation.

This repository should not start Leonardo Tales Core, Dev, Science, agent OS, or software factory implementation.

## SEO / GEO Status

Completed:

- Production domain fallback in public metadata, sitemap, robots, and AI-readable context is `https://hakanleonardo.com`.
- Turkish homepage metadata title is `Hakan Leonardo | Yapay Zekâ İş Sistemleri`.
- Turkish homepage description is aligned with AI customer representative, sales/proposal assistant, and operations automation positioning.
- English homepage metadata title is `Hakan Leonardo | AI Business Systems`.
- English homepage description is aligned with the same practical service positioning.
- Canonical and alternate route metadata exists for TR/EN.
- `public/llms.txt` describes Hakan Leonardo as a public business/services website and keeps Core/Dev/Science as future/separate scope.
- Sade Organization and WebSite JSON-LD was added without fake address, fake review, fake price, award, or unverified social links.

Local note:

- Local rendered metadata can still resolve URLs through the active local `NEXT_PUBLIC_SITE_URL` override. The fallback in code is now Hakan Leonardo; real production URL verification remains a deployment/domain task.

## Social Preview Status

Completed:

- Open Graph title, description, URL, site name, locale, image, image dimensions, and image alt are configured.
- Twitter/X card is `summary_large_image`.
- Twitter title, description, and image are aligned with Hakan Leonardo.
- New OG image exists at `/og/hakan-leonardo-og.png`.
- New brand/logo image exists at `/brand/hakan-leonardo-logo.png`.
- New app icons exist at `/icon.png`, `/apple-icon.png`, and `/favicon.ico`.

Not verified locally:

- Real WhatsApp/social crawler preview cannot be fully verified until the production domain is live and reachable.

## Security Check Summary

Completed:

- `.env.local` is not tracked.
- Only `.env.example` is tracked among env files.
- No private env usage was found in client components.
- Private env names remain server-side in the Supabase and Telegram helper modules.
- Lead API remains a server-side route handler.
- Lead validation, honeypot, dwell-time, rate-limit, and harmful-intent eval coverage remain in place.
- Minimum security headers were added:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: DENY`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Not added:

- Strict CSP was not added because it can break the app and should be handled in a dedicated hardening pass.

Audit:

- `npm audit --omit=dev` reports 2 moderate findings through Next's transitive PostCSS dependency.
- The suggested fix requires `npm audit fix --force` and would install a breaking Next version path, so no automatic dependency change was made.

## Test Results

- `npm run eval:agent` passed 12/12.
- `npm run eval:leads` passed 6/6 with the existing non-failing Node module-type warning.
- `npm run lint` passed.
- `npm run build` passed.
- `npm audit --omit=dev` completed with 2 moderate findings; no automatic fix was applied.

## Visual / Metadata QA

Local production server QA was run on port 3001 after `next build`.

Verified:

- `/`, `/en`, and `/vizyon` render expected titles and metadata.
- OG image, brand logo, app icon, apple icon, favicon, robots, and sitemap paths return successfully.
- Security headers are present.
- Public homepage has no visible `Manifesto` copy.
- Public homepage has no visible `Leonardo Tales` brand copy.
- Navbar does not show `/vizyon`.
- CTA links point to the single `#assistant` surface.
- Chat input is present on mobile, tablet, and desktop checks.
- Direct `Formu aç` interaction opens the contact form and the honeypot remains hidden.
- No horizontal overflow was detected in mobile, tablet, or desktop checks.

Screenshots saved outside the repo:

- `/tmp/hakan-leonardo-37-mobile.png`
- `/tmp/hakan-leonardo-37-tablet.png`
- `/tmp/hakan-leonardo-37-desktop.png`
- `/tmp/hakan-leonardo-37-form-open.png`

## Deliberately Left For Later

- Vercel/deploy work.
- Production domain wiring.
- Production social preview verification.
- Production smoke test.
- Strong CSP hardening.
- Any dependency update that would require breaking-change review.
- Leonardo Tales Core, Dev, Science, agent OS, or software factory work.

## Tomorrow

Recommended next steps:

- Connect or verify the intended domain and production URL.
- Set production environment values without exposing secrets.
- Run the production smoke checklist.
- Test real WhatsApp/social link preview against the live production URL.
- Re-check robots and sitemap on the production origin.
- Discuss GitHub/repo/domain account ownership or transfer only if needed.
