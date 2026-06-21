create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company_or_project text not null,
  website text,
  preferred_contact_channel text,
  note text,
  business_type text,
  detected_need text,
  category text,
  source text,
  status text not null default 'new',
  conversation_summary text,
  next_action text,
  created_at timestamptz not null default now(),
  constraint leads_preferred_contact_channel_check
    check (
      preferred_contact_channel is null
      or preferred_contact_channel in ('telegram', 'whatsapp', 'email', 'phone')
    ),
  constraint leads_category_check
    check (
      category is null
      or category in (
        'customer_support_website',
        'sales_quote',
        'operations_automation',
        'unclear'
      )
    ),
  constraint leads_status_check
    check (status in ('new')),
  constraint leads_source_check
    check (
      source is null
      or source = 'leonardo_tales_ai_representative'
    ),
  constraint leads_next_action_check
    check (
      next_action is null
      or next_action = 'human_follow_up_required'
    )
);

alter table public.leads enable row level security;

create policy "Service role can manage leads"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
