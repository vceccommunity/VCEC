-- =============================================================
-- vcec-posts-remaining.sql
-- Chèn 4 bài còn lại (dich-vu x2 + quan-he-viet-trung x2)
-- Dùng khi vcec-static-pages-posts.sql bị dừng giữa chừng
-- do lỗi check constraint.
--
-- MIKE: Chạy THEO THỨ TỰ:
--   1. vcec-category-constraint-fix.sql   ← chạy trước
--   2. vcec-posts-remaining.sql           ← chạy sau (file này)
-- =============================================================


-- ====================
-- DỊCH VỤ (2 bài)
-- ====================

INSERT INTO vcec_posts (category, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, content_vi, content_zh, content_en, status, author, created_at)
VALUES (
  'dich-vu',
  'Giải Pháp Hỗ Trợ Doanh Nghiệp Toàn Diện',
  '全方位企业支持解决方案',
  'Comprehensive Business Support Solutions',
  'Hành trình 360 độ từ khảo sát ban đầu đến khi nhà máy chính thức đi vào hoạt động ổn định.',
  '从初期勘察到工厂正式投产的360度全程陪同服务。',
  'A 360-degree journey from initial survey to stable factory operations.',
  '<p><strong>1. Tư vấn Nghiên cứu Thị trường & Khảo sát KCN</strong></p><p>Cung cấp báo cáo chuyên sâu về giá thuê, chính sách ưu đãi của từng địa phương, tổ chức các phái đoàn khảo sát thực tế vị trí lô đất.</p><p><strong>2. Hỗ trợ Pháp lý & Cấp phép Đầu tư (IRC/ERC)</strong></p><p>Soạn thảo, dịch thuật và đối chiếu hồ sơ cấp Giấy chứng nhận đăng ký đầu tư (IRC), đăng ký doanh nghiệp (ERC), giấy phép môi trường và phòng cháy chữa cháy.</p><p><strong>3. Phiên dịch & Đại diện Ủy quyền thực địa</strong></p><p>Đội ngũ chuyên viên phiên dịch kỹ thuật cao cấp tháp tùng các buổi làm việc với UBND Tỉnh, Ban Quản lý các KCN và các đối tác hạ tầng.</p><p><strong>4. Kết nối B2B & Xây dựng Chuỗi Cung ứng Bản địa</strong></p><p>Tổ chức các buổi giao lưu thương mại, tìm kiếm các nhà cung cấp linh kiện phụ trợ nội địa giúp tăng tỷ lệ nội địa hóa cho dự án FDI.</p>',
  '<p><strong>1. 市场研究与工业园区考察咨询</strong></p><p>提供各地租金、优惠政策深度报告，组织实地考察团赴地块现场勘查。</p><p><strong>2. 法律支持与投资许可（IRC/ERC）</strong></p><p>起草、翻译及核对投资注册证书（IRC）、企业注册证书（ERC）、环保及消防许可申请材料。</p><p><strong>3. 口译与实地授权代表服务</strong></p><p>高级技术口译专员陪同出席省政府、工业园区管委会及基础设施合作方的工作会议。</p><p><strong>4. B2B对接与本土供应链建设</strong></p><p>组织商贸交流活动，寻找本地配套零件供应商，提升FDI项目本地化率。</p>',
  '<p><strong>1. Market Research & Industrial Zone Survey Consulting</strong></p><p>Providing in-depth reports on rental rates and incentive policies by locality, organizing field survey delegations to plot locations.</p><p><strong>2. Legal Support & Investment Licensing (IRC/ERC)</strong></p><p>Drafting, translating and verifying applications for Investment Registration Certificates (IRC), Enterprise Registration Certificates (ERC), environmental permits and fire safety licenses.</p><p><strong>3. Interpretation & On-site Authorized Representation</strong></p><p>Senior technical interpreter team accompanies working sessions with Provincial People''s Committees, Industrial Zone Management Boards and infrastructure partners.</p><p><strong>4. B2B Networking & Local Supply Chain Development</strong></p><p>Organizing trade exchange events, sourcing local component suppliers to increase the localization rate of FDI projects.</p>',
  'published',
  'vcec_sadmin',
  '2026-01-15T08:00:00+00:00'
);


