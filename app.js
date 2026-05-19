/*
  VCEC Portal Master Script
  Features: Global Multi-Language Translation (VI, ZH, EN), Shared Header/Footer Rendering,
            Dynamic Project Database, Responsive Filters, and Google Maps Free Coordinate Pinning.
  Author: Senior Frontend Architect
*/

// Supabase Configuration
const supabaseUrl = "https://uksvxqhclwjrzeoqsfxr.supabase.co";
const supabaseKey = "sb_publishable_LiblBao7DK6HZIZhHskXCg_Kfohb65Y";
let supabaseClient = null;

// Dynamically inject Supabase CDN script
(function() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.0/dist/umd/supabase.js";
  script.async = false;
  script.onload = () => {
    if (window.supabase) {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      window.supabaseClient = supabaseClient;
      window.dispatchEvent(new CustomEvent('supabase-ready'));
    }
  };
  document.head.appendChild(script);
})();

// 1. Translation Dictionary (Vietnamese, Chinese, English)
const translations = {
  vi: {
    // Nav Bar
    "nav-home": "Trang Chủ",
    "nav-about": "Giới Thiệu",
    "nav-relations": "Quan Hệ Việt-Trung",
    "nav-sectors": "Lĩnh Vực",
    "nav-services": "Dịch Vụ",
    "nav-opp": "Cơ Hội Đầu Tư",
    "nav-news": "Tin Tức",
    "nav-resources": "Tài Nguyên",
    "nav-contact": "Liên Hệ",
    "nav-members": "Thành Viên",
    "member-profile": "👤 Trang Cá Nhân",
    "sub-title": "ĐẦU TƯ SONG PHƯƠNG",

    // Hero Section
    "hero-title": "Kết nối doanh nghiệp Việt – Trung. <span>Kiến tạo tương lai</span> cùng phát triển.",
    "hero-desc": "Trung tâm Giao lưu và Hợp tác Kinh tế Việt Nam – Trung Quốc (VCEC) – nơi mở cánh cửa đầu tư, công nghệ và thương mại giữa hai nền kinh tế năng động hàng đầu châu Á.",
    "btn-find-partner": "Tìm đối tác",
    "btn-explore-opp": "Khám phá cơ hội đầu tư",
    "search-btn": "Tìm Kiếm Cơ Hội Ngay",
    "select-province": "Chọn tỉnh thành",
    "select-sector": "Chọn lĩnh vực hợp tác",
    "select-size": "Quy mô diện tích",
    "lbl-province": "Địa bàn quan tâm",
    "lbl-sector": "Ngành nghề trọng điểm",
    "lbl-size": "Quỹ đất yêu cầu",

    // Sectors Section
    "sectors-title": "8 MẢNG HỢP TÁC TRỌNG ĐIỂM",
    "sectors-subtitle": "Các lĩnh vực chiến lược thúc đẩy xúc tiến dòng vốn FDI chính ngạch sang Việt Nam",
    "sec-logistics": "Logistics & Chuỗi cung ứng",
    "sec-logistics-desc": "Vận tải liên vận đa phương thức, trung tâm kho bãi thông minh xuyên biên giới.",
    "sec-energy": "Năng lượng xanh & BESS",
    "sec-energy-desc": "Phát triển dự án điện gió, điện mặt trời và hệ thống lưu trữ năng lượng (BESS) hiện đại.",
    "sec-ev": "Xe điện (EV) & Trạm sạc",
    "sec-ev-desc": "Sản xuất phương tiện giao thông điện, chuỗi cung ứng pin và hạ tầng trạm sạc nhanh.",
    "sec-ebike": "E-bike sharing",
    "sec-ebike-desc": "Giải pháp di chuyển xanh đô thị thông minh bằng xe đạp điện chia sẻ công nghệ cao.",
    "sec-drone": "Drone & Robot công nghiệp",
    "sec-drone-desc": "Ứng dụng thiết bị bay không người lái và giải pháp tự động hóa robot trong sản xuất.",
    "sec-smart-mfg": "Sản xuất thông minh",
    "sec-smart-mfg-desc": "Nhà máy số hóa, tự động hóa cao, sản xuất thiết bị bán dẫn và điện tử thế hệ mới.",
    "sec-agri": "Nông nghiệp công nghệ cao",
    "sec-agri-desc": "Công nghệ canh tác thông minh, chế biến sâu xuất khẩu nông sản chính ngạch giá trị cao.",
    "sec-culture": "Du lịch & Văn hóa",
    "sec-culture-desc": "Xúc tiến kết nối du lịch lữ hành, giao lưu văn hóa nghệ thuật và bảo tồn di sản Việt - Trung.",

    // Opportunities Filters
    "filter-title": "Lựa chọn tiêu chí",
    "filter-region": "Vùng Địa Lý",
    "filter-north": "Miền Bắc Việt Nam",
    "filter-south": "Miền Nam Việt Nam",
    "filter-central": "Miền Trung Việt Nam",
    "filter-sec-title": "Lĩnh Vực",
    "filter-electronics": "Công nghệ cao & Điện tử",
    "filter-energy": "Năng lượng & Xe điện",
    "filter-infra": "Hạ tầng Khu Công Nghiệp",
    "detail-btn": "Xem Chi Tiết",
    "direction-btn": "🧭 Chỉ đường trên Google Maps",
    "apply-matching": "Yêu Cầu Kết Nối & Nhận Sơ Đồ Quy Hoạch",
    "matching-desc": "Hệ thống tự động gán hồ sơ của doanh nghiệp cho Chuyên viên Ban Xúc tiến Đầu tư khu vực phù hợp để phản hồi trong vòng 15 phút.",
    "form-company": "Tên Doanh Nghiệp (Công ty)",
    "form-name": "Họ và Tên Người Đại Diện",
    "form-phone": "Số điện thoại di động",
    "form-wechat": "WeChat ID / WhatsApp",
    "form-submit": "Gửi Đăng Ký Đối Chiếu",

    // Dialog Success Modal
    "success-title": "Gửi Đăng Ký Thành Công!",
    "success-desc": "VCEC đã ghi nhận hồ sơ của doanh nghiệp và gán chuyên viên tư vấn tiếng Trung phụ trách trực tiếp liên hệ lại với anh/chị.",
    "wechat-title": "CHỦ ĐỘNG KẾT NỐI WECHAT / WHATSAPP",
    "wechat-desc": "Quét mã QR dưới đây để kết nối trực tiếp với Chuyên viên phụ trách thực địa khu vực của bạn:",
    "success-close": "Đóng cửa sổ",

    // Statistics
    "stat-fdi-title": "Trung Quốc – đối tác thương mại lớn nhất của Việt Nam",
    "stat-kcn-title": "Doanh nghiệp đã được VCEC kết nối",
    "stat-b2b-title": "Lĩnh vực hợp tác trọng điểm",
    "stat-province-title": "Tỉnh/thành Trung Quốc có mạng lưới VCEC",

    // Why Choose VCEC
    "why-title": "Tại sao chọn VCEC",
    "why-subtitle": "Đối tác tin cậy thúc đẩy hợp tác đầu tư và thương mại Việt - Trung bền vững",
    "why-card1-title": "Vị thế chính danh",
    "why-card1-desc": "VCEC là trung tâm chuyên trách giao lưu kinh tế Việt – Trung, với mạng lưới quan hệ chính phủ, hiệp hội và doanh nghiệp tại cả hai nước.",
    "why-card2-title": "Hiểu sâu hai thị trường",
    "why-card2-desc": "Đội ngũ song ngữ Việt – Trung am hiểu pháp lý, văn hóa kinh doanh, tập quán thương mại và chính sách FDI của hai quốc gia.",
    "why-card3-title": "Mạng lưới đối tác chiến lược",
    "why-card3-desc": "Kết nối trực tiếp đến các tập đoàn, hiệp hội ngành nghề, ngân hàng, khu công nghiệp lớn ở Trung Quốc và Việt Nam.",
    "why-card4-title": "Hỗ trợ trọn gói (One-stop service)",
    "why-card4-desc": "Từ khảo sát thị trường, kết nối đối tác, tư vấn pháp lý đến tổ chức đoàn doanh nghiệp – một đầu mối duy nhất.",

    // Relations Section (Viet-Trung Relations)
    "rel-title": "Quan Hệ Việt – Trung",
    "rel-subtitle": "Nền tảng chính trị vững bền, thúc đẩy hợp tác và thịnh vượng kinh tế song phương",
    "rel-quote-title": "THÔNG ĐIỆP CHIẾN LƯỢC",
    "rel-quote-body": "“Quan hệ Đối tác Hợp tác Chiến lược Toàn diện Việt Nam – Trung Quốc và Cộng đồng chia sẻ tương lai có ý nghĩa chiến lược”",
    "rel-quote-sub": "nền tảng vững chắc cho hợp tác kinh tế song phương.",
    "rel-quote-desc": "Sự tin cậy chính trị và gắn kết cấp cao nhất mở ra kỷ nguyên vàng cho giao thương, dịch chuyển dòng vốn đầu tư chất lượng cao, phát triển hạ tầng đường sắt kết nối biên giới và tối ưu chuỗi cung ứng logistics toàn diện giữa Việt Nam và Trung Quốc.",
    "rel-cta": "Xem dòng thời gian quan hệ Việt – Trung",
    "visit-1-date": "12/2023",
    "visit-1-leaders": "Tổng Bí thư Nguyễn Phú Trọng & Tổng Bí thư, Chủ tịch nước Tập Cận Bình",
    "visit-1-title": "Tuyên bố chung Hà Nội 2023",
    "visit-1-result": "Ký kết 36 văn kiện hợp tác, nâng tầm quan hệ hai nước lên Cộng đồng chia sẻ tương lai Việt Nam – Trung Quốc có ý nghĩa chiến lược.",
    "visit-2-date": "08/2024",
    "visit-2-leaders": "Tổng Bí thư, Chủ tịch nước Tô Lâm & Tổng Bí thư, Chủ tịch nước Tập Cận Bình",
    "visit-2-title": "Hội đàm cấp cao tại Bắc Kinh",
    "visit-2-result": "Khẳng định thúc đẩy kết nối đường sắt khổ tiêu chuẩn qua biên giới (Lào Cai - Hà Nội - Hải Phòng, Đồng Đăng - Hà Nội và Móng Cái - Hạ Long - Hải Phòng).",
    "visit-3-date": "10/2024",
    "visit-3-leaders": "Thủ tướng Phạm Minh Chính & Thủ tướng Lý Cường",
    "visit-3-title": "Hợp tác hành động thực chất",
    "visit-3-result": "Thống nhất nâng cao quy mô thương mại, mở rộng xuất khẩu nông sản chính ngạch và tháo gỡ triệt để các điểm nghẽn logistics biên giới.",

    // Success Stories Section
    "success-stories-title": "Câu Chuyện Thành Công",
    "success-stories-subtitle": "Các dự án tiêu biểu được VCEC xúc tiến và hỗ trợ đầu tư thực chiến thành công",
    "case1-title": "Logistics & Chuỗi cung ứng – Đầu tư 15 triệu USD – Hải Phòng",
    "case1-desc": "VCEC đã hỗ trợ khảo sát thực địa tại Khu kinh tế Đình Vũ – Cát Hải, tư vấn xin cấp phép đầu tư dự án kho bãi thông minh liên vận và tháo gỡ thủ tục hải quan cho luồng hàng hóa nông sản xuyên biên giới.",
    "case1-quote": "“Sự đồng hành chuyên nghiệp, am hiểu sâu sắc quy trình pháp lý song phương của VCEC đã rút ngắn 40% thời gian triển khai dự án hạ tầng logistics cốt lõi của chúng tôi tại Việt Nam.”",
    "case1-author": "Mr. Wang Jun",
    "case1-role": "CEO Shenzhen Intelligent Warehousing (SWS)",
    "case2-title": "Năng lượng xanh & BESS – Quy mô 50 MW / 100 MWh – Bình Thuận",
    "case2-desc": "VCEC đóng vai trò kết nối liên danh chiến lược, hỗ trợ đàm phán hợp đồng chuyển giao công nghệ lưu trữ năng lượng pin lithium cao cấp và thực hiện các báo cáo đánh giá tác động môi trường đạt chuẩn quốc tế.",
    "case2-quote": "“VCEC không chỉ là cầu nối thương mại, mà còn là đối tác tin cậy giúp hai doanh nghiệp vượt qua rào cản ngôn ngữ và sự khác biệt văn hóa kinh doanh để đi đến ký kết liên doanh lịch sử.”",
    "case2-author": "Ông Nguyễn Văn Hải",
    "case2-role": "Chủ tịch Tập đoàn Năng lượng Sông Đà (SDE)",
    "case3-title": "Sản xuất thông minh – Tổng vốn 120 triệu USD – Bắc Ninh",
    "case3-desc": "VCEC đã kết nối xúc tiến mặt bằng tại Khu công nghiệp Quế Võ, hỗ trợ tuyển dụng nhân sự chất lượng cao song ngữ và tư vấn gói ưu đãi thuế thu nhập doanh nghiệp đặc biệt cho dự án sản xuất linh kiện thông minh.",
    "case3-quote": "“Với sự hỗ trợ trọn gói một đầu mối từ VCEC, chúng tôi đã nhanh chóng thiết lập dây chuyền sản xuất bán dẫn hiện đại và đi vào vận hành ổn định vượt tiến độ đề ra.”",
    "case3-author": "Ms. Zhang Wei",
    "case3-role": "Giám đốc FDI Goertek Electronics China",

    // Latest News Section
    "news-latest-title": "Tin Tức Mới Nhất",
    "news-latest-subtitle": "Cập nhật chính thống hoạt động của VCEC, chính sách thương mại và các sự kiện FDI trọng điểm",
    "group-vcec": "Tin VCEC",
    "group-policy": "Chính sách & Thương mại",
    "group-events": "Sự kiện sắp diễn ra",
    "btn-view-all": "Xem tất cả",
    "read-more": "Xem bài viết",

    // Quick Support Section
    "support-quick-title": "Đăng Ký Hỗ Trợ Nhanh",
    "support-quick-subtitle": "Bạn là doanh nghiệp Việt Nam tìm đối tác Trung Quốc, hay nhà đầu tư Trung Quốc muốn vào Việt Nam? Để VCEC kết nối bạn trong 48 giờ.",
    "form-fullname": "Họ và tên",
    "form-country": "Quốc gia",
    "form-country-vn": "Việt Nam",
    "form-country-other": "Khác / International",
    "form-sectors": "Lĩnh vực quan tâm",
    "form-wechat-optional": "Email / Số điện thoại / WeChat (Tùy chọn)",
    "form-content-support": "Nội dung cần hỗ trợ",
    "form-submit-quick": "Gửi yêu cầu hỗ trợ nhanh",

    // Bilateral Relation
    "bilateral-title": "Quan Hệ Kinh Tế Việt - Trung",
    "bilateral-subtitle": "Số liệu kim ngạch xuất nhập khẩu và các dấu mốc giao thương quan trọng",
    "chart-title": "Kim ngạch Thương mại Song phương (Tỷ USD)",
    "export-label": "Việt Nam xuất khẩu sang Trung Quốc",
    "import-label": "Việt Nam nhập khẩu từ Trung Quốc",

    // About Page
    "about-vision": "Tầm Nhìn & Sứ Mệnh VCEC",
    "about-vision-desc": "Trở thành Cầu nối Kinh tế chính thống, hiệu quả số một giữa hai quốc gia, mang lại giá trị thực chiến và bền vững cho cộng đồng doanh nghiệp hai nước Việt - Trung.",

    // Footer
    "footer-desc": "Cổng thông tin xúc tiến đầu tư hai chiều chính thống và nền tảng kết nối giao thương B2B thực chiến giữa Việt Nam và Trung Quốc.",
    "footer-office": "Văn Phòng Đại Diện",
    "footer-hanoi": "Trụ sở Hà Nội: Tòa tháp VCCI, số 9 Đào Duy Anh, Đống Đa, Hà Nội.",
    "footer-shenzhen": "Văn phòng Thâm Quyến: Số 88, Đại lộ Thâm Nam, Quận Phúc Điền, Thâm Quyến, Trung Quốc.",
    "copyright": "© 2026 Trung tâm Giao lưu và Hợp tác Kinh tế Việt - Trung (VCEC). Tất cả quyền được bảo lưu.",
    "member-login": "Đăng Nhập Thành Viên",
    "member-register": "Đăng Ký Nhanh",
    "username": "Tên đăng nhập",
    "password": "Mật khẩu",
    "btn-login": "Đăng Nhập",
    "btn-register": "Đăng Ký",
    "no-account": "Chưa có tài khoản? Đăng ký nhanh",
    "has-account": "Đã có tài khoản? Đăng nhập",
    "hello": "Xin chào",
    "logout": "Đăng Xuất",
    "member-status": "Thành viên Chính thức",
    "username-placeholder": "Nhập tài khoản...",
    "password-placeholder": "Nhập mật khẩu...",
    "select-role": "Vai trò của bạn",
    "role-cn-investor": "Nhà đầu tư & doanh nghiệp TQ",
    "role-vn-company": "Doanh nghiệp Việt Nam",
    "role-department": "Cơ quan & hiệp hội",
    "role-rnd-media": "Truyền thông & nghiên cứu"
  },
  zh: {
    // Nav Bar
    "nav-home": "首页",
    "nav-about": "关于我们",
    "nav-relations": "中越关系",
    "nav-sectors": "合作领域",
    "nav-services": "企业服务",
    "nav-opp": "投资机会",
    "nav-news": "新闻动态",
    "nav-resources": "政策资源",
    "nav-contact": "联系我们",
    "nav-members": "会员",
    "member-profile": "👤 个人中心",
    "sub-title": "越中双向投资促进门户网站",

    // Hero Section
    "hero-title": "中越企业对接。<span>携手共建</span>，协同发展。",
    "hero-desc": "越南—中国经济交流与合作中心 (VCEC) — 开启亚洲两大最具活力经济体之间投资、技术与贸易合作的黄金大门。",
    "btn-find-partner": "寻找合作伙伴",
    "btn-explore-opp": "探索投资机会",
    "search-btn": "立即寻找机会",
    "select-province": "选择省份",
    "select-sector": "选择合作领域",
    "select-size": "用地规模需求",
    "lbl-province": "意向投资省份",
    "lbl-sector": "重点合作行业",
    "lbl-size": "用地空间需求",

    // Sectors Section
    "sectors-title": "8 大重点合作领域",
    "sectors-subtitle": "推动中资向越南合规投资的战略核心领域",
    "sec-logistics": "物流与供应链",
    "sec-logistics-desc": "多式联运大通道，跨境智能化仓储与冷链物流中心。",
    "sec-energy": "绿色能源与电池储能系统 (BESS)",
    "sec-energy-desc": "开发风电、光伏项目及高容量智能电池储能系统。",
    "sec-ev": "电动汽车 (EV) 与充电桩",
    "sec-ev-desc": "新能源汽车制造、动力电池产业链及快速充电桩网络建设。",
    "sec-ebike": "共享电动自行车 (E-bike sharing)",
    "sec-ebike-desc": "基于高新技术物联网 of 城市智能绿色共享出行解决方案。",
    "sec-drone": "无人机与工业机器人",
    "sec-drone-desc": "工业级无人机应用及工厂智能化机器人自动控制解决方案。",
    "sec-smart-mfg": "智能制造",
    "sec-smart-mfg-desc": "高度自动化的数字化工厂，生产新一代半导体与高科技电子设备。",
    "sec-agri": "高科技农业",
    "sec-agri-desc": "智慧农业耕作、农产品深加工及对华正规渠道出口贸易。",
    "sec-culture": "旅游与文化",
    "sec-culture-desc": "推动跨境旅游联结，促进中越文化艺术交流与历史遗产保护合作。",

    // Opportunities Filters
    "filter-title": "投资机会筛选器",
    "filter-region": "地理区域",
    "filter-north": "越南北部地区",
    "filter-south": "越南南部地区",
    "filter-central": "越南中部地区",
    "filter-sec-title": "重点行业",
    "filter-electronics": "高科技与电子",
    "filter-energy": "新能源与电动车",
    "filter-infra": "工业区基础设施",
    "detail-btn": "查看详情",
    "direction-btn": "🧭 谷歌地图查看路线",
    "apply-matching": "申请投资对接与获取规划图",
    "matching-desc": "系统将自动将您的企业档案分派给对应的区域投资促进部专员，承诺15分钟内提供微信主动联络服务。",
    "form-company": "企业/公司名称",
    "form-name": "代表法定人姓名",
    "form-phone": "联系电话/手机号",
    "form-wechat": "微信账号 / WhatsApp ID",
    "form-submit": "提交注册对接",

    // Dialog Success Modal
    "success-title": "申请提交成功！",
    "success-desc": "VCEC 已录入您的企业档案，并指派专门的中文招商专员与您取得联系。",
    "wechat-title": "主动添加专员微信 / WhatsApp",
    "wechat-desc": "扫描下方二维码，直接与您意向考察区域的现场招商主管取得实时在线沟通：",
    "success-close": "关闭窗口",

    // Statistics
    "stat-fdi-title": "中国 — 越南最大的贸易合作伙伴",
    "stat-kcn-title": "已成功由 VCEC 联结对接的企业数",
    "stat-b2b-title": "双方战略重点合作领域",
    "stat-province-title": "拥有 VCEC 合作网络的中国省市",

    // Why Choose VCEC
    "why-title": "为什么选择 VCEC",
    "why-subtitle": "促进中越投资与贸易可持续合作的深受信赖合作伙伴",
    "why-card1-title": "官方正规资质与地位",
    "why-card1-desc": "VCEC 是中越经济交流与合作的专门机构，在两国拥有广泛的政府、行业协会及企业资源网络。",
    "why-card2-title": "深谙两国市场",
    "why-card2-desc": "精通中越双语的专业团队，深谙两国的法律法规、商业文化、贸易习惯及外商直接投资（FDI）政策。",
    "why-card3-title": "战略合作伙伴网络",
    "why-card3-desc": "直接对接中越两国的知名企业集团、行业协会、商业银行及大型工业园区。",
    "why-card4-title": "一站式全方位服务",
    "why-card4-desc": "从市场调研、合作伙伴对接、法律咨询到组织商务代表团考察，提供单一窗口的一站式贴心服务。",

    // Relations Section (Viet-Trung Relations)
    "rel-title": "中越关系",
    "rel-subtitle": "坚实的政治互信基础，为双边经济合作与繁荣提供根本保障",
    "rel-quote-title": "战略指引与核心信息",
    "rel-quote-body": "“构建具有战略意义的中越命运共同体，深化全面战略合作伙伴关系”",
    "rel-quote-sub": "是双边经济合作坚不可摧的坚实基石。",
    "rel-quote-desc": "高层政治互信与经贸往来深度交融，开启中越经贸“黄金期”。双方积极推动跨境标准轨铁路互联互通，打造高度安全、稳定且高效的跨境供应链网络，吸引高技术与绿色产业投资。",
    "rel-cta": "查看中越关系历史时间线",
    "visit-1-date": "2023年12月",
    "visit-1-leaders": "阮富仲总书记与习近平总书记、国家主席",
    "visit-1-title": "2023年河内联合声明",
    "visit-1-result": "签署36项合作文件，将两国关系提升为具有战略意义的中越命运共同体。",
    "visit-2-date": "2024年8月",
    "visit-2-leaders": "苏林总书记、国家主席与习近平总书记、国家主席",
    "visit-2-title": "北京高层会谈",
    "visit-2-result": "确立推动跨境标准轨铁路对接项目（老街—河内—海防、同登—河内、芒街—下龙—海防）。",
    "visit-3-date": "2024年10月",
    "visit-3-leaders": "范明政总理与李强总理",
    "visit-3-title": "务实行动合作",
    "visit-3-result": "一致同意扩大贸易规模，拓展农产品正规渠道出口，彻底解决边境物流瓶颈问题。",

    // Success Stories Section
    "success-stories-title": "成功案例",
    "success-stories-subtitle": "由 VCEC 成功促进和协助的代表性中越双边投资落地项目",
    "case1-title": "物流与供应链 — 投资额 1500万美元 — 海防市",
    "case1-desc": "VCEC 协助在亭武—吉海经济区进行实地考察，为联运智能仓储项目提供投资许可咨询，并高效解决跨境农产品物流的通关手续难题。",
    "case1-quote": "“VCEC 极其专业且深谙双边法律流程，为我们在越南部署核心物流基础设施项目缩短了 40% 的落地时间。”",
    "case1-author": "王军 先生",
    "case1-role": "深圳智能仓储系统 (SWS) 首席执行官",
    "case2-title": "绿色能源与电池储能 (BESS) — 规模 50 MW / 100 MWh — 平顺省",
    "case2-desc": "VCEC 发挥了战略合资对接作用，协助谈判引进先进锂电池储能系统技术转让合同，并协助完成符合国际标准的环保评估报告。",
    "case2-quote": "“VCEC 不仅是商业桥梁，更是一个深受信赖的合作伙伴，协助两家企业跨越语言与商业文化壁垒，促成了这次历史性的联营签署。”",
    "case2-author": "阮文海 先生",
    "case2-role": "沱江能源集团 (SDE) 董事长",
    "case3-title": "智能制造 — 总投资额 1.2亿美元 — 北宁省",
    "case3-desc": "VCEC 对接推荐了桂武工业区厂房用地，协助招聘高素质中越双语人才，并为智能电子元器件制造项目申请专属的企业所得税优惠政策。",
    "case3-quote": "“得益于 VCEC 提供的一站式全方位招商落地服务，我们得以在极短时间内建成先进的半导体生产线并顺利投入量产。”",
    "case3-author": "张玮 女士",
    "case3-role": "歌尔电子中国 (Goertek) 外商直接投资总经理",

    // Latest News Section
    "news-latest-title": "最新资讯",
    "news-latest-subtitle": "发布 VCEC 最新动态、双边贸易政策调整及重要投资促进活动",
    "group-vcec": "VCEC 动态",
    "group-policy": "政策与贸易",
    "group-events": "近期活动",
    "btn-view-all": "查看全部",
    "read-more": "阅读全文",

    // Quick Support Section
    "support-quick-title": "快速支持登记",
    "support-quick-subtitle": "您是寻找中国合作伙伴的越南企业，还是希望进入越南的中国投资者？让 VCEC 在 48 小时内为您建立联系。",
    "form-fullname": "姓名",
    "form-country": "国家/地区",
    "form-country-vn": "越南",
    "form-country-other": "其他 / 国际",
    "form-sectors": "关注领域",
    "form-wechat-optional": "电子邮箱 / 电话 / 微信 (选填)",
    "form-content-support": "需要支持的内容",
    "form-submit-quick": "提交快速支持请求",

    // Bilateral Relation
    "bilateral-title": "越中双边经济关系",
    "bilateral-subtitle": "双边进出口贸易额及关键历史投资合作里程碑数据",
    "chart-title": "双边年度贸易额走势图 (十亿美元)",
    "export-label": "越南对华出口总额",
    "import-label": "越南自华进口总额",

    // About Page
    "about-vision": "VCEC 愿景与使命",
    "about-vision-desc": "打造越中两国间最权威、最高效、最实战的双向经济桥梁，为两国企业界创造持续、稳健的投资与贸易价值。",

    // Footer
    "footer-desc": "越中双向官方正名投资促进门户网站，专注于两国间最务实的 B2B 企业对接与政策落地服务。",
    "footer-office": "各地代表办事处",
    "footer-hanoi": "河内总部：越南河内市东大郡陶维英路9号 VCCI大厦。",
    "footer-shenzhen": "深圳联络处：中国深圳市福田区深南大道88号。",
    "copyright": "© 2026 越中经济交流与合作中心 (VCEC). 版权所有.",
    "member-login": "会员登录",
    "member-register": "快速注册",
    "username": "用户名",
    "password": "密码",
    "btn-login": "登录",
    "btn-register": "注册",
    "no-account": "还没有账号？立即快速注册",
    "has-account": "已有账号？立即登录",
    "hello": "您好",
    "logout": "退出登录",
    "member-status": "正式会员",
    "username-placeholder": "输入用户名...",
    "password-placeholder": "输入密码...",
    "select-role": "您的角色身份",
    "role-cn-investor": "中国投资者与企业",
    "role-vn-company": "越南企业",
    "role-department": "机关与协会",
    "role-rnd-media": "媒体与研究机构"
  },
  en: {
    // Nav Bar
    "nav-home": "Home",
    "nav-about": "About",
    "nav-relations": "VN-CN Relations",
    "nav-sectors": "Sectors",
    "nav-services": "Services",
    "nav-opp": "Opportunities",
    "nav-news": "News",
    "nav-resources": "Resources",
    "nav-contact": "Contact",
    "nav-members": "Members",
    "member-profile": "👤 My Profile",
    "sub-title": "BILATERAL INVESTMENT PROMOTION PORTAL",

    // Hero Section
    "hero-title": "Connecting Vietnam – China Enterprises. <span>Shaping a shared future</span> of development.",
    "hero-desc": "The Vietnam – China Economic Exchange and Cooperation Center (VCEC) – opening the gateway to investment, technology, and trade between two of Asia's most dynamic economies.",
    "btn-find-partner": "Find Partners",
    "btn-explore-opp": "Explore Opportunities",
    "search-btn": "Search Opportunities",
    "select-province": "Select province",
    "select-sector": "Select priority sector",
    "select-size": "Land size requirement",
    "lbl-province": "Target Province",
    "lbl-sector": "Priority Industry",
    "lbl-size": "Requested Land Area",

    // Sectors Section
    "sectors-title": "8 KEY COOPERATION SECTORS",
    "sectors-subtitle": "Strategic fields driving sustainable and official FDI capital flows into Vietnam",
    "sec-logistics": "Logistics & Supply Chain",
    "sec-logistics-desc": "Multimodal transportation networks and cross-border smart warehousing systems.",
    "sec-energy": "Green Energy & BESS",
    "sec-energy-desc": "Wind/solar power projects and Battery Energy Storage Systems (BESS).",
    "sec-ev": "EV & Charging Stations",
    "sec-ev-desc": "Electric vehicle assembly, power battery supply chains, and charging infrastructure.",
    "sec-ebike": "E-bike sharing",
    "sec-ebike-desc": "Smart green urban mobility solutions powered by advanced IoT-enabled electric bikes.",
    "sec-drone": "Drone & Industrial Robots",
    "sec-drone-desc": "Industrial unmanned aerial vehicles (UAVs) and robotic automation solutions.",
    "sec-smart-mfg": "Smart Manufacturing",
    "sec-smart-mfg-desc": "Highly automated digital factories, semiconductor production, and advanced electronics.",
    "sec-agri": "High-tech Agriculture",
    "sec-agri-desc": "Precision smart farming, deep food processing, and official premium agriculture exports.",
    "sec-culture": "Tourism & Culture",
    "sec-culture-desc": "Cross-border tourism partnerships, art exchanges, and cultural heritage cooperation.",

    // Opportunities Filters
    "filter-title": "Investment Filters",
    "filter-region": "Region",
    "filter-north": "Northern Vietnam",
    "filter-south": "Southern Vietnam",
    "filter-central": "Central Vietnam",
    "filter-sec-title": "Industry Sectors",
    "filter-electronics": "High-Tech & Electronics",
    "filter-energy": "Renewable Energy & EV",
    "filter-infra": "Industrial Parks",
    "detail-btn": "View Details",
    "direction-btn": "🧭 View directions on Google Maps",
    "apply-matching": "Apply for Investment Matching & Maps",
    "matching-desc": "Your inquiry will be automatically routed to the Regional Investment Promotion Officer who will contact you via WeChat/WhatsApp in 15 minutes.",
    "form-company": "Company Name",
    "form-name": "Full Name of Representative",
    "form-phone": "Contact Mobile Number",
    "form-wechat": "WeChat ID / WhatsApp",
    "form-submit": "Request Connection",

    // Dialog Success Modal
    "success-title": "Registration Successful!",
    "success-desc": "VCEC has logged your profile and assigned a Chinese-speaking investment consultant to contact you directly.",
    "wechat-title": "CONNECT DIRECTLY VIA WECHAT / WHATSAPP",
    "wechat-desc": "Scan the QR code below to connect immediately with our chief officer for your desired region:",
    "success-close": "Close Window",

    // Statistics
    "stat-fdi-title": "China – Vietnam's largest trading partner",
    "stat-kcn-title": "Enterprises successfully connected by VCEC",
    "stat-b2b-title": "Priority cooperation sectors",
    "stat-province-title": "Chinese provinces/cities in VCEC network",

    // Why Choose VCEC
    "why-title": "Why Choose VCEC",
    "why-subtitle": "Your trusted partner for sustainable Vietnam - China investment and trade cooperation",
    "why-card1-title": "Official & Prestigious Standing",
    "why-card1-desc": "VCEC is a dedicated exchange hub with an extensive network of government bodies, associations, and enterprises in both nations.",
    "why-card2-title": "Deep Market Expertise",
    "why-card2-desc": "Bilingual Vietnam-China experts with comprehensive knowledge of legal systems, business culture, trade practices, and FDI policies.",
    "why-card3-title": "Strategic Partner Network",
    "why-card3-desc": "Direct connections to major corporate groups, trade associations, financial institutions, and leading industrial parks in China and Vietnam.",
    "why-card4-title": "Comprehensive One-Stop Service",
    "why-card4-desc": "From market research, matchmaking, and legal advisory to business delegation hosting – all handled by a single dedicated point of contact.",

    // Relations Section (Viet-Trung Relations)
    "rel-title": "Vietnam – China Relations",
    "rel-subtitle": "A strong foundation of political trust, driving bilateral economic cooperation and prosperity",
    "rel-quote-title": "STRATEGIC VISION",
    "rel-quote-body": "“Vietnam – China Comprehensive Strategic Cooperative Partnership & a Community with a Shared Future of Strategic Significance”",
    "rel-quote-sub": "the unshakable foundation for robust bilateral economic integration.",
    "rel-quote-desc": "Political trust at the highest level paves the way for a golden age of investment. High-level consensus accelerates standard-gauge rail connectivity and border trade logistics, creating a highly resilient and optimized cross-border supply chain environment.",
    "rel-cta": "View Vietnam – China Relations Timeline",
    "visit-1-date": "Dec 2023",
    "visit-1-leaders": "General Secretary Nguyen Phu Trong & General Secretary, President Xi Jinping",
    "visit-1-title": "Hanoi Joint Statement 2023",
    "visit-1-result": "Signed 36 cooperation agreements, upgrading relations to a Vietnam – China Community with a Shared Future of strategic significance.",
    "visit-2-date": "Aug 2024",
    "visit-2-leaders": "General Secretary, President To Lam & General Secretary, President Xi Jinping",
    "visit-2-title": "High-Level Talks in Beijing",
    "visit-2-result": "Confirmed acceleration of border standard-gauge railway connections (Lao Cai - Hanoi - Hai Phong, Dong Dang - Hanoi, and Mong Cai - Ha Long - Hai Phong).",
    "visit-3-date": "Oct 2024",
    "visit-3-leaders": "Prime Prime Minister Pham Minh Chinh & Premier Li Qiang",
    "visit-3-title": "Practical Action Cooperation",
    "visit-3-result": "Agreed to expand trade volume, promote official agricultural exports, and resolve border logistics bottlenecks.",

    // Success Stories Section
    "success-stories-title": "Success Stories",
    "success-stories-subtitle": "Representative projects successfully promoted and facilitated by VCEC investment experts",
    "case1-title": "Logistics & Supply Chain – $15M Investment – Hai Phong",
    "case1-desc": "VCEC supported site surveys in Dinh Vu - Cat Hai Economic Zone, advised on investment licensing for smart multimodal warehousing, and resolved customs clearance for cross-border agri-trade.",
    "case1-quote": "“VCEC's highly professional support and deep knowledge of bilateral legal procedures cut our project deployment timeline in Vietnam by 40%.”",
    "case1-author": "Mr. Wang Jun",
    "case1-role": "CEO of Shenzhen Intelligent Warehousing (SWS)",
    "case2-title": "Green Energy & BESS – 50 MW / 100 MWh Capacity – Binh Thuan",
    "case2-desc": "VCEC facilitated the strategic joint venture, advised on the technology transfer agreement for advanced lithium BESS, and drafted international-standard Environmental Impact Assessment (EIA) reports.",
    "case2-quote": "“VCEC is not just a trade broker but a trusted strategic partner that helped both enterprises overcome language barriers and business culture gaps to close this landmark deal.”",
    "case2-author": "Mr. Nguyen Van Hai",
    "case2-role": "Chairman of Song Da Energy Group (SDE)",
    "case3-title": "Smart Manufacturing – $120M Total Capital – Bac Ninh",
    "case3-desc": "VCEC facilitated industrial land acquisition in Que Vo IP, assisted in recruiting high-quality bilingual technicians, and secured corporate income tax incentive packages for this high-tech semiconductor project.",
    "case3-quote": "“With VCEC's comprehensive single-point-of-contact services, we successfully set up our advanced electronics production lines and started operations ahead of schedule.”",
    "case3-author": "Ms. Zhang Wei",
    "case3-role": "FDI Director at Goertek Electronics China",

    // Latest News Section
    "news-latest-title": "Latest News & Events",
    "news-latest-subtitle": "Official updates on VCEC activities, trade policy amendments, and landmark FDI events",
    "group-vcec": "VCEC News",
    "group-policy": "Policy & Trade",
    "group-events": "Upcoming Events",
    "btn-view-all": "View All News",
    "read-more": "Read Article",

    // Quick Support Section
    "support-quick-title": "Quick Support Request",
    "support-quick-subtitle": "Are you a Vietnamese business seeking Chinese partners, or a Chinese investor entering Vietnam? Let VCEC connect you within 48 hours.",
    "form-fullname": "Full Name",
    "form-country": "Country",
    "form-country-vn": "Vietnam",
    "form-country-other": "Other / International",
    "form-sectors": "Sectors of Interest",
    "form-wechat-optional": "Email / Phone / WeChat ID (Optional)",
    "form-content-support": "How can VCEC support you?",
    "form-submit-quick": "Submit Quick Support Request",

    // Bilateral Relation
    "bilateral-title": "Vietnam - China Economic Relations",
    "bilateral-subtitle": "Import-export trade volumes and critical trade milestones over the years",
    "chart-title": "Bilateral Trade Value Chart (Billion USD)",
    "export-label": "Vietnam's exports to China",
    "import-label": "Vietnam's imports from China",

    // About Page
    "about-vision": "Vision & Mission of VCEC",
    "about-vision-desc": "To be the premier, most reliable and effective bilateral bridge connecting Vietnam and China, delivering practical and sustainable value to the trade communities of both nations.",

    // Footer
    "footer-desc": "Official bilateral investment promotion portal and practical B2B matchmaking platform between Vietnam and China.",
    "footer-office": "Representative Offices",
    "footer-hanoi": "Hanoi HQ: VCCI Tower, No. 9 Dao Duy Anh, Dong Da, Hanoi.",
    "footer-shenzhen": "Shenzhen Office: No. 88, Shennan Boulevard, Futian District, Shenzhen, China.",
    "copyright": "© 2026 Vietnam - China Economic Exchange & Cooperation Center (VCEC). All rights reserved.",
    "member-login": "Member Login",
    "member-register": "Quick Register",
    "username": "Username",
    "password": "Password",
    "btn-login": "Log In",
    "btn-register": "Register",
    "no-account": "Don't have an account? Quick register",
    "has-account": "Already have an account? Log in",
    "hello": "Hello",
    "logout": "Log Out",
    "member-status": "Official Member",
    "username-placeholder": "Enter username...",
    "password-placeholder": "Enter password...",
    "select-role": "Your role",
    "role-cn-investor": "Chinese Investor & Enterprise",
    "role-vn-company": "Vietnamese Enterprise",
    "role-department": "Authorities & Associations",
    "role-rnd-media": "Media & Research"
  }
};

