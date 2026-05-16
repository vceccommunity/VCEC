# VCEC PROJECT PROGRESS

====== MI - START [15/05/2026] ======
- Tên file vừa sửa: style.css, quan-tri.html
- Tính năng: 
    + Thiết kế lại giao diện Kho lưu trữ theo phong cách Gallery tối giản: Bỏ thông tin văn bản, chuyển card sang hình vuông (aspect-ratio: 1/1).
    + Thêm thanh tìm kiếm (Search) tập tin theo tên, lọc dữ liệu tức thì (Real-time filtering).
    + Thêm lớp phủ (Hover Overlay) chứa 2 icon chuyên dụng: Sao chép URL (🔗) và Xóa tệp (🗑️).
    + Tối ưu hóa trải nghiệm người dùng với hiệu ứng Blur nền và Zoom ảnh nhẹ khi hover.
    + Nâng cấp tính năng "Đổi Cấp" người dùng: Thay thế cơ chế click xoay vòng bằng Dropdown Menu chuyên nghiệp ngay tại vị trí nút bấm.
    + Thêm hiệu ứng hiển thị Dropdown với Animation mượt mà và logic đóng menu khi click ra ngoài (Click-outside detection).
    + Tối ưu hóa trải nghiệm: Hiển thị badge màu sắc tương ứng với từng cấp bậc trong menu xổ xuống.
    + Điều chỉnh giao diện "8 Mảng hợp tác trọng điểm": Chuyển từ layout 3 cột sang 4 cột đồng nhất, giúp 8 bài viết hiển thị cân đối trên 2 hàng.
    + Tối ưu Responsive: Cập nhật Media Queries để duy trì bố cục 4 cột trên các độ phân giải màn hình khác nhau.
    + Khôi phục tính năng Chỉnh sửa bài viết: Thêm lại nút "Sửa" vào bảng danh sách bài đăng, tích hợp logic đổ dữ liệu vào form và cập nhật bài viết hiện có thay vì tạo mới.
    + Nâng cấp Sidebar quản trị: Thêm hệ thống menu con (Sub-menu) dưới mục "Bài đăng" bao gồm 7 chuyên mục.
    + Cơ chế Auto-collapse: Menu con mặc định ẩn và tự động thu gọn khi người dùng chuyển sang các màn hình quản trị khác, giúp giao diện luôn tinh gọn.
    + Tích hợp bộ lọc chuyên mục: Cho phép xem danh sách bài viết theo từng mục nhỏ ngay từ sidebar với hiệu ứng chuyển đổi mượt mà.
    + Trang chi tiết Lĩnh vực: Giảm 50% chiều cao banner (từ 380px xuống 190px) giúp tối ưu không gian hiển thị nội dung chính ngay từ cái nhìn đầu tiên.
- Người thực hiện: MI
- Ghi chú cho KA: Đã mở rộng danh sách `category` trong bảng `vcec_posts`. KA vui lòng kiểm tra nếu cần thêm ràng buộc dữ liệu (Check constraint) cho các slug mới này.
====== MI - END ======


====== MI - START ======
- Tên file vừa sửa/tạo mới: app.js, index.html, profile.html, quan-tri.html, co-hoi.html, dich-vu.html, gioi-thieu.html, lien-he.html, linh-vuc.html, quan-he.html, tai-nguyen.html, tin-tuc.html.
- Các hàm (functions) và logic đã thêm/sửa:
    + Sửa hàm `renderHeader` trong `app.js`: Thay thế thẻ SVG logo bằng thẻ `<img>` trỏ đến `public/logo_VCEC.jpg`.
    + Cập nhật phần `<head>` của toàn bộ các file HTML: Thêm thẻ `<link rel="icon">` để hiển thị Favicon.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Hiện tại đường dẫn logo đang được hardcode trong frontend (`public/logo_VCEC.jpg`). Nếu KA có ý định cho phép Admin thay đổi logo động từ database, hãy cung cấp API trả về URL logo để MI cập nhật lại logic render.
====== MI - END ======

====== KA - START ======
## [16/05/2026] Cấu hình lại Supabase Account mới

