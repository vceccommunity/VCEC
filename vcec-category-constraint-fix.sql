-- ============================================================
--  VCEC Portal — Fix CHECK constraint cho vcec_posts.category
--  Thêm 3 slug mới: quan-he-viet-trung, linh-vuc, dich-vu
--  Chạy trong: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ── 1. Drop constraint cũ (tìm và xóa tự động theo tên) ─────
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.vcec_posts'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) LIKE '%category%'
  LOOP
    EXECUTE 'ALTER TABLE public.vcec_posts DROP CONSTRAINT ' || quote_ident(r.conname);
    RAISE NOTICE 'Dropped constraint: %', r.conname;
  END LOOP;
END;
$$;

-- ── 2. Thêm constraint mới với đầy đủ 7 category ────────────
ALTER TABLE public.vcec_posts
  ADD CONSTRAINT vcec_posts_category_check
  CHECK (category IN (
    'tin-tuc',
    'co-hoi',
    'tai-nguyen',
    'gioi-thieu',
    'quan-he-viet-trung',
    'linh-vuc',
    'dich-vu'
  ));

-- ── 3. Reload PostgREST schema ───────────────────────────────
NOTIFY pgrst, 'reload schema';

-- ── 4. Verify ────────────────────────────────────────────────
SELECT conname, pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.vcec_posts'::regclass AND contype = 'c';
