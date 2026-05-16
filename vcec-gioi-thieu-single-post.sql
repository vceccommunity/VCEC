-- =============================================================
-- vcec-gioi-thieu-single-post.sql
-- Gộp 2 bài gioi-thieu thành 1 bài "Bài Giới Thiệu Chính"
-- MIKE: Chạy trong Supabase Dashboard > SQL Editor
-- =============================================================

-- Bước 1: Xóa 2 bài cũ
DELETE FROM vcec_posts WHERE category = 'gioi-thieu';

-- Bước 2: Insert 1 bài tổng hợp
INSERT INTO vcec_posts (
  category, title_vi, title_zh, title_en,
  summary_vi, summary_zh, summary_en,
  content_vi, content_zh, content_en,
  status, author, created_at
) VALUES (
  'gioi-thieu',
  'Bài Giới Thiệu Chính',
  'VCEC主要介绍',
  'Main Introduction',
  'Tầm nhìn, sứ mệnh, giá trị cốt lõi và ban điều hành VCEC — cầu nối kinh tế song phương Việt - Trung.',
  'VCEC的愿景、使命、核心价值观及执行委员会——越中双边经济桥梁。',
  'VCEC vision, mission, core values and executive committee — the bilateral economic bridge between Vietnam and China.',
  '<h3>Tầm Nhìn & Sứ Mệnh</h3><p>VCEC hướng tới trở thành Cầu nối Kinh tế chính thống, hiệu quả số một giữa hai quốc gia, mang lại giá trị thực chiến và bền vững cho cộng đồng doanh nghiệp hai nước Việt - Trung.</p><h3>Giá Trị Cốt Lõi</h3><p><strong>1. Sự Chính Danh & Tin Cậy</strong><br>Hoạt động trực tiếp với sự bảo trợ của các hiệp hội kinh tế, phòng thương mại song phương cấp quốc gia.</p><p><strong>2. Tính Thực Chiến & Hiệu Quả</strong><br>Không chỉ tư vấn lý thuyết, VCEC đồng hành hỗ trợ thực địa tại khu công nghiệp, giải quyết thủ tục đến khi cấp phép thành công.</p><p><strong>3. Bản Sắc & Thấu Hiểu Văn Hóa</strong><br>Đội ngũ chuyên viên song ngữ thấu hiểu sâu sắc tư duy kinh doanh và thói quen làm việc của doanh nghiệp hai nước.</p><h3>Ban Điều Hành VCEC</h3><p><strong>Ông Nguyễn Hải Anh</strong> — Chủ tịch Ban Xúc tiến Đầu tư VCEC<br>Hơn 15 năm kinh nghiệm điều hành và tư vấn thu hút vốn FDI từ Trung Quốc đại lục và Đài Loan sang các KCN trọng điểm Việt Nam.</p><p><strong>Bà Vương Mỹ Linh (Wang Mei Ling)</strong> — Đại diện Trưởng VP Thâm Quyến<br>Cựu Thạc sĩ Luật Kinh tế ĐH Thanh Hoa, chuyên gia tháo gỡ rào cản pháp lý thành lập công ty có vốn nước ngoài tại Việt Nam.</p>',
  '<h3>愿景与使命</h3><p>VCEC致力于成为越中两国之间最权威、最高效的经济桥梁，为两国企业界带来切实、持久的价值。</p><h3>核心价值观</h3><p><strong>1. 正统性与可信度</strong><br>直接在国家级双边经济协会、商会的支持下运营。</p><p><strong>2. 实战性与高效性</strong><br>不止于理论咨询，VCEC在工业园区现场陪同协助，处理手续直至成功获批。</p><p><strong>3. 文化理解与本土特色</strong><br>双语专业团队深刻理解两国企业的商业思维与工作习惯。</p><h3>VCEC执行委员会</h3><p><strong>阮海英先生</strong> — VCEC投资促进委员会主席<br>拥有超过15年从中国大陆及台湾吸引FDI进入越南重点工业园区的运营与咨询经验。</p><p><strong>王美玲女士</strong> — 深圳代表处首席代表<br>清华大学经济法学硕士，专长于解决外资企业在越南设立的法律障碍。</p>',
  '<h3>Vision & Mission</h3><p>VCEC strives to become the most authoritative and effective economic bridge between Vietnam and China, delivering real and sustainable value to the business communities of both countries.</p><h3>Core Values</h3><p><strong>1. Legitimacy & Trust</strong><br>Operating directly under the sponsorship of national-level bilateral economic associations and chambers of commerce.</p><p><strong>2. Pragmatism & Effectiveness</strong><br>Beyond theoretical consulting, VCEC accompanies clients on-site at industrial zones, handling procedures until successful licensing.</p><p><strong>3. Cultural Identity & Understanding</strong><br>Our bilingual expert team deeply understands the business mindset and work habits of enterprises from both countries.</p><h3>VCEC Executive Committee</h3><p><strong>Mr. Nguyen Hai Anh</strong> — Chairman, VCEC Investment Promotion Board<br>Over 15 years of experience in managing and consulting on attracting FDI from mainland China and Taiwan to key industrial zones in Vietnam.</p><p><strong>Ms. Wang Mei Ling</strong> — Chief Representative, Shenzhen Office<br>Former Master of Economic Law from Tsinghua University, expert in resolving legal barriers for foreign-invested companies in Vietnam.</p>',
  'published',
  'vcec_sadmin',
  NOW()
);

-- Xác nhận
SELECT id, category, title_vi, status, created_at FROM vcec_posts
WHERE category = 'gioi-thieu';
