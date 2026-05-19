# VCEC PROJECT PROGRESS
 
====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: co-hoi.html
- Các hàm (functions) và logic đã thêm/sửa:
    + co-hoi.html: Thay đổi màu chữ của Tiêu đề Banner chính `.invest-hero-title` ("Việt Nam: điểm đến chiến lược...") từ màu mặc định tối màu sang màu trắng tinh khiết (`#FFFFFF !important`). Việc này giải quyết triệt để vấn đề chữ bị chìm, giúp tiêu đề hiển thị nổi bật, rõ nét và cực kỳ chuyên nghiệp trên nền gradient đỏ-vàng hoàng gia của trang.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + app.js: Thêm nút/icon "Logout" chuyên dụng (🚪 SVG phong cách hiện đại) nằm ngay bên trái Avatar người dùng ở Header. Hỗ trợ hiệu ứng hover chuyển sang màu đỏ báo hiệu trực quan, và kích hoạt đăng xuất nhanh tức thì khi click, xóa sạch `localStorage` và tự động reload trang.
    + app.js: Tối ưu hóa hành vi click vào Avatar của người dùng đã đăng nhập:
        * Đối với Thành viên thông thường (không được phân quyền admin): Nhấp vào avatar sẽ chuyển hướng trực tiếp và mở trang chi tiết cá nhân (`profile.html`).
        * Đối với Người dùng có quyền truy cập hệ thống quản trị (`super_admin`, `admin`, `staff`, `leader`): Nhấp vào avatar sẽ trực tiếp mở trang quản trị hệ thống (`quan-tri.html`).
        * Đối với Người dùng chưa đăng nhập: Nhấp vào avatar vẫn mở cửa sổ đăng nhập/đăng ký (`#member-modal`) như cũ.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: dich-vu.html
- Các hàm (functions) và logic đã thêm/sửa:
    + dich-vu.html: Xóa bỏ hoàn toàn giao diện bảng biểu khô khan và thiết kế lại từ đầu thành một kiệt tác giao diện VCEC siêu sang trọng và trực quan:
        * 1. 5.1. Tổng quan (6 dịch vụ): Thiết kế lưới thẻ dịch vụ một đầu mối `.premium-service-grid` tuyệt đẹp gồm 6 thẻ thủy tinh trắng ngà. Mỗi thẻ tích hợp biểu tượng vector SVG chìm phát sáng khi hover, đường kẻ gradient đỏ son - vàng kim chỉ lối ở cạnh trái, và tiêu đề chuyển màu đỏ bắt mắt.
        * 2. 5.2. Quy trình hỗ trợ tiêu chuẩn 5 bước (Timeline): Thiết kế dòng thời gian thẳng đứng `.timeline-container` với vệt theo dõi gradient chạy dọc, các nút tròn chỉ mục `01` - `05` có hào quang gold tỏa sáng khi di chuột, và các thẻ nội dung trượt động êm ái sang phải khi tương tác.
        * 3. Chương trình hội viên VCEC: Hiển thị 3 thẻ Bronze (Cơ bản), Silver (Doanh nghiệp), Gold (Đối tác chiến lược VIP) đồng bộ tuyệt đối với các gạch đầu dòng chi tiết từ yêu cầu của đối tác. Thẻ Gold sở hữu viền vàng Champagne, dải duy băng chéo vương giả và vầng hào quang chìm sang quý.
        * 4. Tương tác tactile & Đa ngôn ngữ: Giữ nguyên cơ chế click vào dịch vụ tự động cuộn mượt mà xuống form, pre-select mục quan tâm và nhấp nháy phát sáng gold mờ định vị. Hỗ trợ dịch thuật 3 ngôn ngữ (VI/ZH/EN) tự động đồng bộ hóa mượt mà.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: dich-vu.html
- Các hàm (functions) và logic đã thêm/sửa:
    + dich-vu.html: Cập nhật và tinh chỉnh nội dung trang Dịch vụ theo yêu cầu của đối tác:
        * 1. 6 Nhóm Dịch Vụ Trọn Gói (One-stop Service): Cập nhật mô tả ngắn gọn, súc tích và chuẩn hóa thuật ngữ tiếng Việt, tiếng Trung và tiếng Anh cho các dịch vụ Kết nối B2B, Xúc tiến đầu tư, Tư vấn pháp lý – thuế, Nghiên cứu thị trường, Phiên dịch & Văn hóa, Sự kiện & Đoàn doanh nghiệp.
        * 2. Quy trình hỗ trợ tiêu chuẩn 5 bước: Cập nhật nội dung chi tiết của 5 bước từ Tiếp nhận yêu cầu, Tư vấn ban đầu, Đề xuất giải pháp, Triển khai, đến Theo dõi sau kết nối với thời gian phản hồi chuẩn 48 giờ.
        * 3. Chương trình hội viên VCEC (Membership Tiers): Điều chỉnh gói định vị cho các hội viên: Bronze (Cơ bản), Silver (Doanh nghiệp), Gold (Đối tác chiến lược) cùng hệ thống đặc quyền chuẩn hóa.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: co-hoi.html