// 2. Active Language State Management (Persists across pages via localStorage)
let currentLang = localStorage.getItem("vcec_lang") || "vi";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("vcec_lang", lang);
  
  // Set HTML lang attribute
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  
  // Toggle Chinese font style globally
  if (lang === "zh") {
    document.body.classList.add("lang-zh");
  } else {
    document.body.classList.remove("lang-zh");
  }

  // Translate all marked DOM elements
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      // Check if it's an input or placeholder
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        if (el.placeholder) {
          el.placeholder = translations[lang][key];
        } else {
          el.innerText = translations[lang][key];
        }
      } else {
        // Safe HTML replacement for spanned titles
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Select option translations that might not be caught
  document.querySelectorAll("option[data-i18n]").forEach(opt => {
    const key = opt.getAttribute("data-i18n");
    if (translations[lang][key]) {
      opt.text = translations[lang][key];
    }
  });

  // Update language toggle active buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update nav-home-link tooltip
  const homeLink = document.querySelector(".nav-home-link");
  if (homeLink) {
    homeLink.title = translations[lang]["nav-home"];
  }

  window.dispatchEvent(new CustomEvent('vcec-lang-change', { detail: { lang } }));
}

// 3. Shared Header and Footer Dynamic Renderers (To keep code dry and optimize SEO)
function renderHeader() {
  const header = document.getElementById("global-header");
  if (!header) return;

  // Determine which page is currently active
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  const menuItems = [
    { page: 'index.html', key: 'nav-home' },
    { page: 'gioi-thieu.html', key: 'nav-about' },
    { page: 'quan-he.html', key: 'nav-relations' },
    { page: 'linh-vuc.html', key: 'nav-sectors' },
    { page: 'dich-vu.html', key: 'nav-services' },
    { page: 'co-hoi.html', key: 'nav-opp' },
    { page: 'tin-tuc.html', key: 'nav-news' },
    { page: 'tai-nguyen.html', key: 'nav-resources' },
    { page: 'lien-he.html', key: 'nav-contact' }
  ];

  let menuHtml = '';
  menuItems.forEach(item => {
    const isActive = page === item.page ? 'active' : '';
    if (item.key === 'nav-home') {
      menuHtml += `
        <a href="${item.page}" class="nav-link ${isActive} nav-home-link" title="${translations[currentLang]["nav-home"]}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -3px;">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </a>
      `;
    } else {
      menuHtml += `<a href="${item.page}" class="nav-link ${isActive}" data-i18n="${item.key}">${translations[currentLang][item.key]}</a>`;
    }
  });

  const loggedInUser = localStorage.getItem("vcec_user");
  let memberHtml = '';

  if (loggedInUser) {
    const firstLetter = loggedInUser.charAt(0).toUpperCase();
    memberHtml = `
      <div class="member-container" style="position: relative; display: flex; align-items: center;">
        <!-- Logout Button -->
        <button id="member-header-logout-btn" title="${translations[currentLang]["logout"] || "Đăng xuất"}" style="
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #9CA3AF;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-right: 12px;
          transition: all 0.3s ease;
        " onmouseover="this.style.color='#EF4444'; this.style.borderColor='#EF4444'; this.style.background='rgba(239, 68, 68, 0.1)';" onmouseout="this.style.color='#9CA3AF'; this.style.borderColor='rgba(255,255,255,0.15)'; this.style.background='rgba(255,255,255,0.05)';">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
        
        <div style="position: relative; display: flex; align-items: center;">
          <button class="member-avatar-btn logged-in" id="member-avatar-trigger" title="${translations[currentLang]["hello"] || "Xin chào"} ${loggedInUser}" style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--vcec-red) 0%, var(--vcec-gold) 100%);
            color: #FFFFFF;
            border: 1.5px solid var(--vcec-gold);
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--vcec-transition);
            box-shadow: 0 0 10px rgba(175, 136, 58, 0.3);
          ">
            ${firstLetter}
          </button>
          <span class="member-status-dot active" style="
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            background-color: #10B981;
            border: 2px solid var(--vcec-dark);
            border-radius: 50%;
            box-shadow: 0 0 5px #10B981;
          "></span>
        </div>
      </div>
    `;
  } else {
    memberHtml = `
      <div class="member-container" style="position: relative; display: flex; align-items: center;">
        <button class="member-avatar-btn" id="member-avatar-trigger" title="${translations[currentLang]["member-login"] || "Đăng Nhập"}" style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: #D1D5DB;
          border: 1.5px solid rgba(255,255,255,0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--vcec-transition);
        ">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div>
    `;
  }

  header.className = "header";
  header.innerHTML = `
    <div class="container header-container">
      <a href="index.html" class="logo-link">
        <img src="public/logo_VCEC.jpg" alt="VCEC Logo" class="logo-img" style="height: 40px; width: auto; border-radius: 4px;">
        <div class="logo-text">
          <div class="logo-title">VCEC</div>
          <div class="logo-subtitle" data-i18n="sub-title">${translations[currentLang]["sub-title"]}</div>
        </div>
      </a>
      
      <nav class="nav-menu" id="mobile-nav">
        ${menuHtml}
      </nav>

      <div style="display: flex; align-items: center; gap: 16px;">
        <!-- Dynamic Member Icon -->
        ${memberHtml}

        <div class="lang-switcher">
          <button class="lang-btn ${currentLang === 'vi' ? 'active' : ''}" data-lang="vi">VN</button>
          <button class="lang-btn ${currentLang === 'zh' ? 'active' : ''}" data-lang="zh">CN</button>
          <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>
        
        <button class="mobile-menu-toggle" id="menu-toggle">☰</button>
      </div>
    </div>
  `;

  // Setup Mobile Menu toggle
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      toggleBtn.innerText = mobileNav.classList.contains("active") ? "✕" : "☰";
    });
  }

  // Setup Lang Switcher actions
  header.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selected = e.target.getAttribute("data-lang");
      setLanguage(selected);
    });
  });

  // Setup Member Avatar actions
  const avatarTrigger = header.querySelector("#member-avatar-trigger");
  if (avatarTrigger) {
    avatarTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const user = localStorage.getItem("vcec_user");
      if (user) {
        const role = localStorage.getItem("vcec_role") || "member";
        if (["super_admin", "admin", "staff", "leader"].includes(role)) {
          window.location.href = "quan-tri.html";
        } else {
          window.location.href = "profile.html";
        }
      } else {
        // Open Login/Register Modal
        const modal = document.getElementById("member-modal");
        if (modal) {
          modal.style.display = "flex";
        }
      }
    });
  }

  // Setup Header Logout button
  const headerLogoutBtn = header.querySelector("#member-header-logout-btn");
  if (headerLogoutBtn) {
    headerLogoutBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem("vcec_user");
      localStorage.removeItem("vcec_role");
      location.reload();
    });
  }

  // Setup Member modal
  setupMemberModal();
}

