# Leonardo Tales

Leonardo Tales — an AI-agent operating system for autonomous workflows, intelligent integrations, and self-healing digital infrastructure.

## Overview

Leonardo Tales is a premium tech-noir web prototype for presenting agentic operating systems, multi-agent workflows, intelligent integrations, edge-scale memory infrastructure, and self-healing automation loops.

The default site language is Turkish. English is available at `/en`.

## Routes

- `/` — Turkish homepage
- `/en` — English homepage
- `/manifesto` — Turkish manifesto
- `/en/manifesto` — English manifesto
- `/llms.txt` — AI-readable project summary
- `/robots.txt` — crawler rules
- `/sitemap.xml` — sitemap with Turkish and English routes

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
npm run lint
npm run build
```

The project does not require backend services, API keys, Supabase, OpenAI, or other private environment variables for the current visual prototype.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment if the final domain differs from `https://leonardotales.com`.
