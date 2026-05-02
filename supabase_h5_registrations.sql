create table if not exists public.h5_registrations (
  id uuid primary key default gen_random_uuid(),
  program_id text not null,
  program_title text not null,
  user_name text not null,
  user_phone text not null,
  user_role text default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.h5_registrations enable row level security;

drop policy if exists "Allow public H5 registration insert" on public.h5_registrations;

create policy "Allow public H5 registration insert"
on public.h5_registrations
for insert
to anon
with check (true);