### Files đã sửa/tạo:
- `app.js` — đổi supabaseUrl + supabaseKey sang account mới (uksvxqhclwjrzeoqsfxr)
- `quan-tri.html` — sửa hardcoded URL storage cũ → URL mới dòng 2634
- `setup-db.js` — Node.js script setup database tự động (cần PAT)
- `vcec-db-setup.sql` — SQL hoàn chỉnh để chạy trong Supabase SQL Editor

### Database schema:
- Bảng `vcec_users`: id (uuid PK), username (unique), password, role (7 cấp), created_at
- Bảng `vcec_leads`: id (uuid PK), company_name, contact_name, wechat_id, project_id, project_name, created_at
- Storage bucket `vcec`: public, max 50MB

### RLS: Enable + Permissive Policy FOR ALL USING (true) — chuẩn Supabase mới
### Lưu ý kỹ thuật: DISABLE RLS không work với Supabase gateway mới (sb_publishable_ key format)
### Verified: REST API trả data đúng qua anon key ✓

### Dữ liệu mẫu: 8 users + 5 leads trong vcec-db-setup.sql
- Super admin: vcec_sadmin / Admin@VCEC2026!

### Lưu ý cho MI: Không có thay đổi UI ở bước này

---

## [16/05/2026] Kho lưu trữ — Dynamic Bucket Tabs + Thumbnail Grid

### File đã sửa: `quan-tri.html`

### Logic đã thay đổi:
- Xóa dòng subtitle mô tả trong screen-resources
- Thêm `<div id="bucket-tabs">` để render tab động từ Supabase
- Hàm `loadBucketFiles()`: dùng mảng `VCEC_BUCKETS` cố định (listBuckets() cần service_role key, anon key không gọi được)
- Hàm `loadBucketTab(bucketName, tabEl)`: load file của bucket được chọn, render thumbnail grid
- `window.currentBucket`: lưu bucket đang active, dùng cho upload/delete
- `uploadToBucket()`: upload vào `window.currentBucket` (không hardcode 'vcec')
- `deleteBucketFile()`: xóa từ `window.currentBucket`

### Fix bổ sung [16/05/2026]:
- Xóa "Supabase Storage Connected" indicator khỏi screen-resources header
- Thay `listBuckets()` bằng `const VCEC_BUCKETS = ['vcec','vcec_other','vcec_users','vcec_posts']`
- Lý do: `listBuckets()` là admin-only API, anon key bị từ chối (trả về rỗng, không báo lỗi)
- Khi MIKE thêm bucket mới trên Supabase → cập nhật mảng `VCEC_BUCKETS` trong quan-tri.html

### Lưu ý cho MI:
- Tab button dùng class `.bucket-tab-btn` + toggle `.active` (MI đã style trong style.css)

---

## [16/05/2026] Bài Đăng — vcec_posts Table + Admin Posts Screen Live

### Files đã sửa/tạo:
- `quan-tri.html` — wiring up Posts screen với Supabase
- `vcec-posts-setup.sql` — SQL tạo bảng + dữ liệu mẫu (MIKE chạy thủ công trên Supabase)

### MIKE cần làm thủ công (1 lần):
> Supabase Dashboard > SQL Editor > New query > Paste nội dung file `vcec-posts-setup.sql` > Run

### Database schema — Bảng `vcec_posts`:
- `id` UUID PK, `category` TEXT CHECK ('tin-tuc','co-hoi','tai-nguyen','gioi-thieu')
- `title_vi/zh/en`, `summary_vi/zh/en`, `content_vi/zh/en` TEXT
- `cover_image` TEXT, `status` TEXT CHECK ('published','draft')
- `author` TEXT, `created_at` TIMESTAMPTZ
- RLS: Enable + Permissive Policy FOR ALL USING (true)
- Grant SELECT/INSERT/UPDATE/DELETE to anon, authenticated

### Dữ liệu mẫu: 8 bài viết (5 tin-tuc + 2 co-hoi + 1 tai-nguyen) khớp với nội dung hardcoded trên website

