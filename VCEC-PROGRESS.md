# VCEC PROJECT PROGRESS

====== MI - START ======
- Tên file vừa sửa/tạo mới: vcec_posts (Database)
- Các hàm (functions) và logic đã thêm/sửa:
    + Đã tự động chèn một bài viết đặc biệt có tiêu đề "Số Liệu Hợp Tác Việt - Trung" vào chuyên mục "Quan Hệ Việt-Trung" trên cơ sở dữ liệu. Bài viết này được sử dụng riêng để chứa (upload) hình ảnh biểu đồ Kim ngạch Thương mại tại trang `quan-he.html`.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: quan-he.html
- Các hàm (functions) và logic đã thêm/sửa:
    + Cập nhật thứ tự sắp xếp (Sorting) trong hàm `loadMilestones()`: Thay đổi `ascending: true` thành `ascending: false` để các cột mốc hiển thị theo trình tự thời gian mới nhất ở trên, cũ hơn ở dưới (Descending).
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: quan-tri.html
- Các hàm (functions) và logic đã thêm/sửa:
    + Cập nhật gợi ý tỷ lệ ảnh ở mục Upload Ảnh Bìa Bài Viết: Thêm ghi chú yêu cầu "Kích thước khuyên dùng: 1200 x 675 px (tỷ lệ 16:9)" giúp nhân viên chuẩn bị ảnh chính xác và hiển thị đẹp hơn trên trang chi tiết.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: style.css
- Các hàm (functions) và logic đã thêm/sửa:
    + Cập nhật hiển thị bài viết (`.article-body` và `.article-body p`): Giảm font-size xuống 1 bậc (còn `1.05rem`), giảm line-height xuống 1 bậc (còn `1.5`) và margin-bottom còn `12px` để nội dung gọn gàng, phù hợp hơn với layout tổng thể. Khắc phục triệt để các rule CSS bị trùng lặp trong file.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== KA - START ======
## [17/05/2026] quan-he.html — Chuyển Khu Vực Thống Kê Sang Bài Đăng Dynamic

**File đã sửa:** `quan-he.html`
**File đã tạo:** `vcec-quan-he-stats-post.sql`

### Thay đổi:
- Xóa hardcoded CSS bar chart (biểu đồ cột) trong section "Trade Data"
- Thay bằng `<div id="stats-post-container">` — render nội dung từ bài viết trong Supabase
- **Bài đặc biệt** được nhận diện bởi: `category='quan-he-viet-trung'` **VÀ** `title_vi='Số Liệu Hợp Tác Việt - Trung'` (tiêu đề cố định, không đổi)
- Milestones timeline đã được update `.neq('title_vi', STATS_TITLE)` để loại trừ bài thống kê

### Luồng Admin:
1. Bài đăng → Quan Hệ Việt-Trung → tìm bài "Số Liệu Hợp Tác Việt - Trung"
2. Bấm Sửa → cập nhật bảng số liệu trong Quill editor
3. Lưu → trang quan-he.html tự cập nhật ngay

**MIKE cần làm thủ công (1 lần):**
> Supabase Dashboard > SQL Editor > Paste file `vcec-quan-he-stats-post.sql` > Run

Sau khi chạy SQL, bài "Số Liệu Hợp Tác Việt - Trung" sẽ xuất hiện trong admin và nội dung bảng dữ liệu sẽ hiển thị trên website.

**Lưu ý quan trọng:** Không đổi tiêu đề bài "Số Liệu Hợp Tác Việt - Trung" vì trang web dùng tiêu đề này để nhận diện bài thống kê.

### Lưu ý cho MI:
- `#stats-post-container` render title (h2) + summary (p) + content (article-body)
- CSS `.chart-container`, `.chart-bars-wrapper`, `.bar` vẫn còn trong `<style>` — MI có thể xóa nếu không dùng nữa
====== KA - END ======


====== KA - START ======
## [17/05/2026] Fix 3 Bug Admin Panel

### 1. Quill editor trống khi bấm Sửa bài viết
**File:** `quan-tri.html` — hàm `editPost()`
**Nguyên nhân:** Dùng API Quill v1 (`clipboard.convert(string)`) nhưng dự án dùng Quill **v2.0.2**. Quill v2 yêu cầu object `{ html: string }`.
**Fix:** `clipboard.convert(post.content_vi || "")` → `clipboard.convert({ html: post.content_vi || '' })`

