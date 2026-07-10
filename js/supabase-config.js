// Configuração de conexão com o backend Supabase (Postgres + Auth).
// A "anon key" é uma chave PÚBLICA por design do Supabase: pode ficar exposta no
// front-end porque toda a proteção real dos dados é feita pelo Row Level Security (RLS)
// configurado nas tabelas do banco (ver supabase/schema.sql). Nunca coloque a
// "service_role key" aqui — essa sim é secreta e ignora o RLS.
const SUPABASE_URL = 'https://blixgravhsdhfpkcgbxp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qgBWTaUwhbUSkvbFEccTeA_VEJ6zbaM';