- Các hàm (functions) và logic đã thêm/sửa:
    + co-hoi.html: Tái cấu trúc và thiết kế toàn diện trang Cơ Hội Đầu Tư thành cổng thông tin FDI & B2B quy mô lớn:
        * 1. Banner & Hook: Tạo dải màu chuyển sắc hoàng gia sâu rộng cùng Tuyên cáo: "Việt Nam: điểm đến chiến lược cho dòng vốn Trung Quốc trong kỷ nguyên dịch chuyển chuỗi cung ứng."
        * 2. Vì sao đầu tư vào Việt Nam?: Thiết kế 6 thẻ lợi thế chiến lược cốt lõi (Vị trí cửa ngõ, Mạng lưới 16+ FTA, Ổn định chính trị, Nhân lực trẻ, Hạ tầng đồng bộ, Chuyển đổi xanh) đi kèm icon vector SVG tinh xảo và phản hồi hover phát sáng.
        * 3. Danh mục 12 dự án FDI mẫu: Xây dựng cấu trúc dữ liệu 12 dự án FDI trọng điểm trải đều 8 lĩnh vực hợp tác và 3 miền Bắc - Trung - Nam. Tích hợp thanh bộ lọc thông minh (Lĩnh vực | Vùng miền | Quy mô vốn | Hình thức đầu tư) bằng Javascript xử lý tức thời. Mỗi thẻ dự án chứa đầy đủ trạng thái động (Đang kêu gọi | Đã quan tâm | Đang đàm phán) và nút phản hồi nhanh tự động điền vào mẫu đăng ký.
        * 4. Bản đồ KCN & Khu kinh tế tương tác: Thiết kế cụm định vị thông tin 4 địa bàn trọng điểm (Cửa khẩu biên mậu, KCNC quốc gia Hòa Lạc/SHTP, Cảng nước sâu DEEP C/Đình Vũ, và Cụm linh kiện Bắc Ninh/Bắc Giang) có khả năng tương tác hiển thị thông số và thế mạnh chuyên sâu tức thì khi chọn.
        * 5. Khung chính sách ưu đãi đầu tư: Trực quan hóa chính sách thuế TNDN đặc biệt (miễn 4 giảm 9), miễn thuế nhập khẩu tài sản cố định, ưu đãi miễn giảm tiền thuê đất và quy trình một cửa "luồng xanh" dưới dạng bảng dữ liệu chuyên nghiệp có phản hồi hover dòng.
        * 6. Biểu mẫu tư vấn Glassmorphism: Tích hợp Lead capture form trên nền royal gradient kết nối trực tiếp với client Supabase để lưu trữ thông tin lead doanh nghiệp vào bảng `vcec_leads`, đi kèm WeChat success popup modal đồng bộ.
        * 7. Hỗ trợ Đa ngôn ngữ (VI/ZH/EN): Tích hợp trọn vẹn từ điển dịch thuật 3 ngôn ngữ đồng bộ hóa hoàn hảo với sự kiện `vcec-lang-change`.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: dich-vu.html
- Các hàm (functions) và logic đã thêm/sửa:
    + dich-vu.html: Tái cấu trúc và nâng cấp toàn diện trang Dịch Vụ & Hội Viên:
        * 1. 6 Nhóm Dịch Vụ Trọn Gói (One-stop Service): Thiết kế lưới 3 cột hiển thị các nhóm dịch vụ từ Kết nối B2B, Xúc tiến đầu tư, Pháp lý & Thuế, Nghiên cứu thị trường, Phiên dịch & Văn hóa đến Sự kiện & Đoàn doanh nghiệp. Mỗi thẻ có hiệu ứng di chuột (hover state) nâng cao, đường viền phát sáng đỏ son và SVG vector tùy biến tuyệt đẹp.
        * 2. Quy trình hỗ trợ tiêu chuẩn 5 bước: Thiết kế dòng thời gian (timeline) 5 bước dọc trực quan, trang trí bằng dải nối gradient đỏ-vàng hoàng gia và các nút chấm tỏa sáng động khi cuộn chuột.
        * 3. Chương trình hội viên VCEC (Membership Tiers): Trực quan hóa 3 phân khúc hội viên cốt lõi: Hội viên Bronze (Cơ bản), Hội viên Silver (Tăng tốc), và Hội viên Gold (Đối tác chiến lược VIP). Gói Gold được bao bọc bởi dải viền lấp lánh màu vàng Gold vương giả và nhãn đề xuất VIP nổi bật.
        * 4. Biểu mẫu đăng ký tư vấn Glassmorphic (B2B Lead Form): Tích hợp biểu mẫu đăng ký chuyên sâu đặt trên nền chuyển sắc đỏ son - vàng đặc trưng. Tích hợp trực tiếp dữ liệu đăng ký với cơ sở dữ liệu `vcec_leads` của Supabase, lưu trữ an toàn thông tin liên lạc và nhu cầu của đối tác.
        * 5. WeChat Success Popup Modal: Hiển thị ngay sau khi gửi lead thành công, cung cấp mã QR WeChat hỗ trợ khẩn cấp 24/7 và thông tin kết nối trực tiếp với tài khoản hỗ trợ.
        * 6. Chuyển đổi Đa ngôn ngữ (VI/ZH/EN): Tích hợp hoàn hảo từ điển song ngữ 3 phiên bản tiếng Việt, tiếng Trung và tiếng Anh, kết nối chặt chẽ với sự kiện hệ thống `vcec-lang-change` để chuyển đổi tức thời không trễ.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