### 2. Chọn chuyên mục khác nhưng form edit vẫn hiện bài cũ
**File:** `quan-tri.html` — hàm `filterPostsByCategory()`
**Nguyên nhân:** Hàm không đóng form edit trước khi load danh sách mới.
**Fix:** Thêm `hideNewPostForm()` ở đầu `filterPostsByCategory()`. Đồng thời bỏ `loadPostsList()` thừa cuối hàm (đã được `switchScreen` gọi).

### 3. Ma trận phân quyền không đồng bộ giữa các thiết bị
**Nguyên nhân:** `savePermissionMatrix()` chỉ lưu vào localStorage của browser. Khi nhân viên đăng nhập trên thiết bị khác → không có matrix → dùng default → vẫn thấy menu.
**Fix:**
- `savePermissionMatrix()` → async, upsert vào bảng `vcec_config` trên Supabase + localStorage
- Thêm `loadPermissionMatrixFromSupabase()` → gọi trong `checkSupabaseReady()` để fetch matrix mới nhất từ DB và re-apply permissions

**MIKE cần làm thủ công (1 lần):**
> Supabase Dashboard > SQL Editor > Paste file `vcec-config-table.sql` > Run

Sau khi chạy SQL, vào Cài đặt → Phân quyền truy cập → cấu hình lại ma trận → bấm **"Lưu cấu hình ma trận"** để đồng bộ lên Supabase. Từ đó nhân viên trên mọi thiết bị đều nhận đúng phân quyền.
====== KA - END ======


====== MI - START ======
- Tên file vừa sửa/tạo mới: app.js, quan-tri.html
- Các hàm (functions) và logic đã thêm/sửa:
    + app.js: Bổ sung quyền hiển thị nút "Quản Trị Hệ Thống" cho vai trò "staff" (Nhân viên) và "leader" (Trưởng nhóm). Cập nhật logic chuyển hướng khi bấm vào avatar.
    + quan-tri.html: Nới lỏng kiểm tra bảo mật ban đầu để cho phép "staff" và "leader" truy cập trang.
    + quan-tri.html: Thêm hàm `applyMenuPermissions()` chạy khi tải trang (DOMContentLoaded) để đọc quyền từ Ma trận phân quyền (permissionMatrix) và ẩn các menu sidebar / chức năng không được phép. Tự động chuyển hướng tới tab chức năng đầu tiên mà user được phép truy cập.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: 
    + Cấu hình phân quyền hiện đang được lưu ở client-side (`vcec_permission_matrix` trong localStorage). Nếu sau này dự án yêu cầu, KA có thể xem xét đồng bộ cấu hình ma trận này lên bảng settings của Supabase database để đảm bảo đồng nhất phân quyền trên nhiều thiết bị của Admin.
====== MI - END ======
====== MI - START ======
- Tên file vừa sửa/tạo mới: style.css
- Các hàm (functions) và logic đã thêm/sửa:
    + Căn chỉnh class `.article-body` và `.article-body p`: Giảm `line-height` từ 1.9 xuống 1.6 và giảm `margin-bottom` từ 25px xuống 14px để thu gọn khoảng cách giữa các dòng và các đoạn văn trong bài viết.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======
====== MI - START ======
- Tên file vừa sửa/tạo mới: app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + Bổ sung từ khóa `"nav-members"` vào object `translations` cho cả 3 ngôn ngữ (vi, zh, en).
    + Sửa hàm `renderHeader()`: Thêm phần tử `{ page: 'profile.html', key: 'nav-members' }` vào mảng `menuItems` để hiển thị link "Thành Viên" trên thanh Navigation.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có yêu cầu backend mới ở task này.
