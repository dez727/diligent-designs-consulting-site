create extension if not exists pgcrypto;
create extension if not exists citext;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type lead_status as enum (
      'new',
      'contacted',
      'discovery_scheduled',
      'qualified',
      'proposal_sent',
      'won',
      'lost',
      'nurture'
    );
  end if;
end$$;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  full_name text not null,
  email citext not null,
  phone text,
  company_name text,
  website_url text,

  focus_area text not null,
  message text not null,
  consent_to_contact boolean not null default false,

  source_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,

  lead_status lead_status not null default 'new',
  lead_score integer,
  priority text,

  n8n_webhook_sent_at timestamptz,
  n8n_webhook_status text,
  n8n_error text,

  hubspot_contact_id text,
  hubspot_deal_id text,

  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_status_idx on public.leads (lead_status);
create index if not exists leads_utm_source_idx on public.leads (utm_source);

alter table public.leads enable row level security;

-- No public read policy.
-- Inserts happen through the server-side Cloudflare Pages Function using the service role key.
-- Do not create broad anonymous select policies.

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on public.leads;

create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();
