/**
 * VCEC Database Setup Script
 * Run: node setup-db.js <SERVICE_ROLE_KEY>
 * Service_role key: Supabase Dashboard > Project Settings > API > service_role
 */

const SUPABASE_URL = "https://uksvxqhclwjrzeoqsfxr.supabase.co";
const SERVICE_ROLE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SERVICE_ROLE_KEY) {
  console.error("\n[ERROR] Thiếu service_role key!");
  console.error("Cách lấy: Supabase Dashboard > Project Settings > API > service_role\n");
  console.error("Cách chạy: node setup-db.js <service_role_key>\n");
  process.exit(1);
}

const headers = {
  "apikey": SERVICE_ROLE_KEY,
  "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

// ── SQL: Create all tables ─────────────────────────────────────────────────
const SQL_SETUP = `
-- 1. Create vcec_users table
CREATE TABLE IF NOT EXISTS public.vcec_users (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  username    TEXT        UNIQUE NOT NULL,
  password    TEXT        NOT NULL,
  role        TEXT        NOT NULL DEFAULT 'member'
                          CHECK (role IN ('super_admin','admin','leader','partner','staff','customer','member')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create vcec_leads table
CREATE TABLE IF NOT EXISTS public.vcec_leads (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name  TEXT        NOT NULL,
  contact_name  TEXT        NOT NULL,
  wechat_id     TEXT        NOT NULL,
  project_id    TEXT,
  project_name  TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Disable RLS (allow anon key full access, matching original behavior)
ALTER TABLE public.vcec_users  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vcec_leads  DISABLE ROW LEVEL SECURITY;

-- 4. Grant anon + authenticated roles full access
GRANT ALL ON public.vcec_users  TO anon, authenticated;
GRANT ALL ON public.vcec_leads  TO anon, authenticated;

-- 5. Create storage bucket 'vcec' (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vcec', 'vcec', TRUE, 52428800,
  ARRAY['image/jpeg','image/png','image/gif','image/webp','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

-- 6. Storage bucket policies: allow anon upload/read/delete
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'vcec_public_read'
  ) THEN
    CREATE POLICY vcec_public_read   ON storage.objects FOR SELECT USING (bucket_id = 'vcec');
    CREATE POLICY vcec_anon_insert   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'vcec');
    CREATE POLICY vcec_anon_update   ON storage.objects FOR UPDATE USING (bucket_id = 'vcec');
    CREATE POLICY vcec_anon_delete   ON storage.objects FOR DELETE USING (bucket_id = 'vcec');
  END IF;
END$$;

-- 7. Enable RLS on storage.objects (required for policies to work)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ── SAMPLE DATA ─────────────────────────────────────────────────────────────

-- Super Admin account (MIKE: đổi mật khẩu sau khi setup xong!)
INSERT INTO public.vcec_users (username, password, role)
VALUES ('vcec_sadmin', 'Admin@VCEC2026!', 'super_admin')
ON CONFLICT (username) DO NOTHING;

-- Sample admin
INSERT INTO public.vcec_users (username, password, role)
VALUES ('nguyen_admin', 'Demo@2026', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Sample partner
INSERT INTO public.vcec_users (username, password, role)
VALUES ('zhang_partner', 'Demo@2026', 'partner')
ON CONFLICT (username) DO NOTHING;

-- Sample staff
INSERT INTO public.vcec_users (username, password, role)
VALUES ('tran_staff', 'Demo@2026', 'staff')
ON CONFLICT (username) DO NOTHING;

-- Sample member (Vietnamese investor)
INSERT INTO public.vcec_users (username, password, role)
VALUES ('member_vn01', 'Demo@2026', 'member')
ON CONFLICT (username) DO NOTHING;

-- Sample leads (investor inquiries)
INSERT INTO public.vcec_leads (company_name, contact_name, wechat_id, project_id, project_name)
VALUES
  ('Huawei Technologies Co., Ltd', 'Zhang Wei', 'zhangwei_vcec', 'deepc', 'DEEP C Industrial Zone - Hai Phong'),
  ('BYD Auto Industry Co., Ltd',   'Li Ming',   'liming_byd',    'vsip',  'VSIP Hai Phong Phase 2'),
  ('Công ty CP Vingroup',          'Nguyễn Văn A', 'nguyenvana_vin', 'amata', 'Amata City Bien Hoa')
ON CONFLICT DO NOTHING;
`;

// ── Main runner ────────────────────────────────────────────────────────────
async function runSQL(sql) {
  const PROJECT_REF = "uksvxqhclwjrzeoqsfxr";
  const endpoint = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: sql })
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return text;
}

