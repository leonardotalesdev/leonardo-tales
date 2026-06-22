# 00 Project Brief

## One-Line Positioning

**Leonardo Tales — Yapay Zekâ Ajan İşletim Sistemi**

Leonardo Tales helps Turkish businesses discover, scope, and later deploy practical AI agent systems for customer support, sales, quoting, and operations.

## Current Repository Purpose

This repository currently contains a premium web prototype, deterministic AI discovery assistant, and verified lead-capture path. It is not yet a full AI platform.

The repo should be treated as the public website plus MVP assistant surface for the first lead discovery flow.

## Market

- Initial market: Türkiye.
- Initial language: Turkish.
- Secondary language currently present: English.
- Target domain: `leonardotales.com`.
- GitHub owner: `leonardotalesdev`.

## Product Sequence

1. AI Müşteri Temsilcisi + Website.
2. AI Satış ve Teklif Sistemi.
3. AI Operasyon Otomasyonu.

## MVP Objective

A visitor lands on Leonardo Tales, sees the AI discovery assistant, describes their business and need, and the system classifies the lead into one of these paths:

1. AI Müşteri Temsilcisi + Website.
2. AI Satış ve Teklif Sistemi.
3. AI Operasyon Otomasyonu.
4. Henüz Netleşmedi.

After enough context is gathered, the assistant should open a contact form inside the chat panel and collect lead information.

## Current Reality

- The site is a Next.js App Router app.
- The interface already has a strong terminal-like AI OS design.
- The chat is a deterministic customer representative assistant, not an LLM agent.
- Lead submission runs through `POST /api/leads`.
- Supabase live persistence has been verified locally.
- Telegram live notification has been verified locally.
- Basic spam, honeypot, dwell-time, and rate-limit protection exists for the lead path.
- There is no verified OpenAI/LLM, WhatsApp, Resend, CRM, admin dashboard, or Vercel deployment integration yet.
- Local development continues for now; Vercel/deploy work is intentionally postponed.

## Sprint Rule

Preserve the visual direction. Do not redesign the site during MVP infrastructure and documentation sprints.

## Architecture Direction

Leonardo Tales should design agents as bounded operational components inside a controlled business operating system.

Long-term agent systems should favor permission boundaries, auditability, human approval, telemetry, rollback, and kill-switches over uncontrolled autonomy. See `docs/13_AGENT_CONTROL_PRINCIPLES.md`.