====== MI - END ======
====== MI - START [16/05/2026] ======
- Tên file vừa sửa: style.css, gioi-thieu.html, bai-viet-chi-tiet.html, tai-nguyen.html
- Các hàm (functions) và logic đã thêm/sửa:
    + Xây dựng hệ thống **Editorial & Article Master System**: Định nghĩa các class chuẩn (.article-wrap, .article-body, .article-title-main) giúp hiển thị nội dung bài viết theo phong cách tạp chí cao cấp.
    + Nâng cấp **News & Articles System**: Cải tiến giao diện `.news-card` với hiệu ứng đổ bóng đa lớp, hover zoom ảnh và typography sang trọng.
    + Hoàn thiện **Resource & Knowledge Library**: Đồng bộ giao diện danh sách tài liệu, thay thế icon emoji bằng SVG chuyên nghiệp và tối ưu hóa trải nghiệm tải tài liệu.
    + Tái cấu trúc và dọn dẹp `style.css`: Loại bỏ hoàn toàn các đoạn mã trùng lặp, hợp nhất các hệ thống CSS rời rạc vào một cấu trúc đồng nhất và dễ bảo trì.
    + Thêm hệ thống **Animation Master**: Tích hợp các hiệu ứng `fadeUp`, `slideInDown` giúp giao diện Portal trở nên sinh động và hiện đại.
    + Đồng bộ hóa Responsive: Tối ưu hiển thị cho hệ thống bài viết và tài nguyên trên các thiết bị di động (Mobile/Tablet).
    + **Nâng cấp Layout 8 Mảng hợp tác (Executive Grid)**: Chuyển đổi từ layout cũ sang hệ thống Grid 4 cột ngang x 2 dòng chuyên nghiệp. Tối ưu hóa kích thước thẻ, bo góc 28px và thêm hiệu ứng "Lift & Glow" cao cấp khi hover.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: 
    + Hệ thống bài viết chi tiết hiện đang tự động render cả Plain Text và HTML (từ Quill editor). KA hãy đảm bảo dữ liệu `content` trong DB luôn sạch để tránh lỗi hiển thị.
    + Trang Tài nguyên hiện đang dùng chung bảng `vcec_posts`. Nếu KA có ý định thêm tính năng "Tải trực tiếp" (Direct Download), hãy thêm trường `file_url` vào database để MI cập nhật nút bấm.
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


====== KA - START ======
## [16/05/2026] Fix CHECK Constraint category + Trang Chi Tiết Bài Đăng

### 1. Fix CHECK constraint vcec_posts.category

**File đã tạo:** `vcec-category-constraint-fix.sql`

**Nguyên nhân:** MI đã mở rộng danh sách category trong dropdown admin (quan-tri.html) lên 7 slug, nhưng bảng `vcec_posts` trên Supabase vẫn chỉ cho phép 4 slug cũ → INSERT bài viết với category mới sẽ bị Supabase reject.

**MIKE cần làm thủ công (1 lần):**
> Supabase Dashboard > SQL Editor > New query > Paste nội dung file `vcec-category-constraint-fix.sql` > Run

**7 category hợp lệ sau khi chạy SQL:**
- `tin-tuc`, `co-hoi`, `tai-nguyen`, `gioi-thieu` (cũ)
- `quan-he-viet-trung`, `linh-vuc`, `dich-vu` (mới — MI đã thêm vào dropdown)

---

### 2. Trang Chi Tiết Bài Đăng

**File đã tạo:** `bai-viet-chi-tiet.html`

**Cách dùng:** `bai-viet-chi-tiet.html?id=UUID` — đọc UUID từ URL, fetch `vcec_posts` bằng `.single()`, render toàn bộ nội dung bài viết.

**Tính năng:**
- Breadcrumb tự động: Trang Chủ › [Category Page] › Tiêu đề bài
- Cover image (hero) — ẩn nếu không có ảnh
- Category badge màu theo loại bài (7 màu khác nhau)
- Render nội dung `content_vi/zh/en` — tách đoạn theo `\n\n`
- Nút "Quay Lại" dẫn về đúng trang category
- Multilingual: đọc `localStorage.vcec_lang` + lắng nghe `vcec-lang-change`
- Xử lý lỗi: hiện thông báo nếu không tìm thấy bài (sai ID hoặc bị xóa)

**Bảng mapping category → URL trang chủ:**
| category | URL |
|---|---|
| tin-tuc | tin-tuc.html |
| co-hoi | co-hoi.html |
| tai-nguyen | tai-nguyen.html |
| gioi-thieu | gioi-thieu.html |
| quan-he-viet-trung | quan-he.html |
| linh-vuc | linh-vuc.html |
| dich-vu | dich-vu.html |

---

### 3. Wiring Link Trang Công Khai → Trang Chi Tiết

**Files đã sửa:** `tin-tuc.html`, `co-hoi.html`, `tai-nguyen.html`

