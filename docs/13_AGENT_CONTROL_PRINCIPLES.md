# 13 Leonardo Tales - Agent Control Principles

Status: internal future-architecture reference. This document is not the current product scope of this repository.

As of the Hakan Leonardo repositioning sprint, this repository remains the public business/services website and lead discovery MVP. Leonardo Tales Core, Dev, Science, agent OS, software factory, and broader agent-control products should be created later in clean, separate repositories.

## Core Principle

As agents become more capable, the control layer becomes more central.

The question is not only "which model is smarter?" A smarter model without clear process boundaries can create more operational risk, not less.

The better question is: which process orchestration produces the highest measurable result with the lowest operational risk?

Leonardo Tales should optimize for controlled business outcomes, not agent complexity. The goal is not to build the most autonomous agent possible. The goal is to build agent systems that improve customer support, sales, quoting, and operations while remaining visible, bounded, measurable, and interruptible.

## Why Agent Control Matters

Agents now write code, call APIs, change data, submit forms, trigger workflows, and influence business operations.

This means risk moves from prompt safety into runtime control. A good prompt is not enough when an agent can touch a CRM record, a payment flow, a file system, a production API, or a customer-facing message.

The system must control:

- What the agent can do.
- When the agent can do it.
- Which data the agent can access.
- Which tools the agent can call.
- Which actions require human approval.
- Which actions can be reversed.
- Which events are logged, monitored, and audited.

Leonardo Tales should treat AI agents as bounded operational components, not fully trusted autonomous actors.

## Leonardo Tales Product Impact

### AI Müşteri Temsilcisi

The customer representative agent must not be just a talking bot.

From day one, it needs:

- Authority boundaries.
- Safe lead capture.
- Human handoff.
- Data access policy.
- Conversation and submission logging.
- No fake claims about integrations or completed work.

For the MVP, this means the assistant can discover intent, classify the lead, collect contact information, persist the lead, and notify the team. Human follow-up remains required.

### AI Satış ve Teklif Sistemleri

Sales agents touch pricing, proposals, CRM data, and customer context. These are high-trust surfaces.

The safe MVP model is:

- Agent prepares.
- Agent summarizes.
- Agent recommends.
- Human approves critical actions.

Leonardo Tales should not let an agent independently create binding prices, contracts, discounts, or customer commitments without explicit approval.

### AI Operasyon Otomasyonu

The main value is not simply doing repetitive work. The value is doing work safely and visibly.

Core components:

- Workflow audit.
- Rollback.
- Approval gates.
- Exception handling.
- Task boundaries.

Operational agents should make work more reliable, not just faster.

### Agent Operating Systems

The future AI OS is not only a panel that runs agents.

It is a control system that observes, limits, coordinates, authorizes, and can stop agents.

An agent operating system should know what each agent is allowed to do, which tools it can access, what it has already done, what changed because of it, and how a human can intervene.

### AGI Development

For more capable AI systems, the key question is not only "how intelligent does the system become?"

The control questions become central:

- What constitution governs it?
- What permission system limits it?
- What audit layer observes it?
- What human-AI joint decision model controls it?

Leonardo Tales should stay aligned with this principle even while building practical business systems.

## Opportunity: Agent Control Layer

The Agent Control Layer is a future product category for Leonardo Tales.

It may eventually include:

- Permission management.
- Audit logs.
- Risk scoring.
- Human approvals.
- Task boundaries.
- Sandbox execution.
- Rollback.
- Kill-switch.
- Telemetry.
- Policy engine.
- Tool access control.

The Agent Control Layer would sit between agents, business tools, sensitive data, and humans. It would decide what is allowed, what is blocked, what is logged, what requires approval, and what must stop immediately.

This is not part of the current MVP scope. It is a long-term architecture direction and potential product category.

## Threat: Uncontrolled Autonomous Action

When agents connect to Web3 wallets, company APIs, codebases, CRM systems, payment systems, and file systems, small context manipulation can cause large operational or financial damage.

Examples of risk:

- A manipulated instruction causes an agent to send the wrong proposal.
- A CRM agent overwrites customer data without review.
- A code agent changes production behavior without rollback.
- A payment-connected agent triggers an irreversible financial action.
- A file-system agent deletes or leaks business documents.

This is why Leonardo Tales should never design uncontrolled agent autonomy as the default.

## Design Laws

- Minimum sufficient agent complexity.
- Least privilege by default.
- Human approval for irreversible action.
- Observable workflows.
- Reversible operations where possible.
- No hidden autonomy.
- No fake completion claims.
- Logs before scale.
- Telemetry before optimization.
- Business KPI before agent sophistication.
- Kill-switch before production autonomy.

## MVP Application

The current Leonardo Tales MVP already applies early versions of these principles:

- Deterministic assistant instead of uncontrolled LLM behavior.
- Lead validation before persistence.
- Supabase persistence through a server-side API boundary.
- Telegram notification after successful lead handling.
- Honeypot spam protection.
- Dwell-time spam protection.
- Best-effort in-memory rate limiting.
- Production smoke checklist.
- No fake integration claims.
- No automated pricing.
- Human follow-up required.

These are small controls, but they establish the correct operating philosophy: ship useful business capability inside visible boundaries.

Sprint 3.4 should extend this control posture in two local, deterministic ways before deployment work resumes:

- Clearly harmful or illegal intent, including hacking, unauthorized access, credential theft, evasion, malware, and cyber abuse, must be refused and must not open the lead form.
- Oversized product ambitions must be reframed as realistic MVP/prototype discovery instead of being accepted as immediate full-scale build promises.

## Future Architecture

Future Leonardo Tales agent systems should be described through these layers:

- Agent Runtime.
- Tool Permission Layer.
- Workflow Orchestration Layer.
- Human Approval Layer.
- Audit & Telemetry Layer.
- Risk Scoring Layer.
- Rollback / Kill-switch Layer.
- Business KPI Layer.

The Agent Runtime should not directly own sensitive business authority. Authority should flow through explicit control layers.

## What Not To Do

- Do not build complex autonomous agents before clear business workflow.
- Do not connect agents to sensitive systems without permission controls.
- Do not allow agents to create financial, legal, code, or CRM changes without approval.
- Do not treat "more agents" as automatically better.
- Do not hide uncertainty or unverified actions.
- Do not use agent sophistication as a substitute for business measurement.
- Do not launch production autonomy without logging, rollback, and kill-switch planning.

## Final Position

Leonardo Tales designs agents not as uncontrolled autonomous software, but as bounded operational intelligence inside a controlled business operating system.