====== MI - START [18/05/2026] ======
- Tên file vừa sửa/tạo mới: linh-vuc-chi-tiet.html
- Các hàm (functions) và logic đã thêm/sửa:
    + linh-vuc-chi-tiet.html: Tái thiết kế toàn diện trang chi tiết mảng hợp tác thành một Cổng thông tin B2B Chiến lược 8 lĩnh vực hợp tác trọng điểm:
        * 1. Hỗ trợ 8 lĩnh vực cốt lõi: Côn bộ đầy đủ chi tiết cho: Logistics & Chuỗi cung ứng, Năng lượng xanh & BESS, Xe điện & Trạm sạc, E-bike sharing, Drone & Robot công nghiệp, Sản xuất thông minh, Nông nghiệp công nghệ cao, Du lịch & Văn hóa.
        * 2. Sidebar & Tab Điều hướng Tương tác: Thiết kế sidebar bám dính (sticky) ở máy tính để bàn và thanh trượt cuộn ngang (mobile swipeable ribbon) ở di động, cho phép chuyển đổi ngay lập tức giữa 8 lĩnh vực với hiệu ứng mờ nhòe chuyển động (smooth fade transition) và tự động đồng bộ hóa deep-link URL (Stateful URL handling).
        * 3. Bố cảnh thị trường cao cấp: Chi tiết từ 3-4 đoạn văn phân tích bối cảnh, tiềm năng phát triển của thị trường Việt Nam kết hợp thế mạnh kỹ nghệ tiên phong của đối tác Trung Quốc.
        * 4. Lưới Cơ hội Song phương & Dịch vụ hỗ trợ VCEC: Trực quan hóa 4 thẻ cơ hội B2B thủy tinh bóng mờ (glassmorphic lift & glow) và 4 dịch vụ cốt lõi hỗ trợ FDI/Xúc tiến thương mại thực chiến của VCEC.
        * 5. Case Study thực chiến điển hình: Bố cục tinh xảo hiển thị dự án điển hình (ví dụ: CATL, BYD, DJI, Hellobike, 365 Group, Sầu riêng Đắk Lắk...), đi kèm thông điệp vàng trích dẫn từ lãnh đạo cấp cao của doanh nghiệp.
        * 6. Biểu mẫu Đăng ký kết nối đầu tư B2B: Tích hợp trực tiếp Lead Capture Form kết nối trực tiếp với client Supabase, tự động chuyển đổi định dạng và lưu trữ thông tin trực tiếp vào bảng `vcec_leads` mà không ảnh hưởng cấu trúc cũ.
        * 7. WeChat Success Popup Modal: Kích hoạt modal thông báo gửi đơn đăng ký thành công đi kèm thông tin hỗ trợ khẩn cấp WeChat ID (VCEC_XuctienFDI_01).
        * 8. Hỗ trợ Đa Ngôn Ngữ đồng bộ: Tích hợp từ điển 3 ngôn ngữ (VI/ZH/EN) cho từng lĩnh vực và tự động lắng nghe sự kiện thay đổi ngôn ngữ `vcec-lang-change` để chuyển đổi tức thời không tải lại trang.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có.
====== MI - END ======

- Tên file vừa sửa/tạo mới: quan-he.html
- Các hàm (functions) và logic đã thêm/sửa:
    + quan-he.html: Tái thiết kế toàn diện trang "Quan hệ Việt - Trung" thành một bản báo cáo chuyên đề / xã luận đặc sắc đẳng cấp cao:
        * 1. Banner & Tuyên ngôn mở đầu: Gradient chuyển màu đỏ - đen hoàng gia sâu lắng, kèm theo Tuyên cáo song phương nổi bật: "Việt Nam – Trung Quốc: Láng giềng hữu nghị, hợp tác toàn diện, ổn định lâu dài, hướng tới tương lai".
        * 2. Khuôn khổ quan hệ chiến lược: Mô tả chi tiết việc nâng tầm thành "Cộng đồng chia sẻ tương lai Việt Nam – Trung Quốc có ý nghĩa chiến lược", với grid 6 thẻ phương hướng lớn ("6 HƠN") có hiệu ứng hover sang trọng.
        * 3. Thành tựu hợp tác kinh tế nổi bật: Xây dựng bảng so sánh kinh tế tài chính tinh tế hiển thị vai trò thương mại song phương, dòng vốn FDI, kết nối hạ tầng giao thông biên mậu, du lịch văn hóa, và hợp tác liên địa phương (hơn 60 cặp tỉnh thành).
        * 4. Các chuyến thăm cấp cao tiêu biểu: Thiết kế dòng thời gian thẳng đứng (Vertical Timeline) ghi nhận chi tiết 5 cột mốc ngoại giao cao cấp tiêu biểu từ 2022 đến 2024 (chuyến thăm của TBT Nguyễn Phú Trọng, Chủ tịch Tập Cận Bình, Thủ tướng Phạm Minh Chính, TBT Chủ tịch nước Tô Lâm, Thủ tướng Lý Cường).
        * 5. Hiệp định & Khuôn khổ hợp tác: Thiết kế cụm 4 thẻ Hiệp định đa phương nổi bật (RCEP, ACFTA, BRI & 2 Hành lang, MoU Bộ Công Thương) với màu vàng gold lấp lánh khi hover.
        * 6. Cơ hội cho doanh nghiệp: Thiết kế block 2 cột so sánh trực quan cơ hội kép cho doanh nghiệp Trung Quốc vào Việt Nam và doanh nghiệp Việt Nam tiếp cận thị trường Trung Quốc.
        * 7. Biểu mẫu đăng ký tư vấn chuyên sâu ngành (B2B Lead Form): Tích hợp trực tiếp biểu mẫu liên hệ đăng ký tư vấn Glassmorphism đẹp mắt ngay dưới cùng, cho phép lưu trữ trực tiếp thông tin lead doanh nghiệp quan tâm đến từng lĩnh vực/ngành hàng vào `vcec_leads` của Supabase.
        * 8. WeChat Success Modal: Tích hợp popup thông báo đăng ký thành công đồng bộ hóa WeChat hỗ trợ khẩn cấp.
    + quan-he.html: Tích hợp đầy đủ bộ dịch 3 ngôn ngữ (VI/ZH/EN) tự động đồng bộ hóa thông qua sự kiện `vcec-lang-change`, giúp thay đổi ngôn ngữ ngay lập tức mà không cần tải lại trang.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: gioi-thieu.html