INSERT INTO vcec_posts (category, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, content_vi, content_zh, content_en, status, author, created_at)
VALUES (
  'dich-vu',
  'Quy Trình Triển Khai Xúc Tiến 4 Bước',
  '4步推进实施流程',
  '4-Step Investment Promotion Process',
  'Rút ngắn 50% thời gian chuẩn bị và đi vào sản xuất thực tế tại Việt Nam.',
  '将越南前期准备及投产时间缩短50%。',
  'Reducing preparation and production launch time in Vietnam by 50%.',
  '<p><strong>Bước 1: Đăng ký Yêu cầu Đặt chỗ & Bộ lọc Thông số</strong></p><p>Doanh nghiệp gửi nhu cầu quỹ đất, ngành nghề và yêu cầu cấp điện/nước qua cổng thông tin VCEC.</p><p><strong>Bước 2: Đối chiếu Hồ sơ & Khảo sát Thực tế</strong></p><p>Ban Xúc tiến sắp xếp xe đưa đón chuyên viên, bố trí lịch làm việc trực tiếp tại Ban quản lý KCN mục tiêu.</p><p><strong>Bước 3: Nộp Hồ sơ & Hoàn thiện Thủ tục Hành chính</strong></p><p>Thực hiện nộp tờ trình lên sở Kế hoạch Đầu tư tỉnh để nhận chấp thuận chủ trương đầu tư và cấp mã số doanh nghiệp.</p><p><strong>Bước 4: Khánh thành Nhà máy & Kết nối chuỗi B2B</strong></p><p>VCEC tiếp tục đồng hành tư vấn thuế, lao động và tuyển dụng nhân sự cấp cao tại địa bàn.</p>',
  '<p><strong>第一步：提交选址需求与参数筛选</strong></p><p>企业通过VCEC门户提交土地需求、行业类型及供电/供水要求。</p><p><strong>第二步：资料核对与实地考察</strong></p><p>促进委员会安排专车接送专员，直接在目标工业园区管委会安排工作日程。</p><p><strong>第三步：提交材料与完成行政审批</strong></p><p>向省计划投资厅提交申请，获取投资主张批准及企业代码。</p><p><strong>第四步：工厂落成与B2B供应链对接</strong></p><p>VCEC持续陪同，提供税务、劳动及高管招聘咨询服务。</p>',
  '<p><strong>Step 1: Submit Site Requirements & Parameter Filters</strong></p><p>The enterprise submits land requirements, industry type and electricity/water needs through the VCEC portal.</p><p><strong>Step 2: Document Review & On-site Survey</strong></p><p>The Promotion Board arranges transportation, scheduling direct working sessions at the target Industrial Zone Management Board.</p><p><strong>Step 3: Submit Applications & Complete Administrative Procedures</strong></p><p>Filing with the Provincial Department of Planning and Investment to receive investment policy approval and enterprise code.</p><p><strong>Step 4: Factory Inauguration & B2B Supply Chain Networking</strong></p><p>VCEC continues to accompany with tax, labor and senior recruitment consulting at the locality.</p>',
  'published',
  'vcec_sadmin',
  '2026-01-15T08:01:00+00:00'
);


-- ====================
-- QUAN HỆ VIỆT-TRUNG (2 bài — dấu mốc giao thương)
-- ====================

INSERT INTO vcec_posts (category, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, content_vi, content_zh, content_en, status, author, created_at)
VALUES (
  'quan-he-viet-trung',
  'Tháng 12/2023 — Tuyên bố chung Việt Nam - Trung Quốc về Cộng đồng chia sẻ tương lai',
  '2023年12月 — 越中两国关于构建命运共同体的联合声明',
  'Dec 2023 — Vietnam-China Joint Statement on Building a Shared Future Community',
  'Lãnh đạo cấp cao hai nước nhất trí tăng cường kết nối "Hai hành lang, một vành đai" với "Một vành đai, một con đường".',
  '两国高层领导人就加强"两廊一圈"与"一带一路"对接达成共识。',
  'Senior leaders of both countries agreed to strengthen the connection between "Two Corridors, One Belt" and "One Belt, One Road".',
  '<p>Lãnh đạo cấp cao hai nước nhất trí tăng cường kết nối sáng kiến "Hai hành lang, một vành đai" với "Một vành đai, một con đường", tạo cơ sở pháp lý vững chắc cho dòng vốn FDI đầu tư hạ tầng và công nghiệp chất lượng cao.</p>',
  '<p>两国高层领导人就加强"两廊一圈"与"一带一路"倡议对接达成共识，为高质量基础设施和工业领域FDI资金流动奠定坚实的法律基础。</p>',
  '<p>Senior leaders of both countries agreed to strengthen the connection between the "Two Corridors, One Belt" initiative and the "Belt and Road Initiative," creating a solid legal foundation for FDI capital flows in high-quality infrastructure and industrial sectors.</p>',
  'published',
  'vcec_sadmin',
  '2023-12-15T08:00:00+00:00'
);


INSERT INTO vcec_posts (category, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, content_vi, content_zh, content_en, status, author, created_at)
VALUES (
  'quan-he-viet-trung',
  'Tháng 8/2024 — Ký kết 14 Văn kiện Hợp tác Kinh tế - Thương mại Xuyên Biên Giới',
  '2024年8月 — 签署14项跨境经贸合作文件',
  'Aug 2024 — Signing of 14 Cross-Border Economic and Trade Cooperation Documents',
  'Trong khuôn khổ chuyến thăm cấp nhà nước, các bộ ngành hai nước hoàn thành đàm phán ký kết biên bản kết nối cửa khẩu thông minh và hạ tầng đường sắt.',
  '在国事访问框架内，两国各部委完成智慧口岸互联及铁路基础设施谅解备忘录的谈判签署。',
  'Within the state visit framework, ministries of both countries completed negotiations and signed MoUs on smart border gate connectivity and railway infrastructure.',
  '<p>Trong khuôn khổ chuyến thăm cấp nhà nước, các bộ ngành hai nước đã hoàn thành đàm phán ký kết biên bản kết nối cửa khẩu thông minh, liên kết hạ tầng đường sắt tiêu chuẩn khổ rộng và tối ưu hóa thủ tục hải quan.</p>',
  '<p>在国事访问框架内，两国各部委完成了智慧口岸互联、标准轨距铁路基础设施对接及海关通关手续优化谅解备忘录的谈判与签署。</p>',
  '<p>Within the state visit framework, ministries of both countries completed negotiations and signed memoranda on smart border gate connectivity, standard-gauge railway infrastructure linkage, and customs procedure optimization.</p>',
  'published',
  'vcec_sadmin',
  '2024-08-20T08:00:00+00:00'
);


-- Xác nhận kết quả
SELECT category, title_vi, created_at FROM vcec_posts
WHERE category IN ('dich-vu', 'quan-he-viet-trung')
ORDER BY category, created_at;
