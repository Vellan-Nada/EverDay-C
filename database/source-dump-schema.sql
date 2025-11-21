create table if not exists public.source_dumps (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  links text,
  text_content text,
  screenshots text[] default '{}',
  background_color text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.set_source_dump_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_source_dump_updated_at on public.source_dumps;
create trigger trg_source_dump_updated_at
before update on public.source_dumps
for each row execute function public.set_source_dump_updated_at();

alter table public.source_dumps enable row level security;

create policy if not exists "Users insert their own source dumps" on public.source_dumps
  for insert with check (auth.uid() = user_id);

create policy if not exists "Users select their own source dumps" on public.source_dumps
  for select using (auth.uid() = user_id);

create policy if not exists "Users update their own source dumps" on public.source_dumps
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy if not exists "Users delete their own source dumps" on public.source_dumps
  for delete using (auth.uid() = user_id);