- Các hàm (functions) và logic đã thêm/sửa:
    + gioi-thieu.html: Tái cấu trúc toàn diện trang "Giới Thiệu VCEC" từ dạng thẻ đơn giản thành một tài liệu báo chí / xã luận (editorial) cực kỳ sang trọng và chuyên nghiệp.
    + gioi-thieu.html: Xây dựng bản đồ dịch song ngữ 3 ngôn ngữ (Việt - Trung - Anh) được kích hoạt ngay lập tức thông qua sự kiện `vcec-lang-change`, đồng bộ hoàn hảo với bộ chuyển đổi ngôn ngữ của toàn hệ thống:
        * 1. Banner trang: Thiết kế dải màu chuyển sắc sâu cuốn hút cùng tiêu đề "GIỚI THIỆU VCEC" và khẩu hiệu: "Một thập niên kết nối – Vạn cơ hội tương lai".
        * 2. Về chúng tôi: Trình bày dạng 2 cột trực quan. Cột trái trích dẫn thông điệp chiến lược của quan hệ song phương, cột phải thể hiện chi tiết vai trò cầu nối của VCEC.
        * 3. Tầm nhìn - Sứ mệnh - Giá trị cốt lõi: Thiết kế thẻ Grid bo góc tinh tế có hiệu ứng nâng nhẹ và hào quang vàng nhạt khi hover. Cụ thể 4 giá trị cốt lõi: CHÍNH DANH, CHUYÊN NGHIỆP, HIỆU QUẢ, BỀN VỮNG.
        * 4. Ban Lãnh đạo & Hội đồng cố vấn: Thiết kế thẻ chân dung Giám đốc (Mr. Đinh Vĩnh Cường) có ảnh biểu trưng vàng kim và mô tả tóm tắt năng lực. Bổ sung cụm 6 Cố vấn cấp cao (FDI, Luật quốc tế, Chuỗi cung ứng, Năng lượng xanh...) giúp gia tăng tối đa sự uy tín và độ tin cậy.
        * 5. Modal liên hệ Ban Lãnh đạo & Cố vấn: Tích hợp trực tiếp form đăng ký kết nối Glassmorphism tuyệt đẹp, cho phép gửi yêu cầu trực tiếp của doanh nghiệp và đồng bộ tự động vào cơ sở dữ liệu `vcec_leads` của Supabase.
        * 6. Mạng lưới đối tác: Thiết kế bảng lưới logo đối tác phân theo 4 nhóm chuyên biệt (Ngoại giao, Hiệp hội, Doanh nghiệp, Ngân hàng) với hiệu ứng chuyển thang xám sang màu đầy sống động khi di chuột qua.
        * 7. Lịch sử hình thành: Thiết kế dòng thời gian nằm ngang (Horizontal Scroll) với các cột mốc lịch sử đột phá từ 2015 đến 2024 vô cùng ấn tượng.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Gỡ bỏ hoàn toàn mục "Quick Action Call To Action" dư thừa (Section 4 cũ hiển thị tiêu đề "Cơ Hội Đầu Tư" kèm mô tả hệ thống tự động gán hồ sơ 15 phút). Phần này đã được thay thế trọn vẹn và tối ưu hơn bởi biểu mẫu Đăng ký hỗ trợ nhanh (Section 3e mới) và Footer toàn cục 4 cột, giúp giao diện trang chủ VCEC trở nên cô đọng, chuyên nghiệp và tránh lặp lại thông tin.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: app.js, style.css