async function insertViaREST() {
  console.log("  [2/2] Trying REST API insert for sample data...");

  const users = [
    { username: "vcec_sadmin",  password: "Admin@VCEC2026!", role: "super_admin" },
    { username: "nguyen_admin", password: "Demo@2026",       role: "admin"       },
    { username: "zhang_partner",password: "Demo@2026",       role: "partner"     },
    { username: "tran_staff",   password: "Demo@2026",       role: "staff"       },
    { username: "member_vn01",  password: "Demo@2026",       role: "member"      }
  ];

  const leads = [
    { company_name: "Huawei Technologies Co., Ltd", contact_name: "Zhang Wei",    wechat_id: "zhangwei_vcec", project_id: "deepc", project_name: "DEEP C Industrial Zone - Hai Phong" },
    { company_name: "BYD Auto Industry Co., Ltd",   contact_name: "Li Ming",      wechat_id: "liming_byd",    project_id: "vsip",  project_name: "VSIP Hai Phong Phase 2"             },
    { company_name: "Công ty CP Vingroup",          contact_name: "Nguyễn Văn A", wechat_id: "nguyenvana_vin",project_id: "amata", project_name: "Amata City Bien Hoa"                }
  ];

  const uRes = await fetch(`${SUPABASE_URL}/rest/v1/vcec_users`, {
    method: "POST",
    headers: { ...headers, "Prefer": "resolution=ignore-duplicates" },
    body: JSON.stringify(users)
  });
  console.log(`    vcec_users insert: HTTP ${uRes.status}`);

  const lRes = await fetch(`${SUPABASE_URL}/rest/v1/vcec_leads`, {
    method: "POST",
    headers: { ...headers, "Prefer": "resolution=ignore-duplicates" },
    body: JSON.stringify(leads)
  });
  console.log(`    vcec_leads insert: HTTP ${lRes.status}`);
}

async function main() {
  console.log("\n======================================================");
  console.log("  VCEC Database Setup");
  console.log("  Project: uksvxqhclwjrzeoqsfxr.supabase.co");
  console.log("======================================================\n");

  // Step 1: Try Management API (needs PAT, not service_role)
  console.log("[Step 1] Trying Supabase Management API (DDL)...");
  try {
    await runSQL(SQL_SETUP);
    console.log("  [OK] DDL executed successfully via Management API.\n");
  } catch (err) {
    console.warn(`  [WARN] Management API failed: ${err.message}`);
    console.log("  → Falling back to REST API for data insertion...\n");

    // Step 2: Tables may already exist — try to insert sample data via REST
    console.log("[Step 2] Inserting sample data via REST API...");
    try {
      await insertViaREST();
      console.log("  [OK] Sample data inserted via REST.\n");
    } catch (err2) {
      console.error(`  [ERROR] REST insert failed: ${err2.message}`);
      console.log("\n  → Tables likely don't exist yet.");
      console.log("  → Please run the SQL below manually in Supabase Dashboard > SQL Editor\n");
      console.log("  File: vcec-db-setup.sql\n");
      process.exit(1);
    }
  }

  // Step 3: Verify connectivity
  console.log("[Step 3] Verifying setup...");
  try {
    const vRes = await fetch(`${SUPABASE_URL}/rest/v1/vcec_users?select=username,role&limit=10`, {
      headers
    });
    if (vRes.ok) {
      const data = await vRes.json();
      console.log(`  [OK] vcec_users table accessible. Found ${data.length} record(s):`);
      data.forEach(u => console.log(`       - ${u.username} (${u.role})`));
    } else {
      console.warn(`  [WARN] Verification query returned HTTP ${vRes.status}`);
    }
  } catch (e) {
    console.warn("  [WARN] Verification failed:", e.message);
  }

  console.log("\n======================================================");
  console.log("  SETUP COMPLETE");
  console.log("  Login: vcec_sadmin / Admin@VCEC2026!");
  console.log("  (Đổi mật khẩu ngay sau khi đăng nhập!)");
  console.log("======================================================\n");
}

main().catch(err => {
  console.error("\n[FATAL]", err.message);
  process.exit(1);
});