- `tin-tuc.html` + `co-hoi.html`: Đổi wrapper `<div class="news-card">` → `<a href="bai-viet-chi-tiet.html?id=...">` — click cả card dẫn tới chi tiết
- `tai-nguyen.html`: Thêm nút "Xem chi tiết" cạnh nút "Yêu cầu tài liệu"; tiêu đề bài thành link hover đổi màu đỏ

### Lưu ý cho MI:
- `bai-viet-chi-tiet.html` dùng inline `<style>` riêng, có các class: `.article-wrap`, `.article-breadcrumb`, `.article-hero-img`, `.article-cat-badge`, `.article-title`, `.article-meta`, `.article-divider`, `.article-content`, `.article-back` — MI có thể style lại nếu cần
- `tai-nguyen.html`: button "Xem chi tiết" dùng inline style tạm thời (`background:#f3f4f6`), MI có thể tạo class riêng trong style.css cho đồng nhất hơn
====== KA - END ======


====== KA - START ======
## [16/05/2026] Hoàn thành TODO List: Cover Image Upload + Profile Công Khai + SEO

---

### 1. Upload ảnh bìa trực tiếp khi đăng bài

**File đã sửa:** `quan-tri.html`

**Logic thêm:**
- Thêm GROUP 4 "ẢNH BÌA BÀI VIẾT" vào form đăng bài (giữa nội dung và nút submit)
- Gồm: text input URL + nút "Tải ảnh lên" + xem trước ảnh (preview realtime) + nút ✕ xóa ảnh
- Hàm `uploadCoverImage(input)`: upload file vào bucket `vcec` → thư mục `covers/` → lấy publicUrl điền vào input
- Hàm `previewCoverImage(url)`: hiện/ẩn preview khi gõ URL hoặc sau khi upload xong
- Hàm `clearCoverImage()`: xóa URL và preview
- `publishPost()`: đọc `post-cover-url` → thêm vào payload INSERT/UPDATE
- `editPost()`: load `post.cover_image` vào input + kích hoạt preview khi mở form sửa
- `hideNewPostForm()`: gọi `clearCoverImage()` khi đóng form

**Lưu ý cho MI:** Group ảnh bìa chưa có CSS riêng, hiện dùng class `.form-group` + `.form-input` sẵn có. Preview container có `max-width: 420px`, MI style lại thoải mái.

---

### 2. Trang Hồ Sơ Thành Viên Công Khai

**File đã tạo:** `ho-so-thanh-vien.html`

**Truy cập:** `ho-so-thanh-vien.html?id=UUID` (UUID là `id` trong bảng `vcec_users`)

**Hiển thị:**
- Avatar chữ cái đầu + gradient đỏ-vàng
- Tên thành viên (username) + role badge màu theo cấp bậc
- Ngày tham gia (created_at)
- Danh sách bài viết đã đăng (query `vcec_posts` theo `author = username`, chỉ published)
- Click bài → `bai-viet-chi-tiet.html?id=UUID`
- Ẩn section bài viết nếu chưa có bài

**Kết nối từ bai-viet-chi-tiet.html:** tên tác giả → link đỏ tự động (lookup user ID theo username, nếu không tìm thấy thì vẫn hiện text thường)

**Lưu ý bảo mật:** Query chỉ fetch `id, username, role, created_at` — KHÔNG fetch `password`.

---

### 3. SEO Meta Tags Động (bai-viet-chi-tiet.html)

**File đã sửa:** `bai-viet-chi-tiet.html`

**Tags được thêm:**
- `<meta property="og:title">` → title bài viết
- `<meta property="og:description">` → summary bài viết
- `<meta property="og:image">` → cover_image hoặc fallback logo_VCEC.jpg
- `<meta property="og:type">` = `article`, `og:site_name` = `VCEC Portal`
- `<meta name="twitter:card">` = `summary_large_image`
- `<meta name="twitter:title/description/image">` tương tự OG

Tất cả được cập nhật động trong hàm `renderArticle()` sau khi fetch post xong.

### Lưu ý cho MI:
- `ho-so-thanh-vien.html` dùng inline `<style>` riêng: `.member-card`, `.member-avatar`, `.member-role-badge`, `.member-post-item`, `.member-post-thumb` — MI style lại thoải mái
- Hiện chưa có trang danh sách thành viên công khai — link vào profile chỉ qua bài viết (author click)
====== KA - END ======


====== KA - START ======
## [16/05/2026] Debug + Refactor gioi-thieu: 2 thẻ → 1 bài viết đầy đủ

---