- Các hàm (functions) và logic đã thêm/sửa:
    + app.js: Hoàn thiện hàm kết xuất Footer toàn cục `renderFooter()`. Tự động phát hiện ngôn ngữ hoạt động (`currentLang`) để render trọn vẹn 4 cột nội dung song ngữ chuẩn chỉ:
        * Cột 1 – Thông tin VCEC: Hiển thị logo, Tên đầy đủ VN/CN/EN, Slogan song ngữ chuyển sắc óng ánh, địa chỉ 2 văn phòng đại diện (Hà Nội, Thâm Quyến), Hotline, Email và cụm biểu tượng mạng xã hội (Facebook, LinkedIn, WeChat WX có Tooltip QR, Zalo OA, YouTube).
        * Cột 2 – Liên kết nhanh: Giới thiệu, Lĩnh vực, Cơ hội đầu tư, Tin tức, Liên hệ.
        * Cột 3 – Đối tác chiến lược: Tập đoàn 365, VIENC, Hiệp hội Doanh nghiệp Việt - Trung, và các Ngân hàng đối tác lớn (ICBC, VietinBank).
        * Cột 4 – Đăng ký nhận bản tin: Hộp nhập email glassmorphism + nút bấm Đăng ký song ngữ.
    + app.js: Xây dựng hàm gửi bản tin `handleNewsletterSubmit(event)`. Thu thập email người dùng đăng ký bản tin và đẩy trực tiếp vào bảng `vcec_leads` trên Supabase dưới dạng một lead độc lập, giúp lưu giữ đầy đủ danh sách độc giả tiềm năng phục vụ các bản tin FDI quý mà không làm ảnh hưởng đến cơ sở dữ liệu cũ.
    + style.css: Phát triển ngôn ngữ thiết kế sang trọng tối thượng cho Footer:
        * Phông nền Gradient tối huyền ảo pha sắc đỏ sâu (`linear-gradient(180deg, #1C0E11 0%, #11080A 100%)`) cùng dải phân cách chỉ vàng gold (`border-top: 3px solid var(--vcec-gold)`).
        * Cấu trúc lưới linh động `.footer-grid` chia 4 cột cân bằng hoàn hảo (`2fr 1fr 1.2fr 1.4fr`).
        * Thiết kế nút mạng xã hội tròn mịn màng, hover chuyển màu vàng kim óng ánh, nâng cao nhẹ mặt phẳng (`translateY(-3px)`) và đổ bóng nhẹ.
        * Phát triển hệ thống tooltip nổi WeChat: Di chuột vào biểu tượng WeChat sẽ lập tức hiển thị nhãn WeChat ID phụ trách vô cùng chuyên nghiệp.
        * Căn chỉnh liên kết đáy footer: Thiết kế dòng copyright tinh tế nằm thẳng hàng với các liên kết chính sách bảo mật, điều khoản sử dụng, sơ đồ trang web cùng hiệu ứng đổi màu êm ái khi di chuột qua.
        * Đồng bộ Responsive hoàn mỹ: Tự động gom thành 2 cột trên máy tính bảng (dưới 992px) và 1 cột thẳng đứng trên thiết bị di động (dưới 768px), căn giữa toàn bộ đáy footer tạo trải nghiệm thị giác vững chãi, cân đối.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, style.css, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Bổ sung mục "Đăng Ký Hỗ Trợ Nhanh" (Section 3e) ngay trước phần CTA dưới cùng của trang chủ VCEC, thu thập các thông tin: Họ tên, Doanh nghiệp, Quốc gia (Dropdown), Email/SĐT/WeChat, Lĩnh vực quan tâm (8 lĩnh vực chọn nhanh) và Nội dung cần hỗ trợ.
    + index.html: Bổ sung cấu trúc mã nguồn Popup QR WeChat (`success-modal`) đồng bộ với hệ thống trang con, tự động kích hoạt hiển thị khi gửi đơn đăng ký hỗ trợ thành công.
    + index.html (JS): Lập trình hàm thu thập dữ liệu độc lập `handleQuickSupportSubmit(event)`. Hàm tự động đóng gói toàn bộ các lĩnh vực quan tâm và ghi chú phụ thành chuỗi ký tự mô tả đầy đủ để đẩy vào trường `project_name` của bảng `vcec_leads` trên Supabase mà không làm thay đổi cấu trúc bảng cũ, đảm bảo an toàn tuyệt đối cho hệ thống dữ liệu hiện tại.
    + style.css: Thiết kế giao diện sang trọng bậc nhất cho toàn bộ khu vực đăng ký hỗ trợ nhanh:
        * Phông nền Gradient chuyển sắc hoàng gia đỏ son pha vàng champagne (`linear-gradient(135deg, #7A0C1E 0%, #A81B34 50%, #B28834 100%)`) cùng lớp phủ mạng lưới họa tiết chìm (`radial-gradient`).
        * Khung biểu mẫu Glassmorphic đặc biệt `.support-quick-wrapper` làm mờ phông nền (`blur(20px)`), viền mỏng trắng bóng mờ, đổ bóng siêu rộng và có vầng hào quang vàng mờ sang quý.
        * Các nhãn nhập liệu `.label-qs` bằng chữ vàng gold viết hoa nổi bật. Các ô nhập liệu, dropdown chọn quốc gia và ô văn bản có thiết kế trong suốt sang trọng, hiển thị chữ trắng tinh tế.
        * Bộ nút chọn nhanh 8 lĩnh vực ưu tiên (`.sector-checkbox-btn`) thay thế hoàn toàn cho select box truyền thống: tự động đổi sang màu vàng gold đậm nổi bật khi được click chọn, tạo trải nghiệm tương tác chạm (tactile touch) vô cùng nhạy bén và hiện đại.
        * Nút gửi đơn đăng ký `.btn-qs-submit` vàng kim sang trọng, có hiệu ứng hover nâng cao mặt phẳng, đổ bóng phát sáng lộng lẫy và giảm nhẹ độ lún khi nhấn chuột.
        * Thiết kế responsive tối ưu hóa hoàn hảo: Tự động dàn trang từ 2 cột sang 1 cột đơn và co cụm lưới 8 lĩnh vực từ 4 cột sang 2 cột hoặc 1 cột tùy kích thước màn hình để đảm bảo dễ nhập liệu nhất trên di động.
    + app.js: Định nghĩa dịch thuật trọn vẹn 3 ngôn ngữ (Việt - Trung - Anh) cho tiêu đề mục Đăng ký hỗ trợ nhanh, toàn bộ nhãn biểu mẫu, tên các quốc gia, các nút cảnh báo hợp lệ và nút submit gửi yêu cầu.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, style.css, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Bổ sung mục "Tin Tức Mới Nhất" (Section 3d) ngay phía trên phần Quick Action CTA, hiển thị 3 nhóm bài viết chính: Tin VCEC, Chính sách & Thương mại, và Sự kiện sắp diễn ra.
    + index.html (JS): Xây dựng thuật toán gom nhóm thông minh (`groupNews`) phân loại bài viết được tải về từ Supabase dựa trên từ khóa tiêu đề (hoặc gán tuần tự nếu dữ liệu thiếu hụt), thiết lập hệ thống bài viết dự phòng chất lượng cao (`staticFallbacks`) để giao diện hiển thị ngay lập tức không bị trễ hay lỗi nếu mạng yếu hoặc database đang tải.
    + style.css: Tạo kiểu dáng hiện đại cho lưới bài viết `.news-latest-grid`:
        * Thẻ `.news-latest-card` có hiệu ứng hover nâng cao `.translateY(-8px)`, phủ bóng đổ đỏ mờ sang trọng `.shadow-red-glow`.
        * Lớp ảnh `.news-latest-img` tự động thu phóng chậm (slow-zoom) khi di chuột.
        * Các huy hiệu phân loại tuyệt đẹp tương ứng cho từng nhóm: `.badge-vcec` (đỏ gradient viền vàng), `.badge-policy` (xanh đen phiến đá viền vàng), và `.badge-events` (vàng champagne viền đỏ).
        * Định dạng khắt khe chiều cao dòng của tiêu đề (chuẩn 2 dòng) và mô tả tóm tắt bài viết (chuẩn 3 dòng) để lưới bài viết luôn đồng đều, hoàn hảo.
        * Tối ưu hiển thị Responsive chuẩn mực: Tự động gom thành 2 cột trên máy tính bảng (dưới 1024px) và 1 cột đứng trên điện thoại di động (dưới 768px).
    + app.js: Định nghĩa thêm bộ từ khóa dịch thuật đa ngôn ngữ (Tiếng Việt, Tiếng Trung, Tiếng Anh) cho toàn bộ tiêu đề mục Tin tức mới nhất, tên của 3 nhóm tin tức và nút hành động "Xem tất cả" / "Xem bài viết".
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, style.css, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Bổ sung mục "Câu chuyện thành công" (Section 3c) hiển thị 3 case study dự án song phương tiêu biểu được VCEC hỗ trợ đầu tư thực chiến thành công.
    + index.html: Lập trình hệ thống chuyển đổi slide (băng chuyền) tự động chạy chu kỳ 8 giây (Autoplay), kết hợp nút bấm di chuyển trái/phải (`Next`/`Prev`) và 3 nút chấm điều hướng (`Dots`) vô cùng nhạy bén và chuẩn mực.
    + style.css: Xây dựng thiết kế giao diện độc đáo cho thẻ case study `.success-story-card`:
        * Phân tách 2 cột thông tin gồm: Cột trái thể hiện vai trò hỗ trợ của VCEC giới hạn nghiêm ngặt 3 dòng chữ, Cột phải hiển thị phần Trích dẫn testimonial (`.story-quote`) lồng ghép nền nhẹ màu đỏ nhạt phối hợp cùng đường viền vàng champagne sang trọng.
        * Sáng tạo cụm logo lồng nhau độc quyền (`.interlocking-logos`) gồm logo đối tác VN (`.logo-vn` - đỏ gradient viền vàng) và đối tác Trung Quốc (`.logo-cn` - vàng gradient viền đỏ) cùng biểu tượng bắt tay 🤝 chuyển động theo nhịp đập (`pulseHandshake`) vô cùng bắt mắt mà không cần tải thêm bất kỳ file ảnh rời nào ngoài dự án.
        * Hỗ trợ thiết kế Responsive đầy đủ: Chuyển đổi thành một khối dọc thống nhất, tối ưu trải nghiệm đọc trên các thiết bị di động có chiều rộng nhỏ hơn 992px.
    + app.js: Cập nhật đầy đủ từ vựng dịch thuật 3 ngôn ngữ (Việt, Trung, Anh) cho toàn bộ tiêu đề, nhãn hiệu, mô tả chi tiết vai trò của VCEC và danh tính/chức vụ cụ thể của lãnh đạo doanh nghiệp trong cả 3 case study thực tế (gồm Shenzhen Intelligent Warehousing - Hải Phòng, Trina Solar & Sông Đà Energy - Bình Thuận, và Goertek Electronics - Bắc Ninh).
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, style.css, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Bổ sung khối "Quan Hệ Việt - Trung" (Section 3b) ngay bên dưới phần 8 Lĩnh vực hợp tác trọng điểm, cấu trúc 2 cột cao cấp gồm thông điệp chiến lược bên trái và băng chuyền (carousel) chuyến thăm cấp cao bên phải.
    + index.html: Viết mã nguồn Javascript thuần tự động chạy carousel mượt mà, hỗ trợ nút bấm điều khiển Next/Prev và hệ thống các điểm tròn chỉ mục (dots) tương tác sống động, có cơ chế tự động chuyển slide sau mỗi 6 giây.
    + style.css: Tạo hệ thống CSS cao cấp chuyên nghiệp cho phần mới: thiết kế `.strategic-message-card` với viền đỏ hoàng gia và dải màu chuyển sắc sang trọng cùng hiệu ứng bóng đổ `.shadow-red-glow` khi hover; lập trình hiệu ứng ảnh động Ken Burns phóng to cực chậm cho `.visit-img` giúp banner trở nên vô cùng sống động; tối ưu hóa giao diện đa thiết bị tự động chuyển sang 1 cột trên màn hình điện thoại di động và máy tính bảng nhỏ.
    + app.js: Bổ sung trọn bộ dịch thuật đa ngôn ngữ (Tiếng Việt, Tiếng Trung, Tiếng Anh) cho toàn bộ tiêu đề, thông điệp chiến lược và chi tiết 3 sự kiện chuyến thăm lịch sử cấp cao nổi bật (Hà Nội 12/2023, Bắc Kinh 08/2024, Hà Nội 10/2024), giúp tương thích hoàn hảo với hệ thống đa ngôn ngữ tự động của VCEC.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, style.css, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Bổ sung cấu trúc HTML cho phần "Tại sao chọn VCEC" (`.why-grid` và `.why-card`) ngay bên dưới 4 chỉ số thống kê.
    + style.css: Thiết kế bộ CSS chuyên nghiệp, cao cấp cho 4 thẻ `.why-card` có hiệu ứng hover mượt mà nâng tầm trải nghiệm, chuyển màu và xoay nhẹ icon đầy sinh động. Tích hợp media queries cho màn hình máy tính bảng (`max-width: 1024px` chia thành 2 cột) và điện thoại di động (`max-width: 768px` chia thành 1 cột dọc).
    + app.js: Thêm đầy đủ từ khóa dịch thuật đa ngôn ngữ (Tiếng Việt, Tiếng Trung, Tiếng Anh) cho tiêu đề, mô tả và nội dung chi tiết của cả 4 thẻ "Tại sao chọn VCEC".
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Loại bỏ hoàn toàn khối hộp chọn tìm kiếm tiêu chí (`.search-widget`) khỏi trang chủ index.html theo yêu cầu.
    + index.html: Cập nhật 4 thẻ chỉ số thống kê chiến lược ở mục thống kê (Strategic Statistics Section) thành các giá trị mới: "Top 1", "250+", "8", "15+".
    + app.js: Cập nhật nội dung dịch thuật đa ngôn ngữ (Vietnamese, Chinese, English) cho 4 khóa thống kê tương ứng (`stat-fdi-title`, `stat-kcn-title`, `stat-b2b-title`, `stat-province-title`) với các nhãn dữ liệu thực chiến cực kỳ chuyên nghiệp.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