// 3.1. setupMemberModal & auth authentication mechanism
function setupMemberModal() {
  if (document.getElementById("member-modal")) return;

  const modalHtml = `
    <div id="member-modal" class="modal-backdrop" style="display: none;">
      <div class="modal-content" style="max-width: 420px; position: relative;">
        <!-- Close button -->
        <button class="member-modal-close" id="member-modal-close" style="
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--vcec-text-light);
          transition: var(--vcec-transition);
        ">✕</button>

        <h3 class="modal-title" id="member-modal-title" data-i18n="member-login" style="margin-bottom: 24px;">
          ${translations[currentLang]["member-login"]}
        </h3>

        <form id="member-auth-form" onsubmit="handleMemberAuth(event)">
          <div style="margin-bottom: 20px; text-align: left;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--vcec-text-dark); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;" data-i18n="username">${translations[currentLang]["username"]}</label>
            <input type="text" id="member-username-input" class="member-modal-input" required data-i18n="username-placeholder" placeholder="${translations[currentLang]["username-placeholder"]}" style="
              width: 100%;
              height: 50px;
              padding: 0 16px;
              border: 1.5px solid var(--vcec-border);
              border-radius: var(--vcec-border-radius-sm);
              background-color: var(--vcec-light-bg);
              color: var(--vcec-text-dark);
              font-weight: 500;
              transition: var(--vcec-transition);
            ">
          </div>
          <div style="margin-bottom: 24px; text-align: left;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--vcec-text-dark); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;" data-i18n="password">${translations[currentLang]["password"]}</label>
            <input type="password" id="member-password-input" class="member-modal-input" required data-i18n="password-placeholder" placeholder="${translations[currentLang]["password-placeholder"]}" style="
              width: 100%;
              height: 50px;
              padding: 0 16px;
              border: 1.5px solid var(--vcec-border);
              border-radius: var(--vcec-border-radius-sm);
              background-color: var(--vcec-light-bg);
              color: var(--vcec-text-dark);
              font-weight: 500;
              transition: var(--vcec-transition);
            ">
          </div>

          <div id="member-role-group" style="margin-bottom: 24px; text-align: left; display: none;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--vcec-text-dark); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;" data-i18n="select-role">${translations[currentLang]["select-role"]}</label>
            <select id="member-role-input" class="member-modal-input" style="
              width: 100%;
              height: 50px;
              padding: 0 16px;
              border: 1.5px solid var(--vcec-border);
              border-radius: var(--vcec-border-radius-sm);
              background-color: var(--vcec-light-bg);
              color: var(--vcec-text-dark);
              font-weight: 500;
              transition: var(--vcec-transition);
              outline: none;
              cursor: pointer;
              appearance: none;
              background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23AF883A\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E');
              background-repeat: no-repeat;
              background-position: right 16px center;
              background-size: 16px;
              padding-right: 40px;
            ">
              <option value="cn_investor" data-i18n="role-cn-investor">${translations[currentLang]["role-cn-investor"]}</option>
              <option value="vn_company" data-i18n="role-vn-company">${translations[currentLang]["role-vn-company"]}</option>
              <option value="department" data-i18n="role-department">${translations[currentLang]["role-department"]}</option>
              <option value="rnd_media" data-i18n="role-rnd-media">${translations[currentLang]["role-rnd-media"]}</option>
            </select>
          </div>

          <div id="member-modal-error" style="
            color: var(--vcec-red);
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 16px;
            display: none;
            text-align: left;
          "></div>

          <button type="submit" class="btn btn-primary" id="member-auth-submit-btn" style="width: 100%; margin-bottom: 20px;" data-i18n="btn-login">
            ${translations[currentLang]["btn-login"]}
          </button>

          <a href="#" id="member-toggle-mode-link" data-i18n="no-account" style="
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--vcec-gold);
            display: inline-block;
            transition: var(--vcec-transition);
          ">
            ${translations[currentLang]["no-account"]}
          </a>
        </form>
      </div>
    </div>
  `;

  const div = document.createElement("div");
  div.innerHTML = modalHtml;
  document.body.appendChild(div.firstElementChild);

  // Bind close event
  document.getElementById("member-modal-close").addEventListener("click", () => {
    document.getElementById("member-modal").style.display = "none";
  });

  // Bind click outside to close
  document.getElementById("member-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("member-modal")) {
      document.getElementById("member-modal").style.display = "none";
    }
  });

  // Hover style for close button
  const closeBtn = document.getElementById("member-modal-close");
  closeBtn.addEventListener("mouseover", () => { closeBtn.style.color = "var(--vcec-red)"; });
  closeBtn.addEventListener("mouseout", () => { closeBtn.style.color = "var(--vcec-text-light)"; });

  // Mode toggler (Login vs Register)
  let authMode = "login"; // "login" or "register"
  const toggleLink = document.getElementById("member-toggle-mode-link");
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("member-modal-title");
    const submitBtn = document.getElementById("member-auth-submit-btn");
    const errorEl = document.getElementById("member-modal-error");
    const roleGroup = document.getElementById("member-role-group");
    
    errorEl.style.display = "none";
    
    if (authMode === "login") {
      authMode = "register";
      titleEl.setAttribute("data-i18n", "member-register");
      titleEl.innerHTML = translations[currentLang]["member-register"];
      
      submitBtn.setAttribute("data-i18n", "btn-register");
      submitBtn.innerHTML = translations[currentLang]["btn-register"];
      
      toggleLink.setAttribute("data-i18n", "has-account");
      toggleLink.innerHTML = translations[currentLang]["has-account"];
      
      if (roleGroup) roleGroup.style.display = "block";
    } else {
      authMode = "login";
      titleEl.setAttribute("data-i18n", "member-login");
      titleEl.innerHTML = translations[currentLang]["member-login"];
      
      submitBtn.setAttribute("data-i18n", "btn-login");
      submitBtn.innerHTML = translations[currentLang]["btn-login"];
      
      toggleLink.setAttribute("data-i18n", "no-account");
      toggleLink.innerHTML = translations[currentLang]["no-account"];
      
      if (roleGroup) roleGroup.style.display = "none";
    }
  });
}

