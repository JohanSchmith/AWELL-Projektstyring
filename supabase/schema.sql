-- Awell Disponering: first shared-state schema.
-- Run this in Supabase SQL Editor.

create table if not exists public.app_state (
  id text primary key default 'default',
  payload jsonb not null default '{}'::jsonb,
  version bigint not null default 1,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;
alter table public.app_state replica identity full;

create or replace function public.touch_app_state()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  new.version = coalesce(old.version, 0) + 1;
  return new;
end;
$$;

drop trigger if exists touch_app_state on public.app_state;
create trigger touch_app_state
before update on public.app_state
for each row execute function public.touch_app_state();

drop policy if exists "app_state_authenticated_select" on public.app_state;
create policy "app_state_authenticated_select"
on public.app_state for select
to authenticated
using (true);

drop policy if exists "app_state_authenticated_insert" on public.app_state;
create policy "app_state_authenticated_insert"
on public.app_state for insert
to authenticated
with check (auth.uid() = updated_by);

drop policy if exists "app_state_authenticated_update" on public.app_state;
create policy "app_state_authenticated_update"
on public.app_state for update
to authenticated
using (true)
with check (auth.uid() = updated_by);

insert into public.app_state (id, payload)
values ('default', '{}'::jsonb)
on conflict (id) do nothing;

-- Enable realtime for the shared state table.
do $$
begin
  alter publication supabase_realtime add table public.app_state;
exception
  when duplicate_object then null;
end $$;
