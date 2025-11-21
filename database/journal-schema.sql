-- profiles table (if not already present) with is_premium flag
create table if not exists public.profiles (
  id uuid primary key references auth.users(id),
  is_premium boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- journal entries: one per user per day
create table if not exists public.journal_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  thoughts text,
  good_things text,
  bad_things text,
  lessons text,
  dreams text,
  mood text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, entry_date)
);

create or replace function public.set_journal_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_journal_updated_at on public.journal_entries;
create trigger trg_journal_updated_at
before update on public.journal_entries
for each row
execute function public.set_journal_updated_at();

alter table public.journal_entries enable row level security;

create policy if not exists "Users select their journal entries"
  on public.journal_entries for select
  using (auth.uid() = user_id);

create policy if not exists "Users insert their journal entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users update their journal entries"
  on public.journal_entries for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy if not exists "Users delete their journal entries"
  on public.journal_entries for delete
  using (auth.uid() = user_id);