### Vấn đề phát hiện:
Trang `gioi-thieu.html` hiển thị "Chưa có nội dung" dù memory ghi nhận đã có bài.
Nguyên nhân: `vcec-static-pages-posts.sql` chưa từng được chạy — DB không có bài nào với `category='gioi-thieu'`.

---

### Bước fix 1: Insert dữ liệu còn thiếu
**MIKE đã chạy:** `vcec-static-pages-posts.sql` → insert 6 bài (gioi-thieu x2, dich-vu x2, quan-he-viet-trung x2).

**Phát sinh:** `dich-vu` và `quan-he-viet-trung` bị duplicate do `vcec-posts-remaining.sql` đã chạy trước đó.

**Fix duplicate:** SQL xóa bản trùng (giữ id nhỏ nhất qua `ROW_NUMBER() OVER PARTITION BY`):
```sql
DELETE FROM vcec_posts WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY category, title_vi ORDER BY id) AS rn
    FROM vcec_posts WHERE category IN ('dich-vu', 'quan-he-viet-trung')
  ) t WHERE rn > 1
);
```

---

### Bước fix 2: Gộp 2 bài gioi-thieu → 1 bài "Bài Giới Thiệu Chính"

**File đã tạo:** `vcec-gioi-thieu-single-post.sql` ← **MIKE cần chạy (1 lần)**

Nội dung SQL: DELETE 2 bài cũ → INSERT 1 bài tổng hợp gồm 3 phần:
- Tầm Nhìn & Sứ Mệnh
- Giá Trị Cốt Lõi (3 điểm)
- Ban Điều Hành VCEC (Nguyễn Hải Anh + Vương Mỹ Linh)

---

### Bước fix 3: Thay đổi cách hiển thị gioi-thieu.html

**File đã sửa:** `gioi-thieu.html`

**Trước:** service-card grid với 2 thẻ, dùng `loadPosts()` + `renderPosts()` render array.

**Sau:** 1 bài viết đầy đủ dạng article, dùng `.single()` + render nội dung HTML vào container.

Logic mới:
- Container: `#gioi-thieu-container` (class `article-detail-wrap`)
- Fetch: `.eq('category','gioi-thieu').limit(1).single()`
- Render: title → h2, summary → lead, content_vi/zh/en → innerHTML trong `.rich-text-vcec`
- Multilingual: re-render khi `vcec-lang-change`
- MI đã style lại container với `about-main-article`, `article-content-box` (shadow card) + `rich-text-vcec`

### Lưu ý cho MI:
- `gioi-thieu.html` container dùng `article-detail-wrap` — cần kiểm tra class này trong style.css nếu muốn tùy chỉnh thêm
- Cover image ảnh bìa tự hiện nếu bài có `cover_image`, ẩn nếu không
====== KA - END ======


====== KA - START ======
## [17/05/2026] Trang Danh Sách Thành Viên Công Khai + SEO Meta Tags

### 1. Trang Danh Sách Thành Viên — thanh-vien.html

**File đã tạo:** `thanh-vien.html`

**Truy cập:** `thanh-vien.html` (không cần tham số)

**Tính năng:**
- Grid responsive (auto-fill, min 260px mỗi card) hiển thị toàn bộ thành viên
- Avatar chữ cái đầu + gradient đỏ-vàng (giống pattern ho-so-thanh-vien.html)
- Role badge màu theo cấp bậc (7 roles)
- Click card → `ho-so-thanh-vien.html?id=UUID`
- Đếm tổng số thành viên hiển thị phía trên grid
- Query chỉ fetch: `id, username, role, created_at` — KHÔNG fetch password
- OG + Twitter Card meta tags tĩnh

### 2. SEO Meta Tags — 3 trang listing

**Files đã sửa:** `gioi-thieu.html`, `dich-vu.html`, `quan-he.html`

**Tags đã thêm (tất cả 3 trang):**
- `og:title`, `og:description`, `og:image` (fallback `public/logo_VCEC.jpg`), `og:type`, `og:site_name`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

**Bonus — gioi-thieu.html:** Sau khi fetch bài viết thành công, hàm `updateSEO(post)` cập nhật dynamic OG tags theo title/summary/cover_image thực tế của bài — đảm bảo scraper (Facebook, Zalo) đọc đúng nội dung.

