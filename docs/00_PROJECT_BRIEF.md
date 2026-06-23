# 00 Project Brief

## One-Line Positioning

**Hakan Leonardo — Yapay Zekâ Sistemleri ve İş Ajanları**

Hakan Leonardo helps Turkish businesses discover, scope, and later deploy practical AI systems for customer support, sales, quoting, and operations.

## Current Repository Purpose

This repository contains Hakan Leonardo's public business and services website, a deterministic AI discovery assistant, and a verified lead-capture path.

The repo should be treated as the public website plus MVP assistant surface for the first lead discovery flow.

This repository is not the future Leonardo Tales Core, Dev, Science, agent OS, or software factory project. Those should be created later in clean, separate repositories.

## Market

- Initial market: Türkiye.
- Initial language: Turkish.
- Secondary language currently present: English.
- Public domain target is still to be finalized before deployment work resumes.
- GitHub owner: `leonardotalesdev`.

## Product Sequence

1. AI Müşteri Temsilcisi + Website.
2. AI Satış ve Teklif Sistemi.
3. AI Operasyon Otomasyonu.

## MVP Objective

A visitor lands on Hakan Leonardo, sees the AI discovery assistant, describes their business and need, and the system classifies the lead into one of these paths:

1. AI Müşteri Temsilcisi + Website.
2. AI Satış ve Teklif Sistemi.
3. AI Operasyon Otomasyonu.
4. Henüz Netleşmedi.

After enough context is gathered, the assistant should open a contact form inside the chat panel and collect lead information.

## Current Reality

- The site is a Next.js App Router app.
- The interface already has a strong terminal-like AI systems design.
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

Hakan Leonardo should design business agents as bounded operational components inside controlled, human-followed workflows.

Long-term Leonardo Tales Core/Dev/Science architecture ideas should not be implemented in this repository. For general control principles, see `docs/13_AGENT_CONTROL_PRINCIPLES.md`.
