# 09 Decision Log

## 2026-06-22 - Repository Repositioned As Hakan Leonardo Public Service Site

Decision: This repository is now the public Hakan Leonardo business/services website for practical AI systems and business agents.

Reason: The current repo already has the right public-site architecture, deterministic AI discovery assistant, and lead-capture path for a service website. The larger Leonardo Tales Core, Dev, Science, agent OS, and software factory ideas should be created later in clean, separate repositories instead of being mixed into this MVP.

Impact:

- Public copy should use Hakan Leonardo where appropriate.
- Public positioning should focus on AI Müşteri Temsilcisi + Website, AI Satış ve Teklif Sistemi, and AI Operasyon Otomasyonu.
- Existing technical architecture and lead path remain in place.
- Historical docs may keep Leonardo Tales references as history, but public-facing copy should avoid confusing the user.

## 2026-06-20 - Positioning Locked

Decision: The official project positioning was **Leonardo Tales — Yapay Zekâ Ajan İşletim Sistemi**.

Reason: This gives the brand a clear Turkish-first category and matches the existing AI OS visual direction.

Status update: Superseded by the 2026-06-22 repositioning decision above for this repository.

## 2026-06-20 - Visual Direction Preserved

Decision: Preserve the current terminal-like AI OS interface.

Reason: The repo already has a coherent premium direction: dark grid, amber/green system colors, boot logs, command-line feel, and text-based wordmark.

## 2026-06-20 - MVP Is Lead Discovery, Not Platform

Decision: The first MVP is an AI discovery assistant that classifies and captures leads.

Reason: This creates the shortest path from visitor interest to manual project analysis without building unnecessary platform complexity.

## 2026-06-20 - Pricing Remains Manual

Decision: The assistant must not quote prices.

Reason: Pricing depends on project analysis and should be handled manually in the early business model.

## 2026-06-20 - Supabase And Telegram Are Planned, Not Claimed

Decision: Supabase lead storage and Telegram notifications are future implementation items.

Reason: No verified integration exists in the current repo.

Status update: Superseded by the 2026-06-21 local verification decision below.

## 2026-06-21 - Supabase And Telegram Verified Locally

Decision: Supabase lead persistence and Telegram lead notification may be described as verified locally for the current lead path.

Reason: `POST /api/leads` was smoke tested with Supabase persistence returning stored lead behavior and Telegram notification returning sent notification behavior. Production deployment is still not claimed.

## 2026-06-22 - Agent Control Layer Is Future Architecture

Decision: Agent Control Layer is a long-term architecture and possible future product category, not current MVP runtime scope.

Reason: Leonardo Tales should design AI agents with permission boundaries, telemetry, audit logs, human approval, rollback, kill-switches, and measurable business outcomes before adding more autonomy.

## 2026-06-20 - Text Wordmark For Now

Decision: Keep the logo/wordmark text-based.

Reason: It fits the terminal OS identity and avoids premature brand asset work.