====== MI - START ======
- Tên file vừa sửa/tạo mới: index.html, style.css, app.js
- Các hàm (functions) và logic đã thêm/sửa:
    + index.html: Thay đổi giao diện banner của trang chủ, dời phần khung chọn tìm kiếm nhanh (Search Criteria widget) xuống ngay dưới banner như một section độc lập. Thêm 2 nút Call to Action ("Tìm đối tác" và "Khám phá cơ hội đầu tư") vào banner chính.
    + style.css: Bổ sung lớp style `.hero-buttons` phục vụ sắp xếp flex và khoảng cách cho 2 nút Call to Action của Banner.
    + app.js: Cập nhật từ điển dịch thuật đa ngôn ngữ (Vietnamese, Chinese, English) cho các khóa `hero-title`, `hero-desc`, `btn-find-partner`, `btn-explore-opp` để hiển thị tiêu đề và nút mới hoàn hảo đa ngôn ngữ.
- Lưu ý quan trọng cho KA nếu cần xử lý backend: Không có
====== MI - END ======

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


====== KA - START ======
## [18/05/2026] Tin Tức & Sự Kiện Page Redesign (tin-tuc.html & bai-viet-chi-tiet.html)

**Mục tiêu:** Hoàn thiện nâng cấp trang Tin tức & Sự kiện thành giao diện cao cấp hai khu vực chính (Sự kiện sắp diễn ra + Tin tức chuyên mục) theo yêu cầu cụ thể của MIKE.

