-- PostgreSQL SQL patch to add 4 new roles to the `vcec_users` check constraint.
-- Apply this file in your Supabase project SQL Editor to successfully enable registration for these roles.

-- 1. Drop existing constraint if it has the standard name
ALTER TABLE public.vcec_users DROP CONSTRAINT IF EXISTS vcec_users_role_check;

-- 2. Add the updated check constraint to allow new roles
ALTER TABLE public.vcec_users ADD CONSTRAINT vcec_users_role_check 
  CHECK (role IN (
    'super_admin',
    'admin',
    'leader',
    'partner',
    'staff',
    'customer',
    'member',
    'cn_investor',
    'vn_company',
    'department',
    'rnd_media'
  ));

-- 3. Success notification
SELECT 'Successfully updated vcec_users role constraint to support cn_investor, vn_company, department, rnd_media!' AS status;
