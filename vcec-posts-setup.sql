-- ============================================================
--  VCEC Portal — vcec_posts Table Setup
--  Chạy file này trong: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ── 1. TABLE: vcec_posts ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vcec_posts (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  category     TEXT        NOT NULL
               CHECK (category IN ('tin-tuc', 'co-hoi', 'tai-nguyen', 'gioi-thieu')),
  title_vi     TEXT        NOT NULL,
  title_zh     TEXT        NOT NULL DEFAULT '',
  title_en     TEXT        NOT NULL DEFAULT '',
  summary_vi   TEXT        NOT NULL DEFAULT '',
  summary_zh   TEXT        NOT NULL DEFAULT '',
  summary_en   TEXT        NOT NULL DEFAULT '',
  content_vi   TEXT        NOT NULL DEFAULT '',
  content_zh   TEXT        NOT NULL DEFAULT '',
  content_en   TEXT        NOT NULL DEFAULT '',
  cover_image  TEXT        NOT NULL DEFAULT '',
  status       TEXT        NOT NULL DEFAULT 'published'
               CHECK (status IN ('published', 'draft')),
  author       TEXT        NOT NULL DEFAULT 'admin',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Enable RLS + permissive policy ────────────────────────
ALTER TABLE public.vcec_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS vcec_posts_allow_all ON public.vcec_posts;
CREATE POLICY vcec_posts_allow_all ON public.vcec_posts
  FOR ALL USING (true) WITH CHECK (true);

-- ── 3. Grant access to anon + authenticated ──────────────────
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vcec_posts TO anon, authenticated;

-- ── 4. Notify PostgREST to reload schema ─────────────────────
NOTIFY pgrst, 'reload schema';

-- ── 5. SAMPLE DATA: Posts ────────────────────────────────────
INSERT INTO public.vcec_posts (category, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, cover_image, status, author) VALUES

-- Tin Tức & Sự Kiện (5 bài)
(
  'tin-tuc',
  'Diễn đàn Xúc tiến Đầu tư Việt Nam – Trung Quốc tại Thâm Quyến năm 2026',
  '2026年深圳越中投资促进论坛',
  'Vietnam–China Investment Promotion Forum in Shenzhen 2026',
  'Hơn 250 tập đoàn công nghệ và bán dẫn Thâm Quyến tham gia đối thoại trực tiếp với ban quản lý các KCN Hải Phòng, Bắc Ninh về kế hoạch dịch chuyển chuỗi cung ứng.',
  '超过250家深圳科技与半导体集团与海防、北宁各工业区管理委员会就供应链转移计划进行直接对话。',
  'Over 250 Shenzhen tech and semiconductor groups engaged directly with Hai Phong and Bac Ninh industrial zone management boards on supply chain relocation plans.',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),
(
  'tin-tuc',
  'Dòng vốn FDI Trung Quốc dịch chuyển mạnh sang mảng Linh kiện Xe điện (EV)',
  '中国FDI大规模转向电动汽车零部件领域',
  'Chinese FDI Pivots Strongly to Electric Vehicle (EV) Components',
  'Các chính sách ưu đãi thuế của Việt Nam đối với năng lượng sạch đang thu hút dòng vốn lớn từ các nhà sản xuất pin lithium Thượng Hải và Chiết Giang đầu tư vào Bình Dương.',
  '越南清洁能源税收优惠政策正吸引大量来自上海和浙江锂电池制造商的资金投资平阳省。',
  'Vietnam''s clean energy tax incentives are attracting significant capital from Shanghai and Zhejiang lithium battery manufacturers to invest in Binh Duong.',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),
(
  'tin-tuc',
  'VCEC tháp tùng Hiệp hội Điện tử Trung Quốc khảo sát hạ tầng VSIP Bắc Ninh',
  'VCEC陪同中国电子行业协会考察北宁VSIP基础设施',
  'VCEC Accompanies China Electronics Association on VSIP Bac Ninh Infrastructure Survey',
  'Đoàn khảo sát đã trực tiếp đối thoại, khảo sát tiến độ cấp điện của trạm biến áp 110kV và tìm hiểu thủ tục làm hồ sơ đăng ký đầu tư IRC.',
  '考察团直接对话并实地考察了110kV变电站的供电进度，深入了解IRC投资登记注册程序。',
  'The delegation directly surveyed the 110kV substation power supply progress and explored IRC investment registration procedures in detail.',
  'https://images.unsplash.com/photo-1521791136368-1a46827d3ad4?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),
(
  'tin-tuc',
  'Hiệp định Thương mại Tự do ASEAN – Trung Quốc phiên bản nâng cấp có hiệu lực',
  '东盟与中国升级版自贸协定正式生效',
  'Upgraded ASEAN–China Free Trade Agreement Enters into Force',
  'Phiên bản nâng cấp ACFTA 3.0 mở rộng cam kết về dịch vụ tài chính, thương mại điện tử xuyên biên giới và cơ chế chứng nhận xuất xứ số, tạo điều kiện thuận lợi hơn cho doanh nghiệp hai chiều.',
  '升级版ACFTA 3.0扩大了对金融服务、跨境电子商务和数字原产地证书机制的承诺，为双边企业创造更有利条件。',
  'The upgraded ACFTA 3.0 expands commitments on financial services, cross-border e-commerce, and digital certificate of origin mechanisms, creating more favorable conditions for bilateral businesses.',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),
(
  'tin-tuc',
  'Chính phủ Việt Nam phê duyệt quy hoạch 5 KCN mới tại miền Bắc cho giai đoạn 2026–2030',
  '越南政府批准2026至2030年在北部新建五个工业区的规划',
  'Vietnam Government Approves 5 New Northern Industrial Zones for 2026–2030',
  'Tổng diện tích 5 KCN mới đạt 3.200 ha, ưu tiên thu hút đầu tư vào các lĩnh vực chip bán dẫn, công nghiệp hỗ trợ và logistics thông minh.',
  '五个新工业区总面积达3200公顷，优先吸引半导体芯片、配套工业和智慧物流领域的投资。',
  'The five new industrial zones cover a total of 3,200 hectares, prioritizing investment attraction in semiconductor chips, supporting industries, and smart logistics.',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),

-- Cơ Hội Đầu Tư (2 bài)
(
  'co-hoi',
  'Cơ hội đầu tư tại Khu Công nghiệp DEEP C Hải Phòng – Hạ tầng hạng A, sẵn sàng tiếp nhận',
  '海防DEEP C工业区投资机会 — A级基础设施，随时接收',
  'Investment Opportunity at DEEP C Industrial Zone Hai Phong – Grade-A Infrastructure, Ready to Receive',
  'DEEP C là một trong những KCN hạ tầng hạng A tốt nhất miền Bắc Việt Nam với cảng nước sâu Đình Vũ, nguồn điện ổn định từ 3 nguồn độc lập và quỹ đất sẵn sàng cho thuê từ 1 ha đến 50+ ha.',
  'DEEP C是越南北部最优质的A级工业区之一，拥有亭武深水港、来自三个独立电源的稳定供电，以及从1公顷到50公顷以上的可租赁现成土地。',
  'DEEP C is one of the best Grade-A industrial zones in northern Vietnam with Dinh Vu deep-water port, stable power from 3 independent sources, and ready-to-lease land from 1 to 50+ hectares.',
  'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),
(
  'co-hoi',
  'Ưu đãi đầu tư vào lĩnh vực Năng lượng Tái tạo tại Việt Nam 2026 – Hướng dẫn từ A đến Z',
  '2026年越南可再生能源投资优惠政策 — 全面指南',
  'Vietnam 2026 Renewable Energy Investment Incentives – Complete A to Z Guide',
  'Chính sách thuế suất ưu đãi 10% trong 15 năm, miễn thuế 4 năm đầu, giảm 50% trong 9 năm tiếp theo đang là động lực chính thu hút các tập đoàn điện mặt trời và điện gió Trung Quốc vào Việt Nam.',
  '10%优惠税率15年、前4年免税、随后9年减税50%的政策是吸引中国太阳能和风电集团进入越南的主要激励因素。',
  'The preferential tax rate of 10% for 15 years, 4-year tax exemption, and 50% reduction for the next 9 years are the main incentives attracting Chinese solar and wind energy groups to Vietnam.',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
),

-- Kho Tài Nguyên (1 bài)
(
  'tai-nguyen',
  'Bộ tài liệu hướng dẫn thủ tục đầu tư FDI tại Việt Nam (cập nhật Q2/2026)',
  '越南FDI投资程序指导文件汇编（2026年第二季度更新）',
  'Vietnam FDI Investment Procedure Documentation Kit (Updated Q2/2026)',
  'Bộ tài liệu chuẩn VCEC bao gồm: checklist hồ sơ IRC/ERC, biểu mẫu đăng ký đầu tư, hướng dẫn xin giấy phép lao động và visa cho chuyên gia nước ngoài, bản đồ các KCN trọng điểm miền Bắc.',
  'VCEC标准文件包括：IRC/ERC档案清单、投资登记表格、外籍专家劳动许可证和签证申请指南、北部重点工业区地图。',
  'VCEC standard documentation includes: IRC/ERC file checklists, investment registration forms, work permit and visa application guides for foreign experts, and maps of key northern industrial zones.',
  'https://images.unsplash.com/photo-1568219656418-15c329312bf1?auto=format&fit=crop&w=800&q=80',
  'published',
  'vcec_sadmin'
);

-- ── 6. Verify ────────────────────────────────────────────────
SELECT category, COUNT(*) as so_bai FROM public.vcec_posts GROUP BY category ORDER BY category;