async function handleMemberAuth(event) {
  event.preventDefault();
  
  const usernameInput = document.getElementById("member-username-input");
  const passwordInput = document.getElementById("member-password-input");
  const errorEl = document.getElementById("member-modal-error");
  const submitBtn = document.getElementById("member-auth-submit-btn");
  
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  
  if (!username || !password) return;
  if (!supabaseClient) {
    errorEl.innerHTML = currentLang === "vi" 
      ? "Hệ thống đang kết nối cơ sở dữ liệu, vui lòng thử lại sau vài giây!" 
      : (currentLang === "zh" ? "正在连接云端数据库，请稍等！" : "Connecting to database, please wait a few seconds!");
    errorEl.style.display = "block";
    return;
  }
  
  const titleEl = document.getElementById("member-modal-title");
  const isRegister = titleEl.getAttribute("data-i18n") === "member-register";
  
  // Disable button and show loading state
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = currentLang === "vi" ? "Đang xử lý..." : (currentLang === "zh" ? "正在处理..." : "Processing...");
  
  try {
    if (isRegister) {
      // 1. Check if username already exists in Supabase
      const { data: existingUser, error: selectError } = await supabaseClient
        .from('vcec_users')
        .select('username')
        .eq('username', username.toLowerCase());
        
      if (selectError) throw selectError;
      
      if (existingUser && existingUser.length > 0) {
        errorEl.innerHTML = currentLang === "vi" 
          ? "Tên đăng nhập đã tồn tại!" 
          : (currentLang === "zh" ? "用户名已存在！" : "Username already exists!");
        errorEl.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }
      
      // 2. Register user in Supabase
      const roleVal = document.getElementById("member-role-input").value;
      const { error: insertError } = await supabaseClient
        .from('vcec_users')
        .insert([
          { username: username.toLowerCase(), password: password, role: roleVal }
        ]);
        
      if (insertError) throw insertError;
      
      localStorage.setItem("vcec_user", username);
      
      alert(currentLang === "vi" 
        ? `Đăng ký thành công! Chào mừng thành viên ${username}.` 
        : (currentLang === "zh" ? `注册成功！欢迎会员 ${username}。` : `Registration successful! Welcome member ${username}.`));
        
      document.getElementById("member-modal").style.display = "none";
      location.reload();
    } else {
      // 1. Authenticate user against Supabase table
      const { data: userObj, error: authError } = await supabaseClient
        .from('vcec_users')
        .select('*')
        .eq('username', username.toLowerCase())
        .eq('password', password);
        
      if (authError) throw authError;
      
      if (!userObj || userObj.length === 0) {
        errorEl.innerHTML = currentLang === "vi" 
          ? "Sai tên đăng nhập hoặc mật khẩu!" 
          : (currentLang === "zh" ? "用户名或密码错误！" : "Incorrect username or password!");
        errorEl.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }
      
      localStorage.setItem("vcec_user", userObj[0].username);
      localStorage.setItem("vcec_role", userObj[0].role || 'member');
      
      document.getElementById("member-modal").style.display = "none";
      if (userObj[0].role === 'super_admin') {
        window.location.href = "quan-tri.html";
      } else {
        location.reload();
      }
    }
  } catch (err) {
    console.error("Supabase Error:", err);
    errorEl.innerHTML = currentLang === "vi" 
      ? "Lỗi kết nối đám mây: " + (err.message || "Không phản hồi")
      : (currentLang === "zh" ? "云端连接错误：" + (err.message || "无响应") : "Cloud connection error: " + (err.message || "No response"));
    errorEl.style.display = "block";
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

function renderFooter() {
  const footer = document.getElementById("global-footer");
  if (!footer) return;

  const l = currentLang;
  const isZh = l === "zh";
  const isEn = l === "en";

  // Multi-language strings for footer
  const titleVcec = isZh ? "越中经济合作与交流中心 (VCEC)" : (isEn ? "Vietnam-China Economic Cooperation & Exchange Center (VCEC)" : "Trung Tâm Giao Lưu & Hợp Tác Kinh Tế Việt Nam - Trung Quốc (VCEC)");
  const slogan = isZh ? "连接越中企业，共创合作未来。" : (isEn ? "Connecting Vietnam-China businesses, building a shared prosperous future." : "Kết nối doanh nghiệp Việt – Trung. Kiến tạo tương lai cùng phát triển.");
  
  const addrHanoi = isZh ? "<strong>河内总部：</strong> 河内市陶维英路9号 VCCI大厦" : (isEn ? "<strong>Hanoi HQ:</strong> VCCI Tower, 9 Dao Duy Anh, Dong Da, Hanoi" : "<strong>Trụ sở Hà Nội:</strong> Tòa tháp VCCI, số 9 Đào Duy Anh, Đống Đa, Hà Nội");
  const addrShenzhen = isZh ? "<strong>深圳分部：</strong> 深圳市福田区深南大道88号" : (isEn ? "<strong>Shenzhen:</strong> 88 Shennan Avenue, Futian District, Shenzhen" : "<strong>VP Thâm Quyến:</strong> Số 88 Đại lộ Shennan, Quận Futian, Thâm Quyến");
  
  const titleLinks = isZh ? "快速链接" : (isEn ? "Quick Links" : "Liên Kết Nhanh");
  const linkIntro = isZh ? "关于我们" : (isEn ? "About Us" : "Giới thiệu");
  const linkSectors = isZh ? "合作领域" : (isEn ? "Sectors" : "Lĩnh vực");
  const linkOpp = isZh ? "投资机会" : (isEn ? "Opportunities" : "Cơ hội đầu tư");
  const linkNews = isZh ? "最新资讯" : (isEn ? "Latest News" : "Tin tức");
  const linkContact = isZh ? "联系我们" : (isEn ? "Contact" : "Liên hệ");

  const titlePartners = isZh ? "战略合作伙伴" : (isEn ? "Strategic Partners" : "Đối Tác Chiến Lược");
  const partner1 = isZh ? "365集团 (365 Group)" : (isEn ? "365 Group" : "Tập đoàn 365 (365 Group)");
  const partner2 = isZh ? "VIENC - 越中经济专家协会" : (isEn ? "VIENC - Vietnam-China Economists" : "VIENC - Hiệp hội Chuyên gia Kinh tế");
  const partner3 = isZh ? "越中企业联合会" : (isEn ? "Vietnam-China Business Association" : "Hiệp hội Doanh nghiệp Việt - Trung");
  const partner4 = isZh ? "中国工商银行 & 越南工商银行" : (isEn ? "Partner Banks (ICBC, VietinBank)" : "Ngân hàng đối tác (ICBC, VietinBank)");

  const titleNewsletter = isZh ? "订阅电子报" : (isEn ? "Subscribe Newsletter" : "Đăng Ký Nhận Bản Tin");
  const descNewsletter = isZh ? "订阅以接收最新的中越投资分析报告与贸易政策调整动态。" : (isEn ? "Subscribe to receive quarterly FDI market analysis and policy updates." : "Nhận các báo cáo phân tích thị trường FDI và cập nhật chính sách thương mại mới nhất.");
  const btnNewsletter = isZh ? "订阅" : (isEn ? "Subscribe" : "Đăng ký");

  const bottomCopyright = "© 2025 Vietnam-China Economic Cooperation & Exchange Center";
  const privacyTxt = isZh ? "隐私政策" : (isEn ? "Privacy Policy" : "Chính sách bảo mật");
  const termsTxt = isZh ? "使用条款" : (isEn ? "Terms of Use" : "Điều khoản sử dụng");
  const sitemapTxt = isZh ? "网站地图" : (isEn ? "Sitemap" : "Sơ đồ trang web");

  footer.className = "footer";
  footer.innerHTML = `
    <div class="container footer-grid">
      <!-- Column 1: Info VCEC -->
      <div class="footer-col-info">
        <div class="footer-brand-title">
          <img src="public/logo_VCEC.jpg" alt="VCEC Logo" class="footer-logo-img">
          <h3 class="footer-brand-h3">${titleVcec}</h3>
        </div>
        <p class="footer-slogan">"${slogan}"</p>
        <div class="footer-contact-details">
          <p>${addrHanoi}</p>
          <p>${addrShenzhen}</p>
          <p><strong>Hotline:</strong> +84 (0) 24 3823 8888 | +86 (0) 755 8288 8888</p>
          <p><strong>Email:</strong> contact@vcec.vn</p>
        </div>
        <div class="footer-social-icons">
          <a href="https://facebook.com/vcec.vn" class="social-btn" target="_blank" title="Facebook">FB</a>
          <a href="https://linkedin.com/company/vcec" class="social-btn" target="_blank" title="LinkedIn">LN</a>
          <a href="javascript:void(0)" class="social-btn tooltip-trigger" title="WeChat ID: VCEC_XuctienFDI_01">
            WX
            <span class="tooltip-box">WeChat ID: VCEC_XuctienFDI_01</span>
          </a>
          <a href="https://zalo.me/vcec" class="social-btn" target="_blank" title="Zalo OA">ZL</a>
          <a href="https://youtube.com/c/vcec" class="social-btn" target="_blank" title="YouTube">YT</a>
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div>
        <h3 class="footer-col-title">${titleLinks}</h3>
        <ul class="footer-links">
          <li><a href="gioi-thieu.html">${linkIntro}</a></li>
          <li><a href="linh-vuc.html">${linkSectors}</a></li>
          <li><a href="co-hoi.html">${linkOpp}</a></li>
          <li><a href="tin-tuc.html">${linkNews}</a></li>
          <li><a href="lien-he.html">${linkContact}</a></li>
        </ul>
      </div>

      <!-- Column 3: Strategic Partners -->
      <div>
        <h3 class="footer-col-title">${titlePartners}</h3>
        <ul class="footer-links partners-list">
          <li>🏢 ${partner1}</li>
          <li>🎓 ${partner2}</li>
          <li>🤝 ${partner3}</li>
          <li>🏦 ${partner4}</li>
        </ul>
      </div>

      <!-- Column 4: Newsletter -->
      <div>
        <h3 class="footer-col-title">${titleNewsletter}</h3>
        <p class="footer-newsletter-desc">${descNewsletter}</p>
        <form class="footer-newsletter-form" onsubmit="handleNewsletterSubmit(event)">
          <input type="email" class="input-newsletter" placeholder="yourname@domain.com" required>
          <button type="submit" class="btn-newsletter">${btnNewsletter}</button>
        </form>
      </div>
    </div>

    <!-- Bottom Footer Links & Copyright -->
    <div class="container footer-bottom">
      <div>${bottomCopyright}</div>
      <div class="footer-bottom-links">
        <a href="javascript:void(0)">${privacyTxt}</a>
        <a href="javascript:void(0)">${termsTxt}</a>
        <a href="javascript:void(0)">${sitemapTxt}</a>
      </div>
    </div>
  `;
}

// Global Newsletter Submission Handler
async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input[type='email']");
  const btn = form.querySelector("button[type='submit']");
  if (!input || !btn) return;
  
  const email = input.value.trim();
  const originalText = btn.innerHTML;
  
  btn.disabled = true;
  btn.innerHTML = currentLang === "vi" ? "Đang xử lý..." : (currentLang === "zh" ? "正在处理..." : "Processing...");
  
  if (window.supabaseClient) {
    try {
      const { error } = await window.supabaseClient
        .from('vcec_leads')
        .insert([
          {
            company_name: 'Đăng ký nhận bản tin (Newsletter Subscriber)',
            contact_name: 'Email Subscriber',
            wechat_id: 'Newsletter',
            project_id: 'newsletter-signup',
            project_name: `[Email: ${email}]`
          }
        ]);
      if (error) throw error;
    } catch (err) {
      console.error("Error saving subscriber to Supabase:", err);
    }
  }
  
  // Show a beautiful luxury alert message
  const successMsg = currentLang === "vi" 
    ? "🎉 Đăng ký nhận bản tin thành công! Cảm ơn quý khách."
    : (currentLang === "zh" ? "🎉 订阅成功！感谢您的关注。" : "🎉 Newsletter subscribed successfully! Thank you.");
  alert(successMsg);
  
  btn.disabled = false;
  btn.innerHTML = originalText;
  form.reset();
}

window.handleNewsletterSubmit = handleNewsletterSubmit;

// 4. Mock FDI Project Database (Matches 8 priority sectors & North/South regions)
const projectDatabase = [
  {
    id: "deepc",
    nameVi: "Khu Công Nghiệp Deep C Hải Phòng",
    nameZh: "Deep C 工业园区 (海防市)",
    nameEn: "Deep C Industrial Park (Hai Phong)",
    region: "north",
    sector: "logistics",
    provinceVi: "Hải Phòng",
    provinceZh: "海防市",
    provinceEn: "Hai Phong",
    landSize: "85 ha",
    rentPrice: "140 USD/m²",
    lat: 20.8038,
    lng: 106.7725,
    tag: "Chuỗi cung ứng",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=500&q=80",
    powerGridVi: "Trạm biến áp 110/22kV, cấp điện ổn định 24/7.",
    powerGridZh: "配置110/22kV专属变电站，全天候不间断供电。",
    powerGridEn: "110/22kV substation, stable power supply 24/7.",
    taxVi: "Miễn 2 năm, giảm 50% thuế TNDN trong 4 năm tiếp theo.",
    taxZh: "享受企业所得税 2 免 4 减半优惠政策。",
    taxEn: "2 years tax holiday, 50% CIT reduction for next 4 years."
  },
  {
    id: "vsip_bacninh",
    nameVi: "Khu Công Nghiệp VSIP Bắc Ninh II",
    nameZh: "VSIP 北宁第二工业园",
    nameEn: "VSIP Bac Ninh II Industrial Park",
    region: "north",
    sector: "smart-mfg",
    provinceVi: "Bắc Ninh",
    provinceZh: "北宁省",
    provinceEn: "Bac Ninh",
    landSize: "120 ha",
    rentPrice: "165 USD/m²",
    lat: 21.1442,
    lng: 106.0963,
    tag: "Smart Manufacturing",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
    powerGridVi: "Hệ thống điện ngầm 22kV kết hợp viễn thông băng thông rộng.",
    powerGridZh: "地下排管铺设22kV电网，高速宽带光纤接入。",
    powerGridEn: "Underground 22kV power cables with high-speed fiber internet.",
    taxVi: "Áp dụng thuế suất đặc biệt ưu đãi cho doanh nghiệp sản xuất thông minh.",
    taxZh: "针对国家鼓励类智能制造产业，适用最优惠所得税率。",
    taxEn: "Special incentive tax rates applicable for Smart Manufacturing enterprises."
  },
  {
    id: "nhon_trach",
    nameVi: "Khu Công Nghiệp Nhơn Trạch VI (Đồng Nai)",
    nameZh: "仁泽第六工业园区 (同奈省)",
    nameEn: "Nhon Trach VI Industrial Park (Dong Nai)",
    region: "south",
    sector: "logistics",
    provinceVi: "Đồng Nai",
    provinceZh: "同奈省",
    provinceEn: "Dong Nai",
    landSize: "200 ha",
    rentPrice: "115 USD/m²",
    lat: 10.7412,
    lng: 106.9245,
    tag: "Logistics Hub",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=500&q=80",
    powerGridVi: "Trạm cấp nước sạch 20.000m3/ngày đêm, xử lý nước thải chuẩn A.",
    powerGridZh: "日供水力2万立方米，污水处理系统达到国家A级标准。",
    powerGridEn: "Water supply 20,000m3/day, wastewater treatment Standard A.",
    taxVi: "Ưu đãi miễn thuế nhập khẩu máy móc tạo tài sản cố định.",
    taxZh: "免征用于构成固定资产的进口设备关税。",
    taxEn: "Import duty exemption for machinery forming fixed assets."
  },
  {
    id: "bình_duong_vsip",
    nameVi: "Khu Công Nghiệp VSIP III Bình Dương",
    nameZh: "VSIP 第三新加坡工业园 (平阳省)",
    nameEn: "VSIP III Binh Duong Industrial Park",
    region: "south",
    sector: "energy",
    provinceVi: "Bình Dương",
    provinceZh: "平阳省",
    provinceEn: "Binh Duong",
    landSize: "150 ha",
    rentPrice: "180 USD/m²",
    lat: 11.1114,
    lng: 106.7456,
    tag: "Green Energy & BESS",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=500&q=80",
    powerGridVi: "Sử dụng lưới điện thông minh tích hợp điện mặt trời mái nhà.",
    powerGridZh: "配备智能电网，深度整合屋顶分布式光伏发电。",
    powerGridEn: "Equipped with smart power grid integrating solar rooftop energy.",
    taxVi: "Ưu đãi thuế thu nhập đặc biệt cho dự án sản xuất linh kiện năng lượng sạch.",
    taxZh: "针对新能源及电池储能系统项目，给予长达15年的特别税收优惠政策。",
    taxEn: "Special income tax exemptions for Green Energy supply chains."
  }
];

// 5. App Initialization & Page Logic Orchestration
document.addEventListener("DOMContentLoaded", () => {
  // Initial Language Sync
  setLanguage(currentLang);
  renderHeader();
  renderFooter();
  applyCustomSiteConfig();

  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // 5.1. Page-Specific Logic: Home Page Hero Search Widget Handler
  if (page === 'index.html') {
    const searchForm = document.getElementById("hero-search-form");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const province = document.getElementById("search-province").value;
        const sector = document.getElementById("search-sector").value;
        const size = document.getElementById("search-size").value;
        
        // Redirect to co-hoi.html with search queries
        window.location.href = `co-hoi.html?province=${province}&sector=${sector}&size=${size}`;
      });
    }
  }

  // 5.2. Page-Specific Logic: Investment Opportunities Filtering & Free Map Pinning
  if (page === 'co-hoi.html') {
    const projectListContainer = document.getElementById("project-list");
    const detailContainer = document.getElementById("dynamic-detail");

    // Retrieve search terms from URL
    const params = new URLSearchParams(window.location.search);
    const searchProvince = params.get("province") || "";
    const searchSector = params.get("sector") || "";

    function renderProjects() {
      if (!projectListContainer) return;
      
      // Get selected filters
      const selectedRegions = Array.from(document.querySelectorAll(".region-filter:checked")).map(cb => cb.value);
      const selectedSectors = Array.from(document.querySelectorAll(".sector-filter:checked")).map(cb => cb.value);

      // Filter logic
      const filtered = projectDatabase.filter(project => {
        // If query parameters exist in URL, apply them
        if (searchProvince && project.id !== "deepc" && project.provinceVi !== "Bắc Ninh") {
          // simple search match helper
          return false;
        }
        if (searchSector && project.sector !== searchSector) {
          return false;
        }

        // Apply sidebar checkboxes if checked
        const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(project.region);
        const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(project.sector);
        return matchesRegion && matchesSector;
      });

      // HTML Render
      if (filtered.length === 0) {
        projectListContainer.innerHTML = `<p style="padding:40px; font-weight:bold; text-align:center;">No matching projects found. / 没有找到匹配的机会。</p>`;
        return;
      }

      projectListContainer.innerHTML = filtered.map(project => {
        const name = currentLang === "zh" ? project.nameZh : (currentLang === "en" ? project.nameEn : project.nameVi);
        const province = currentLang === "zh" ? project.provinceZh : (currentLang === "en" ? project.provinceEn : project.provinceVi);
        
        return `
          <div class="project-card">
            <div class="project-img-container">
              <img src="${project.img}" class="project-img" alt="${name}">
              <span class="project-tag">${project.tag}</span>
            </div>
            <div class="project-info">
              <span class="project-location">📍 ${province}</span>
              <h4 class="project-card-title">${name}</h4>
              <div class="project-specs">
                <div class="spec-val-block">
                  <span class="spec-lbl" data-i18n="lbl-size">Quỹ Đất</span>
                  <span class="spec-val">${project.landSize}</span>
                </div>
                <div class="spec-val-block">
                  <span class="spec-lbl">Giá Tham Khảo</span>
                  <span class="spec-val" style="color:var(--vcec-red);">${project.rentPrice}</span>
                </div>
              </div>
              <button class="btn btn-primary detail-trigger" data-id="${project.id}" style="margin-top:10px;" data-i18n="detail-btn">
                ${translations[currentLang]["detail-btn"]}
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Add click handlers on detail-trigger buttons (Click 2)
      document.querySelectorAll(".detail-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          showProjectDetails(id);
        });
      });
    }

    function showProjectDetails(id) {
      if (!detailContainer) return;
      const project = projectDatabase.find(p => p.id === id);
      if (!project) return;

      const name = currentLang === "zh" ? project.nameZh : (currentLang === "en" ? project.nameEn : project.nameVi);
      const province = currentLang === "zh" ? project.provinceZh : (currentLang === "en" ? project.provinceEn : project.provinceVi);
      const powerGrid = currentLang === "zh" ? project.powerGridZh : (currentLang === "en" ? project.powerGridEn : project.powerGridVi);
      const tax = currentLang === "zh" ? project.taxZh : (currentLang === "en" ? project.taxEn : project.taxVi);

      // Render details page dynamically
      detailContainer.innerHTML = `
        <div class="project-detail-layout" style="animation: modalIn 0.4s ease-out;">
          <div>
            <div class="detail-block">
              <h2 style="font-size:1.8rem; margin-bottom:8px; color:var(--vcec-red);">${name}</h2>
              <p style="font-weight:600; color:var(--vcec-gold); margin-bottom:20px;">📍 ${province}, Việt Nam</p>
              
              <!-- Free Google Maps coordinate pinning integration -->
              <h3 style="font-size:1.15rem; font-family:var(--vcec-font-title); margin-bottom:12px;">🗺️ Định vị thực tế (Vĩ độ: ${project.lat}, Kinh độ: ${project.lng})</h3>
              <div style="width:100%; border-radius:12px; overflow:hidden; border:1px solid var(--vcec-gold-border); margin-bottom:16px;">
                <iframe 
                  src="https://maps.google.com/maps?q=${project.lat},${project.lng}&z=14&output=embed" 
                  width="100%" 
                  height="380" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              
              <!-- Standard Direct Link for Directions -->
              <a href="https://www.google.com/maps/dir/?api=1&destination=${project.lat},${project.lng}" target="_blank" class="btn btn-primary" style="gap:8px;">
                🧭 Tra cứu đường đi trên Google Maps
              </a>
            </div>

            <div class="detail-block">
              <h3 data-i18n="sectors-title">Hạ Tầng Kỹ Thuật & Ưu Đãi Đầu Tư</h3>
              <table class="detail-table">
                <tr>
                  <td class="lbl">Hệ thống cấp điện</td>
                  <td>${powerGrid}</td>
                </tr>
                <tr>
                  <td class="lbl">Ưu đãi Thuế quan</td>
                  <td style="color:var(--vcec-red); font-weight:600;">${tax}</td>
                </tr>
                <tr>
                  <td class="lbl">Diện tích đất trống hiện hữu</td>
                  <td>${project.landSize}</td>
                </tr>
                <tr>
                  <td class="lbl">Đơn giá thuê đất tham chiếu</td>
                  <td style="font-weight:700; color:var(--vcec-gold);">${project.rentPrice}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Sticky Lead Capturing form (Click 3) -->
          <div>
            <div class="sticky-lead-form">
              <h3 data-i18n="apply-matching">${translations[currentLang]["apply-matching"]}</h3>
              <p data-i18n="matching-desc">${translations[currentLang]["matching-desc"]}</p>
              
              <form id="lead-submit-form" data-project-id="${project.id}" data-project-name="${name}" onsubmit="handleLeadSubmit(event)">
                <div class="form-group" style="margin-bottom:16px;">
                  <label data-i18n="form-company">${translations[currentLang]["form-company"]}</label>
                  <input type="text" id="lead-company" class="form-input" required placeholder="Ví dụ: Huawei Technologies Co., Ltd">
                </div>
                <div class="form-group" style="margin-bottom:16px;">
                  <label data-i18n="form-name">${translations[currentLang]["form-name"]}</label>
                  <input type="text" id="lead-name" class="form-input" required placeholder="Nguyễn Văn A / 张伟">
                </div>
                <div class="form-group" style="margin-bottom:16px;">
                  <label data-i18n="form-wechat">${translations[currentLang]["form-wechat"]}</label>
                  <input type="text" id="lead-wechat" class="form-input" required placeholder="WeChat ID / WhatsApp Number">
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;" data-i18n="form-submit">
                  ${translations[currentLang]["form-submit"]}
                </button>
              </form>
            </div>
          </div>
        </div>
      `;

      // Scroll to detail container smoothly
      detailContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Register filters listener
    document.querySelectorAll(".region-filter, .sector-filter").forEach(input => {
      input.addEventListener("change", renderProjects);
    });

    // Initial render
    renderProjects();
    
    // Default open first project details to keep page filled and beautiful
    showProjectDetails("deepc");
  }
});

// 6. Lead Capture Form Successful State pop-up Handler (Click 3 Success Modal)
async function handleLeadSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const projectId = form.getAttribute("data-project-id");
  const projectName = form.getAttribute("data-project-name");
  
  const companyInput = document.getElementById("lead-company");
  const nameInput = document.getElementById("lead-name");
  const wechatInput = document.getElementById("lead-wechat");
  const submitBtn = form.querySelector("button[type='submit']");
  
  if (!companyInput || !nameInput || !wechatInput) return;
  
  const companyName = companyInput.value.trim();
  const contactName = nameInput.value.trim();
  const wechatId = wechatInput.value.trim();
  
  const originalText = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = currentLang === "vi" ? "Đang xử lý..." : (currentLang === "zh" ? "正在处理..." : "Processing...");
  }
  
  // Save to Supabase
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('vcec_leads')
        .insert([
          {
            company_name: companyName,
            contact_name: contactName,
            wechat_id: wechatId,
            project_id: projectId,
            project_name: projectName
          }
        ]);
      if (error) throw error;
    } catch (err) {
      console.error("Error saving lead to Supabase:", err);
    }
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }

  const modal = document.getElementById("success-modal");
  if (!modal) return;

  // Show WeChat pop-up (assigned VCEC executive)
  modal.style.display = "flex";
  
  // Reset form
  form.reset();
}

function closeModal() {
  const modal = document.getElementById("success-modal");
  if (!modal) return;
  modal.style.display = "none";
}

// 7. Dynamic Site Configurations (Logo and Hero Banner overrides)
function applyCustomSiteConfig() {
  const storedConfig = localStorage.getItem("vcec_site_config");
  if (!storedConfig) return;
  try {
    const cfg = JSON.parse(storedConfig);
    
    // 7.1 Override Website Logo (if configured) and Browser Favicon (Tab Icon)
    if (cfg.logoUrl && cfg.logoUrl.trim()) {
      const trimmedLogo = cfg.logoUrl.trim();
      const logoIcons = document.querySelectorAll(".logo-icon");
      logoIcons.forEach(logoIcon => {
        logoIcon.style.background = "none";
        logoIcon.style.border = "none";
        logoIcon.style.boxShadow = "none";
        logoIcon.innerHTML = `<img src="${trimmedLogo}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">`;
      });

      // Update Browser Favicon
      let favLinks = document.querySelectorAll("link[rel*='icon']");
      if (favLinks.length === 0) {
        const linkShortcut = document.createElement("link");
        linkShortcut.rel = "shortcut icon";
        linkShortcut.href = trimmedLogo;
        document.head.appendChild(linkShortcut);

        const linkIcon = document.createElement("link");
        linkIcon.rel = "icon";
        linkIcon.type = "image/png";
        linkIcon.href = trimmedLogo;
        document.head.appendChild(linkIcon);
      } else {
        favLinks.forEach(link => {
          link.href = trimmedLogo;
        });
      }
    }

    // 7.2 Override Hero Banner Image (if configured)
    if (cfg.heroUrl && cfg.heroUrl.trim()) {
      const heroEl = document.querySelector(".hero");
      if (heroEl) {
        heroEl.style.backgroundImage = `linear-gradient(135deg, rgba(9, 13, 26, 0.92) 0%, rgba(9, 13, 26, 0.75) 100%), url('${cfg.heroUrl.trim()}')`;
      }
    }
  } catch (e) {
    console.error("Error applying site configuration:", e);
  }
}

// ─────────────────────────────────────────────
// CMS Page Post Helper
// Fetches the most recently updated published post for a given category
// and injects it into the page as a styled content zone.
// Usage: vcecPagePost({ category: 'gioi-thieu', target: '#cms-zone' })
// ─────────────────────────────────────────────
window.vcecPagePost = async function({ category, target, coverTarget, titleTarget, summaryTarget } = {}) {
  const waitForClient = () => new Promise(resolve => {
    if (window.supabaseClient) { resolve(window.supabaseClient); return; }
    window.addEventListener('supabase-ready', () => resolve(window.supabaseClient), { once: true });
  });

  try {
    const client = await waitForClient();
    const { data, error } = await client
      .from('vcec_posts')
      .select('id, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, content_vi, content_zh, content_en, cover_image')
      .eq('category', category)
      .eq('status', 'published')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;

    const lang = localStorage.getItem('vcec_lang') || 'vi';
    const tf = (f) => data[`${f}_${lang}`] || data[`${f}_vi`] || '';

    // Update cover image
    if (coverTarget && data.cover_image) {
      const el = document.querySelector(coverTarget);
      if (el) {
        if (el.tagName === 'IMG') el.src = data.cover_image;
        else el.style.backgroundImage = `url('${data.cover_image}')`;
      }
    }

    // Update title
    if (titleTarget && tf('title')) {
      const el = document.querySelector(titleTarget);
      if (el) el.textContent = tf('title');
    }

    // Update summary/subtitle
    if (summaryTarget && tf('summary')) {
      const el = document.querySelector(summaryTarget);
      if (el) el.textContent = tf('summary');
    }

    // Inject full rich-text content zone
    if (target && tf('content')) {
      const zone = document.querySelector(target);
      if (zone) {
        zone.innerHTML = tf('content');
        zone.classList.add('cms-content-loaded');
      }
    }

    return data;
  } catch (e) {
    console.warn('[vcecPagePost] Error:', e);
    return null;
  }
};

// Fetch multiple posts for a category (used by linh-vuc, etc.)
window.vcecPagePosts = async function(category, limit = 20) {
  const waitForClient = () => new Promise(resolve => {
    if (window.supabaseClient) { resolve(window.supabaseClient); return; }
    window.addEventListener('supabase-ready', () => resolve(window.supabaseClient), { once: true });
  });
  try {
    const client = await waitForClient();
    const { data, error } = await client
      .from('vcec_posts')
      .select('id, title_vi, title_zh, title_en, summary_vi, summary_zh, summary_en, cover_image')
      .eq('category', category)
      .eq('status', 'published')
      .order('updated_at', { ascending: false })
      .limit(limit);
    if (error) return null;
    return data;
  } catch (e) {
    console.warn('[vcecPagePosts] Error:', e);
    return null;
  }
};
