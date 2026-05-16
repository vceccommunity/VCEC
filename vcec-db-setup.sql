-- ============================================================
--  VCEC Portal — Complete Database Setup Script
--  Project: uksvxqhclwjrzeoqsfxr.supabase.co
--  Chạy file này trong: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ── 1. TABLE: vcec_users ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vcec_users (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  username    TEXT        UNIQUE NOT NULL,
  password    TEXT        NOT NULL,
  role        TEXT        NOT NULL DEFAULT 'member'
                          CHECK (role IN ('super_admin','admin','leader','partner','staff','customer','member')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. TABLE: vcec_leads ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vcec_leads (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name  TEXT        NOT NULL,
  contact_name  TEXT        NOT NULL,
  wechat_id     TEXT        NOT NULL,
  project_id    TEXT,
  project_name  TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Disable RLS (allow anon key full access) ───────────────────────────
ALTER TABLE public.vcec_users  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vcec_leads  DISABLE ROW LEVEL SECURITY;

-- ── 4. Grant anon + authenticated roles full CRUD access ─────────────────
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vcec_users  TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vcec_leads  TO anon, authenticated;

-- ── 5. Storage bucket 'vcec' (public, max 50MB) ──────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vcec',
  'vcec',
  TRUE,
  52428800,
  ARRAY['image/jpeg','image/png','image/gif','image/webp','image/svg+xml','image/x-icon']
)
ON CONFLICT (id) DO UPDATE
  SET public = TRUE,
      file_size_limit = 52428800;

-- ── 6. Storage policies (allow anon to upload/read/delete) ───────────────
-- Lưu ý: storage.objects đã có RLS bật sẵn bởi Supabase, không ALTER TABLE
DROP POLICY IF EXISTS vcec_public_select ON storage.objects;
DROP POLICY IF EXISTS vcec_anon_insert   ON storage.objects;
DROP POLICY IF EXISTS vcec_anon_update   ON storage.objects;
DROP POLICY IF EXISTS vcec_anon_delete   ON storage.objects;

CREATE POLICY vcec_public_select ON storage.objects
  FOR SELECT USING (bucket_id = 'vcec');

CREATE POLICY vcec_anon_insert ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vcec');

CREATE POLICY vcec_anon_update ON storage.objects
  FOR UPDATE USING (bucket_id = 'vcec');

CREATE POLICY vcec_anon_delete ON storage.objects
  FOR DELETE USING (bucket_id = 'vcec');

-- ── 7. SAMPLE DATA: Users ────────────────────────────────────────────────
INSERT INTO public.vcec_users (username, password, role) VALUES
  ('vcec_sadmin',   'Admin@VCEC2026!', 'super_admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO public.vcec_users (username, password, role) VALUES
  ('nguyen_admin',   'Demo@2026', 'admin'),
  ('zhang_partner',  'Demo@2026', 'partner'),
  ('li_leader',      'Demo@2026', 'leader'),
  ('tran_staff',     'Demo@2026', 'staff'),
  ('wang_customer',  'Demo@2026', 'customer'),
  ('member_vn01',    'Demo@2026', 'member'),
  ('member_cn01',    'Demo@2026', 'member')
ON CONFLICT (username) DO NOTHING;

-- ── 8. SAMPLE DATA: Leads ────────────────────────────────────────────────
INSERT INTO public.vcec_leads (company_name, contact_name, wechat_id, project_id, project_name) VALUES
  ('Huawei Technologies Co., Ltd',  'Zhang Wei',     'zhangwei_vcec',   'deepc',   'DEEP C Industrial Zone - Hai Phong'),
  ('BYD Auto Industry Co., Ltd',    'Li Ming',        'liming_byd',      'vsip',    'VSIP Hai Phong Phase 2'),
  ('Foxconn Industrial Internet',   'Chen Jiaming',   'chenjiaming_fox', 'vsip',    'VSIP Bình Dương'),
  ('Công ty Cổ phần Vingroup',      'Nguyễn Văn An',  'nguyenvanan_vin', 'amata',   'Amata City Biên Hòa'),
  ('Sunny Optical Technology',      'Wang Fang',      'wangfang_sunny',  'longduc', 'Long Đức Industrial Park - Trà Vinh')
ON CONFLICT DO NOTHING;

-- ── 9. Verify setup ──────────────────────────────────────────────────────
SELECT 'vcec_users' AS table_name, COUNT(*) AS record_count FROM public.vcec_users
UNION ALL
SELECT 'vcec_leads' AS table_name, COUNT(*) AS record_count FROM public.vcec_leads;
