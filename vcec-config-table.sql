-- Tạo bảng vcec_config để lưu cấu hình hệ thống (permission matrix, v.v.)
-- MIKE chạy 1 lần trong Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.vcec_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT UNIQUE NOT NULL,
  config_value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.vcec_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY vcec_config_allow_all ON public.vcec_config FOR ALL USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vcec_config TO anon, authenticated;
NOTIFY pgrst, 'reload schema';