### Lưu ý cho MI:
- `thanh-vien.html`: đang dùng class `.mci-avatar`, `.mci-info`, `.mci-name`, `.mci-role` — MI có thể style lại
- Nếu MI muốn thêm link "Thành Viên" vào nav header → cần sửa `renderHeader()` trong `app.js`
====== KA - END ======


====== KA - START ======
## [16/05/2026] Chuyển Nội Dung Tĩnh → Bài Đăng Admin (gioi-thieu, dich-vu, quan-he)

**Mục tiêu:** MIKE muốn chỉnh sửa nội dung các trang Giới Thiệu / Dịch Vụ / Quan Hệ qua Admin Panel thay vì sửa thẳng HTML.

---

### Files đã tạo / sửa:

**`vcec-static-pages-posts.sql`** ← **MIKE cần chạy thủ công (1 lần)**
> Supabase Dashboard > SQL Editor > Paste nội dung file > Run

Inserts 6 bài viết vào `vcec_posts`:
| Category | Tiêu đề |
|---|---|
| `gioi-thieu` | Tầm Nhìn & Sứ Mệnh VCEC |
| `gioi-thieu` | Ban Điều Hành VCEC |
| `dich-vu` | Giải Pháp Hỗ Trợ Doanh Nghiệp Toàn Diện |
| `dich-vu` | Quy Trình Triển Khai Xúc Tiến 4 Bước |
| `quan-he-viet-trung` | Tháng 12/2023 — Tuyên bố chung Việt Nam - Trung Quốc |
| `quan-he-viet-trung` | Tháng 8/2024 — Ký kết 14 Văn kiện Hợp tác |

Nội dung được lưu dạng HTML (`content_vi/zh/en`) — Quill editor sẽ đọc và render đúng khi MIKE bấm "Sửa".

---

**`bai-viet-chi-tiet.html`** — sửa hàm `renderContent(text)`:
- Nếu content bắt đầu bằng `<` (HTML từ Quill) → render trực tiếp qua innerHTML
- Nếu là plain text cũ → giữ nguyên logic tách `\n\n` cũ
- Lý do: `publishPost()` dùng `quillVi.getSemanticHTML()` → lưu HTML; các bài cũ lưu plain text

**`gioi-thieu.html`** — thay 2 section tĩnh (Vision/Mission + Team) bằng:
- Dynamic news-card grid fetch `vcec_posts` category=`gioi-thieu`
- Thêm `<style>` block `.news-grid / .news-card` (như pattern tin-tuc/co-hoi)
- Script IIFE: `loadPosts()` → `renderPosts()` + re-render khi đổi ngôn ngữ

**`dich-vu.html`** — thay 2 section tĩnh (Service Grid + Steps) bằng:
- Dynamic news-card grid fetch `vcec_posts` category=`dich-vu`
- Thay `.service-grid/.service-card` CSS bằng `.news-grid/.news-card`

**`quan-he.html`** — giữ nguyên biểu đồ kim ngạch, thay section milestones:
- Dynamic timeline fetch `vcec_posts` category=`quan-he-viet-trung`
- Render mỗi post theo layout timeline (dot đỏ + ngày Tháng/Năm từ `created_at` + title + summary + link chi tiết)

---

### Cách chỉnh sửa nội dung (luồng của MIKE):
1. Vào `quan-tri.html` → Bài đăng → chọn chuyên mục (Giới Thiệu / Dịch Vụ / Quan Hệ Việt-Trung)
2. Bấm nút **Sửa** trên bài muốn chỉnh → form hiện ra với nội dung đầy đủ
3. Sửa nội dung trong Quill editor → bấm **Cập Nhật Bài Viết**
4. Trang công khai tự cập nhật ngay (không cần deploy)

---

### Lưu ý cho MI:
- `gioi-thieu.html` và `dich-vu.html`: cards hiện render với `.news-card` style thuần túy (giống trang tin-tuc). **MI có thể tạo style riêng** để phân biệt với trang tin tức nếu cần thẩm mỹ khác biệt (ví dụ: thêm icon dịch vụ, bỏ meta date).
- `quan-he.html`: milestones timeline dùng inline style hardcoded (#C8102E cho dot, #AF883A đã thay var(--vcec-gold) vì VS Code linter). **MI có thể đồng bộ lại màu** qua CSS class nếu muốn.
- Bài viết mới thêm qua Admin (cùng category) sẽ tự xuất hiện trên trang — không cần sửa HTML.
====== KA - END ======