### Logic đã thêm/sửa trong `quan-tri.html`:
- `publishPost(event)` → **async**, INSERT vào `vcec_posts` qua supabaseClient, hiển thị lỗi thật nếu thất bại
- `loadPostsList()` → **mới**, fetch từ `vcec_posts` ORDER BY created_at DESC, render tbody động với badge màu theo category
- `deletePost(id, title)` → **mới**, DELETE từ `vcec_posts` theo id sau khi confirm
- `switchScreen('posts')` → gọi `loadPostsList()` khi chuyển sang màn bài đăng
- `checkSupabaseReady()` → gọi `loadPostsList()` ngay khi Supabase boot xong

### Lưu ý cho MI:
- Các trang công khai đã được wire up — xem mục bên dưới.

---

## [16/05/2026] Trang Công Khai — Fetch bài viết từ Supabase (tin-tuc, co-hoi, tai-nguyen)

### Files đã sửa:
- `app.js` — thêm `window.dispatchEvent(new CustomEvent('vcec-lang-change'))` vào cuối `setLanguage()`
- `tin-tuc.html` — fetch posts `category='tin-tuc'` từ Supabase, render news-card grid động
- `co-hoi.html` — thêm section "Bài Viết Cơ Hội Đầu Tư" render từ Supabase (phần project cards KCN của app.js giữ nguyên)
- `tai-nguyen.html` — fetch posts `category='tai-nguyen'` từ Supabase, render resource-item list động

### Pattern chung (áp dụng cho cả 3 trang):
- `waitForSupabase` pattern: poll `window.supabaseClient` mỗi 150ms cho đến khi sẵn sàng
- Multilingual: `tf(post, field)` lấy `title_vi/zh/en` dựa theo `localStorage.getItem('vcec_lang')`
- Language switch: lắng nghe `window.addEventListener('vcec-lang-change')` để re-render không cần reload trang

### Lưu ý cho MI:
- `co-hoi.html`: section bài viết ẩn mặc định (`display:none`), chỉ hiện khi có data từ Supabase
- `tai-nguyen.html`: icon resource hiện là 📄 (emoji), nếu MI muốn thay bằng icon chữ PDF/DOC thì cần thêm `file_format` field vào bảng `vcec_posts` — báo KA thêm migration
- Khi Admin thêm bài viết mới qua `quan-tri.html` → trang công khai tự động cập nhật (không cần deploy lại)

---

## [16/05/2026] Trang Chi Tiết Lĩnh Vực — linh-vuc-chi-tiet.html

### Files đã tạo/sửa:
- `linh-vuc-chi-tiet.html` — **file mới**, 1 trang dùng chung cho cả 8 lĩnh vực, đọc `?id=` từ URL
- `linh-vuc.html` — 8 card chuyển từ `<div onclick="linh-vuc.html">` → `<a href="linh-vuc-chi-tiet.html?id=SLUG">`
- `index.html` — 8 sector card trang chủ đã update onclick → `linh-vuc-chi-tiet.html?id=SLUG`

### Slugs (id=):
electronics, energy, logistics, infra, agri, textile, digital, medical

### Cấu trúc mỗi trang chi tiết:
1. **Hero banner**: ảnh lớn + số Sector + tiêu đề + tagline
2. **Breadcrumb**: Trang Chủ › Lĩnh Vực › Tên lĩnh vực
3. **Overview 2 cột**: văn bản (2 đoạn) + ảnh phụ + 3 stat boxes
4. **Opportunities grid (3 cards)**: cơ hội đầu tư cụ thể
5. **Why Vietnam grid (4 items)**: lý do chọn Việt Nam & VCEC
6. **CTA band**: 2 nút → Đăng Ký Tư Vấn (lien-he.html) + Xem Lĩnh Vực Khác (linh-vuc.html)

### Multilingual: tf(obj) helper đọc localStorage lang, re-render khi bắt vcec-lang-change event

### Bug đã fix: JS syntax error do apostrophe chưa escape trong energy.tagline.en và energy.overview_title.en
- `Southeast Asia's` → `Southeast Asia\'s`
- Bài học: validate JS bằng `node -e "new Function(...)"` sau khi write file lớn

### Lưu ý cho MI:
- Trang dùng inline `<style>` riêng (không ảnh hưởng style.css)
- Class `.sector-hero-overlay`, `.opp-card`, `.why-item`, `.cta-band`, `.stats-row` — MI có thể style lại nếu cần
====== KA - END ======
