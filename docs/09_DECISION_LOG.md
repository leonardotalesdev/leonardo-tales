# 09 Decision Log

## 2026-06-20 - Positioning Locked

Decision: The official project positioning is **Leonardo Tales — Yapay Zekâ Ajan İşletim Sistemi**.

Reason: This gives the brand a clear Turkish-first category and matches the existing AI OS visual direction.

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
