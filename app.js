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
    "sub-title": "ĐẦU TƯ SONG PHƯƠNG",

    // Hero Section
    "hero-title": "Cổng Kết Nối Đầu Tư <span>Chính Danh & Thực Chiến</span> Việt - Trung",
    "hero-desc": "Trung tâm Giao lưu và Hợp tác Kinh tế Việt Nam – Trung Quốc (VCEC) hỗ trợ đắc lực doanh nghiệp FDI khảo sát thực địa, giải quyết thủ tục pháp lý và kết nối B2B thành công.",
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
    "sec-electronics": "Công nghệ cao & Điện tử",
    "sec-electronics-desc": "Sản xuất chất bán dẫn, vi mạch điện tử, lắp ráp thiết bị công nghệ cao.",
    "sec-energy": "Năng lượng tái tạo & Xe điện (EV)",
    "sec-energy-desc": "Hạ tầng pin mặt trời, chuỗi cung ứng pin và lắp ráp xe điện thông minh.",
    "sec-logistics": "Logistics & Chuỗi cung ứng",
    "sec-logistics-desc": "Vận tải đa phương thức, trung tâm kho bãi thông minh xuyên biên giới.",
    "sec-infra": "Hạ tầng Khu công nghiệp",
    "sec-infra-desc": "Đất công nghiệp bàn giao ngay, nhà xưởng xây sẵn chất lượng cao.",
    "sec-agri": "Nông nghiệp công nghệ cao",
    "sec-agri-desc": "Công nghệ chế biến sâu, xuất khẩu nông sản chính ngạch sang Trung Quốc.",
    "sec-textile": "Dệt may & Công nghiệp phụ trợ",
    "sec-textile-desc": "Sản xuất nguyên phụ liệu xanh, tự động hóa chuỗi cung ứng dệt may.",
    "sec-digital": "Kinh tế số & TMĐT song phương",
    "sec-digital-desc": "Cửa khẩu thông minh, kho ngoại quan, TMĐT xuyên biên giới.",
    "sec-medical": "Y tế & Thiết bị Y tế",
    "sec-medical-desc": "Hợp tác chuyển giao công nghệ dược phẩm, phân phối thiết bị y khoa.",

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
    "stat-fdi-title": "VỐN FDI ĐÃ KẾT NỐI",
    "stat-kcn-title": "KHU CÔNG NGHIỆP LIÊN KẾT",
    "stat-b2b-title": "DOANH NGHIỆP ĐÃ ĐỐI CHIẾU",
    "stat-province-title": "TỈNH THÀNH ĐỒNG HÀNH",

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
    "password-placeholder": "Nhập mật khẩu..."
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
    "sub-title": "越中双向投资促进门户网站",

    // Hero Section
    "hero-title": "越中<span>官方正名与实战化</span>投资连接门户",
    "hero-desc": "越南-中国经济交流与合作中心 (VCEC) 致力于全方位协助外资企业进行实地考察、解决投资法律程序并实现成功的 B2B 对接。",
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
    "sec-electronics": "高新技术与电子",
    "sec-electronics-desc": "半导体制造、电子芯片微电路研发、高新科技设备组装生产线。",
    "sec-energy": "新能源与电动汽车 (EV)",
    "sec-energy-desc": "太阳能电池板配套、先进电池供应链及智能电动车组装基地。",
    "sec-logistics": "现代物流与供应链",
    "sec-logistics-desc": "多式联运建设、跨境智能仓储中心以及端到端高效供应链。",
    "sec-infra": "工业区基础设施",
    "sec-infra-desc": "即批即建工业土地、高质量标准现成厂房 (RBF) 租赁。",
    "sec-agri": "高科技农业与深加工",
    "sec-agri-desc": "高产出农业技术、农产品深加工及对华正规渠道出口贸易。",
    "sec-textile": "纺织鞋履与配套工业",
    "sec-textile-desc": "绿色环保原材料生产、纺织服装高端智能供应链自主化。",
    "sec-digital": "数字经济与双边电商",
    "sec-digital-desc": "智慧口岸技术对接、保税仓物流体系及跨境电商一体化。",
    "sec-medical": "医疗制药与精密设备",
    "sec-medical-desc": "生物制药技术转移合作、高精度医疗及手术设备代理销售。",

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
    "stat-fdi-title": "成功连接外资额",
    "stat-kcn-title": "战略联结工业园",
    "stat-b2b-title": "成功匹配对接企业",
    "stat-province-title": "深度合作省份",

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
    "password-placeholder": "输入密码..."
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
    "sub-title": "BILATERAL INVESTMENT PROMOTION PORTAL",

    // Hero Section
    "hero-title": "Bilateral Investment Gateway <span>Official & Action-Oriented</span> VN - CN",
    "hero-desc": "The Vietnam - China Economic Exchange and Cooperation Center (VCEC) provides essential support for FDI developers through field trips, legal assistance, and B2B matchmaking.",
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
    "sec-electronics": "High-Tech & Electronics",
    "sec-electronics-desc": "Semiconductor manufacturing, integrated circuit development, and high-tech equipment assembly.",
    "sec-energy": "Renewable Energy & EV",
    "sec-energy-desc": "Solar panel infrastructure, advanced battery supply chain, and smart electric vehicle production.",
    "sec-logistics": "Logistics & Supply Chain",
    "sec-logistics-desc": "Multimodal transport, automated warehouses, and cross-border logistics routes.",
    "sec-infra": "Industrial Infrastructure",
    "sec-infra-desc": "Ready-to-build industrial plots, modern Ready Built Factories (RBF) for rent.",
    "sec-agri": "High-tech Agriculture",
    "sec-agri-desc": "Value-added deep food processing, official agricultural export channels to China.",
    "sec-textile": "Textiles & Supporting Industries",
    "sec-textile-desc": "Eco-friendly fabric manufacturing and smart textiles automated supply chain.",
    "sec-digital": "Digital Economy & E-commerce",
    "sec-digital-desc": "Smart custom check-points, bonded warehouses, and cross-border e-commerce networks.",
    "sec-medical": "Healthcare & Pharmaceuticals",
    "sec-medical-desc": "Pharmaceutical technology transfers and high-end medical equipment distribution channels.",

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
    "stat-fdi-title": "CONNECTED FDI CAPITAL",
    "stat-kcn-title": "PARTNERED IND. PARKS",
    "stat-b2b-title": "B2B MATCHED LEADS",
    "stat-province-title": "SUPPORTED PROVINCES",

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
    "password-placeholder": "Enter password..."
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
        
        <!-- Dropdown for logged in users -->
        <div class="member-dropdown" id="member-dropdown" style="
          display: none;
          position: absolute;
          right: 0;
          top: calc(100% + 12px);
          width: 250px;
          background-color: rgba(9, 13, 26, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid var(--vcec-gold-border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--shadow-lg), 0 10px 30px rgba(0, 0, 0, 0.4);
          z-index: 1005;
          text-align: left;
        ">
          <div style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
            <p style="font-size: 0.8rem; color: var(--vcec-gold); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;" data-i18n="member-status">
              ${translations[currentLang]["member-status"] || "Thành viên Chính thức"}
            </p>
            <h4 style="color: #FFFFFF; font-size: 1.1rem; font-weight: 700;">${loggedInUser}</h4>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="font-size: 0.8rem; color: #9CA3AF; line-height: 1.4;">ID: VCEC-${loggedInUser.length}${Math.floor(Math.sin(loggedInUser.length)*100 + 200)}</p>
          </div>
          ${localStorage.getItem("vcec_role") === "super_admin" ? `
            <a href="quan-tri.html" class="btn btn-primary" style="display: block; text-decoration: none; text-align: center; width: 100%; padding: 10px; font-size: 0.85rem; margin-bottom: 8px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border: none;">
              ⚙️ Quản Trị Hệ Thống
            </a>
          ` : ''}
          <button class="btn btn-primary" id="member-logout-btn" style="width: 100%; padding: 10px; font-size: 0.85rem;" data-i18n="logout">
            ${translations[currentLang]["logout"] || "Đăng Xuất"}
          </button>
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
        if (role === "super_admin" || role === "admin") {
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

  // Setup click outside to close dropdown
  window.addEventListener("click", () => {
    const dropdown = header.querySelector("#member-dropdown");
    if (dropdown) {
      dropdown.style.display = "none";
    }
  });

  // Setup Logout button
  const logoutBtn = header.querySelector("#member-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
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
    
    errorEl.style.display = "none";
    
    if (authMode === "login") {
      authMode = "register";
      titleEl.setAttribute("data-i18n", "member-register");
      titleEl.innerHTML = translations[currentLang]["member-register"];
      
      submitBtn.setAttribute("data-i18n", "btn-register");
      submitBtn.innerHTML = translations[currentLang]["btn-register"];
      
      toggleLink.setAttribute("data-i18n", "has-account");
      toggleLink.innerHTML = translations[currentLang]["has-account"];
    } else {
      authMode = "login";
      titleEl.setAttribute("data-i18n", "member-login");
      titleEl.innerHTML = translations[currentLang]["member-login"];
      
      submitBtn.setAttribute("data-i18n", "btn-login");
      submitBtn.innerHTML = translations[currentLang]["btn-login"];
      
      toggleLink.setAttribute("data-i18n", "no-account");
      toggleLink.innerHTML = translations[currentLang]["no-account"];
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
      const { error: insertError } = await supabaseClient
        .from('vcec_users')
        .insert([
          { username: username.toLowerCase(), password: password, role: 'member' }
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

  footer.className = "footer";
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-logo-block">
        <div class="logo-link" style="margin-bottom: 12px;">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="%23FFFFFF" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="logo-text">
            <div class="logo-title" style="color:#FFFFFF;">VCEC</div>
          </div>
        </div>
        <p class="footer-logo-desc" data-i18n="footer-desc">${translations[currentLang]["footer-desc"]}</p>
      </div>
      
      <div>
        <h3 data-i18n="nav-about">${translations[currentLang]["nav-about"]}</h3>
        <ul class="footer-links">
          <li><a href="gioi-thieu.html" data-i18n="nav-about">${translations[currentLang]["nav-about"]}</a></li>
          <li><a href="quan-he.html" data-i18n="nav-relations">${translations[currentLang]["nav-relations"]}</a></li>
          <li><a href="linh-vuc.html" data-i18n="nav-sectors">${translations[currentLang]["nav-sectors"]}</a></li>
          <li><a href="dich-vu.html" data-i18n="nav-services">${translations[currentLang]["nav-services"]}</a></li>
        </ul>
      </div>

      <div>
        <h3 data-i18n="nav-opp">${translations[currentLang]["nav-opp"]}</h3>
        <ul class="footer-links">
          <li><a href="co-hoi.html" data-i18n="nav-opp">${translations[currentLang]["nav-opp"]}</a></li>
          <li><a href="tin-tuc.html" data-i18n="nav-news">${translations[currentLang]["nav-news"]}</a></li>
          <li><a href="tai-nguyen.html" data-i18n="nav-resources">${translations[currentLang]["nav-resources"]}</a></li>
          <li><a href="lien-he.html" data-i18n="nav-contact">${translations[currentLang]["nav-contact"]}</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3 data-i18n="footer-office">${translations[currentLang]["footer-office"]}</h3>
        <div class="footer-contact-item">
          <span style="color:var(--vcec-gold); font-size:1.0rem;">📍</span>
          <p data-i18n="footer-hanoi">${translations[currentLang]["footer-hanoi"]}</p>
        </div>
        <div class="footer-contact-item">
          <span style="color:var(--vcec-gold); font-size:1.0rem;">📍</span>
          <p data-i18n="footer-shenzhen">${translations[currentLang]["footer-shenzhen"]}</p>
        </div>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <div data-i18n="copyright">${translations[currentLang]["copyright"]}</div>
    </div>
  `;
}

// 4. Mock FDI Project Database (Matches 8 priority sectors & North/South regions)
const projectDatabase = [
  {
    id: "deepc",
    nameVi: "Khu Công Nghiệp Deep C Hải Phòng",
    nameZh: "Deep C 工业园区 (海防市)",
    nameEn: "Deep C Industrial Park (Hai Phong)",
    region: "north",
    sector: "electronics",
    provinceVi: "Hải Phòng",
    provinceZh: "海防市",
    provinceEn: "Hai Phong",
    landSize: "85 ha",
    rentPrice: "140 USD/m²",
    lat: 20.8038,
    lng: 106.7725,
    tag: "Chuyên sâu Điện tử",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
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
    sector: "electronics",
    provinceVi: "Bắc Ninh",
    provinceZh: "北宁省",
    provinceEn: "Bac Ninh",
    landSize: "120 ha",
    rentPrice: "165 USD/m²",
    lat: 21.1442,
    lng: 106.0963,
    tag: "High-Tech",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
    powerGridVi: "Hệ thống điện ngầm 22kV kết hợp viễn thông băng thông rộng.",
    powerGridZh: "地下排管铺设22kV电网，高速宽带光纤接入。",
    powerGridEn: "Underground 22kV power cables with high-speed fiber internet.",
    taxVi: "Áp dụng thuế suất đặc biệt ưu đãi cho doanh nghiệp công nghệ cao.",
    taxZh: "针对国家鼓励类高新技术产业，适用最优惠所得税率。",
    taxEn: "Special incentive tax rates applicable for High-Tech enterprises."
  },
  {
    id: "nhon_trach",
    nameVi: "Khu Công Nghiệp Nhơn Trạch VI (Đồng Nai)",
    nameZh: "仁泽第六工业园区 (同奈省)",
    nameEn: "Nhon Trach VI Industrial Park (Dong Nai)",
    region: "south",
    sector: "infra",
    provinceVi: "Đồng Nai",
    provinceZh: "同奈省",
    provinceEn: "Dong Nai",
    landSize: "200 ha",
    rentPrice: "115 USD/m²",
    lat: 10.7412,
    lng: 106.9245,
    tag: "Hạ tầng hoàn thiện",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80",
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
    tag: "Năng lượng & EV",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=500&q=80",
    powerGridVi: "Sử dụng lưới điện thông minh tích hợp điện mặt trời mái nhà.",
    powerGridZh: "配备智能电网，深度整合屋顶分布式光伏发电。",
    powerGridEn: "Equipped with smart power grid integrating solar rooftop energy.",
    taxVi: "Ưu đãi thuế thu nhập đặc biệt cho dự án sản xuất linh kiện xe điện.",
    taxZh: "针对电动汽车零部件制造项目，给予长达15年的特别税收优惠政策。",
    taxEn: "Special income tax exemptions for EV manufacturing supply chains."
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