---

### Files đã sửa / tạo mới:

**`tin-tuc.html`** ← **Overhauled to high-fidelity design system**
1. **Sự kiện sắp diễn ra (Phần trên):**
   - Thiết kế dạng Lịch trình / Grid 4 cột cân xứng với huy hiệu Ngày/Tháng phong cách Executive và thẻ Trạng thái nhấp nháy "Đang mở đăng ký".
   - Nút "Đăng ký tham gia" liên kết trực tiếp với Form đăng ký Glassmorphism Modal.
2. **Tin tức chuyên mục (Phần dưới):**
   - Thanh bộ lọc (Filter Bar) dạng viên thuốc (pills) bo góc cực đẹp chạy mượt mà, hỗ trợ cuộn ngang trên mobile.
   - Hiển thị đầy đủ **6 chuyên mục tin tức** theo đúng mô tả: *Hoạt động VCEC, Quan hệ Việt - Trung, Chính sách & Pháp luật, Thương mại & Đầu tư, Phân tích ngành, Câu chuyện doanh nghiệp*.
   - Hỗ trợ ô Tìm kiếm bài viết nhanh bằng tiếng Việt/Trung/Anh.
3. **Lead Capture & WeChat Scanner Modal:**
   - Khi bấm Đăng ký Sự kiện, modal tự động điền sẵn sự kiện đã chọn, lưu trữ thông tin doanh nghiệp (`company_name`, `contact_name`, `wechat_id`, `project_id`, `project_name` chứa SĐT người đại diện) trực tiếp vào bảng `vcec_leads` của Supabase.
   - Khi gửi thành công, kích hoạt Popup quét mã QR WeChat B2B tư vấn 24/7 sang trọng.
4. **Smart Category Classification Engine:**
   - Viết thuật toán phân loại bài viết tự động từ cơ sở dữ liệu Supabase dựa trên từ khóa tiêu đề/tóm tắt hoặc category gốc để đưa vào đúng 6 nhóm chuyên mục tin tức.
   - Tích hợp 6 bài viết hạt giống (seed articles) dịch đa ngữ đầy đủ nội dung thực tế để đảm bảo chất lượng giao diện luôn cao cấp nhất ngay cả khi cơ sở dữ liệu trống.

