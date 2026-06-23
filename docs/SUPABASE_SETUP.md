# Supabase Setup

This project stores lead submissions through the server-side `POST /api/leads` route. The browser never talks to Supabase directly and must never receive the service role key.

## Required Environment Variables

Set these only in local or deployment environment configuration:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LEADS_STORAGE_MODE=supabase
```

Optional Telegram notification variables:

```text
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
LEADS_NOTIFICATION_MODE=telegram
```

For local-only form testing without Supabase, use:

```text
LEADS_STORAGE_MODE=local
LEADS_NOTIFICATION_MODE=none
```

## Table

Create `public.leads` with this structure. The canonical SQL is in `supabase/migrations/001_create_leads.sql`.

| Column | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | yes | Primary key, defaults to `gen_random_uuid()` |
| `name` | `text` | yes | Contact name |
| `email` | `text` | yes | Normalized lowercase email |
| `phone` | `text` | no | Optional phone |
| `company_or_project` | `text` | yes | Business or project name |
| `website` | `text` | no | Optional website URL |
| `preferred_contact_channel` | `text` | no | `telegram`, `whatsapp`, `email`, or `phone` |
| `note` | `text` | no | Visitor note |
| `business_type` | `text` | no | Assistant business summary |
| `detected_need` | `text` | no | Assistant need summary |
| `category` | `text` | no | `customer_support_website`, `sales_quote`, `operations_automation`, or `unclear` |
| `source` | `text` | no | Currently `leonardo_tales_ai_representative` for the existing lead contract |
| `status` | `text` | yes | Defaults to `new` |
| `conversation_summary` | `text` | no | Manual-review summary |
| `next_action` | `text` | no | Currently `human_follow_up_required` |
| `created_at` | `timestamptz` | yes | Defaults to `now()` |

## Indexes

The migration creates:

- `leads_created_at_idx` on `created_at desc`
- `leads_status_idx` on `status`

## RLS And Access

RLS is enabled. The app writes through the server-side Supabase service role key only.

The migration grants `service_role` schema usage and table CRUD privileges, then adds a service-role-only policy for lead management.

Do not add public browser insert policies unless the architecture changes.

## Setup Steps

1. Open the Supabase project.
2. Run `supabase/migrations/001_create_leads.sql` in the SQL editor.
3. Confirm the `leads` table is available through the Data API.
4. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `LEADS_STORAGE_MODE=supabase` in the environment.
5. Restart the Next.js server after environment changes.
6. Submit one clearly marked test lead from the UI or API.
7. Confirm the API returns `persistence: "stored"`.
8. Remove or mark test leads after smoke testing.

Do not migrate old test lead data into this clean repository setup.
