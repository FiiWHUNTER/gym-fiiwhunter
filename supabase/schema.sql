-- Schema do módulo Evolução & IMC (FitTrack)
-- Rode este script no SQL Editor do painel do seu projeto Supabase.

create table public.progress_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  peso numeric(5,1) not null,
  altura integer not null,
  tempo integer not null,
  calorias integer not null,
  imc numeric(4,1) not null,
  created_at timestamptz not null default now()
);

-- Ativa Row Level Security: sem isso, qualquer usuário autenticado enxergaria
-- os dados de todos os outros usuários da tabela.
alter table public.progress_records enable row level security;

-- Cada usuário só pode ler os próprios registros.
create policy "select_own_records" on public.progress_records
  for select using (auth.uid() = user_id);

-- Cada usuário só pode inserir registros com o próprio user_id
-- (o default acima já cuida disso automaticamente).
create policy "insert_own_records" on public.progress_records
  for insert with check (auth.uid() = user_id);

-- Cada usuário só pode apagar os próprios registros.
create policy "delete_own_records" on public.progress_records
  for delete using (auth.uid() = user_id);