**`bai-viet-chi-tiet.html`** ← **Hỗ trợ bài viết fallback ngoại tuyến**
- Cập nhật hàm `loadPost()` để nhận diện tham số `fallback_id` khi người dùng đọc các bài viết hạt giống của trang Tin Tức.
- Chèn bộ dữ liệu song ngữ đầy đủ của 6 bài viết fallback tương ứng, loại bỏ hoàn toàn lỗi 404 và đảm bảo tính liên kết xuyên suốt 100% của website.

---

### Lưu ý cho MI:
- Form đăng ký sự kiện kết nối trực tiếp với bảng `vcec_leads` của Supabase. Bất kỳ lượt đăng ký nào đều được ghi nhận thời gian thực và đẩy về trang quản trị ERP của VCEC.
- Biểu tượng QR WeChat lưu ở `public/WeChat_QR.jpg`. MI hãy thay tệp ảnh này bằng mã QR thật của VCEC để hoàn thành trải nghiệm.
====== KA - END ======


====== KA - START ======
## [18/05/2026] Tài Nguyên & Kiến Thức Overhaul (tai-nguyen.html)

**Mục tiêu:** Cải tạo toàn diện trang Tài Nguyên (`tai-nguyen.html`) theo đúng thiết kế và yêu cầu cụ thể tại Trang 8 ("TÀI NGUYÊN & KIẾN THỨC").

---

### Files đã sửa:

**`tai-nguyen.html`** ← **Fully redesigned to professional Editorial & Lead Magnet system**
1. **Mục đích & Phễu thu thập Lead (Mục 8.1):**
   - Thiết lập cơ chế tải tài liệu yêu cầu xác thực thông tin liên hệ (Email & Số điện thoại / WeChat ID).
   - Tích hợp **B2B Lead Magnet Modal** mượt mà. Khi người dùng bấm nhận tài nguyên, modal hiện ra thu thập thông tin doanh nghiệp.
   - Kết nối trực tiếp với bảng `vcec_leads` trên Supabase:
     * `project_id`: `LEAD_MAG_<GROUP_KEY>`
     * `project_name`: `[TÀI NGUYÊN] Yêu cầu <Tên nhóm tài nguyên> (SĐT/WeChat: <SĐT>)`
   - Khi gửi thành công, modal chuyển sang trạng thái **Xác minh thành công** và hiển thị hộp tải xuống (simulated download box) chứa các tệp tài liệu giả định chất lượng cao (`.pdf`, `.jpg`, `.mp3`, `.mp4`) kèm thông số dung lượng thực tế để người dùng bấm tải về.
2. **6 Nhóm tài nguyên (Mục 8.2):**
   - Thay thế thư viện cũ bằng lưới thẻ 3 cột cao cấp hiển thị đầy đủ 6 nhóm tài nguyên:
     * *Báo cáo thị trường* (logistics, EV, BESS, drone, nông sản, du lịch)
     * *Cẩm nang đầu tư* (FDI Việt Nam cho DN Trung Quốc, Xuất khẩu sang Trung Quốc cho DN Việt)
     * *Văn bản pháp lý* (Luật, nghị định, thông tư đầu tư Việt - Trung)
     * *Thư viện video* (Phỏng vấn chuyên gia, hội thảo, giới thiệu doanh nghiệp)
     * *Infographic* (kim ngạch, sản phẩm chủ lực, tỉnh thành FDI)
     * *Podcast / Webinar* (Podcast "Cầu nối Việt – Trung" hàng tháng)
   - Tất cả thẻ đều có icon vector Champagne Gold sang trọng, hiệu ứng hover đổi màu và viền đỏ Vermilion Red nổi bật.
3. **Mục Hỏi & Đáp FAQ (Mục 8.3):**
   - Tích hợp hệ thống accordion Hỏi & Đáp quy mô lớn nhằm tối ưu hóa SEO và giảm tải cho ban tư vấn.
   - Chia làm **4 nhóm chủ đề** trực quan dạng Tabs chuyển đổi nhanh:
     * *Về VCEC và dịch vụ* (5 FAQs)
     * *Đầu tư Trung Quốc vào Việt Nam* (5 FAQs)
     * *Xuất khẩu Việt Nam sang Trung Quốc* (5 FAQs)
     * *Pháp lý – thuế – thị thực* (5 FAQs)
   - Đầy đủ **20 câu hỏi và câu trả lời thực tế, chi tiết** được dịch thuật và hiển thị hoàn hảo ở cả 3 ngôn ngữ (Tiếng Việt, Tiếng Trung, Tiếng Anh).
   - Thiết kế accordion với hiệu ứng mở rộng mượt mà bằng Javascript (`scrollHeight`) và icon chuyển động xoay 45 độ tinh tế.

---

### Lưu ý cho MI:
- Form đăng ký tải tài liệu được liên kết 100% với bảng `vcec_leads` của Supabase. Dữ liệu hội viên thu thập sẽ tự động đẩy về hệ thống quản trị CRM ERP của VCEC.
- Các liên kết tải tệp trong trạng thái thành công đang chạy hàm giả định `alert()`. MI có thể cấu hình các đường dẫn PDF thật vào mảng `mockFiles` của mã nguồn để hoàn tất trải nghiệm tải xuống thực tế.
====== KA - END ======


