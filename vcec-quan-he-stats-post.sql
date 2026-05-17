-- Insert bài "Số Liệu Hợp Tác Việt - Trung" vào vcec_posts
-- Bài này hiển thị ở khu vực thống kê trên trang quan-he.html (không phải timeline)
-- MIKE chạy 1 lần trong Supabase SQL Editor

INSERT INTO public.vcec_posts (
  category, status, author,
  title_vi, title_zh, title_en,
  summary_vi, summary_zh, summary_en,
  content_vi, content_zh, content_en,
  created_at
) VALUES (
  'quan-he-viet-trung',
  'published',
  'vcec_sadmin',

  'Số Liệu Hợp Tác Việt - Trung',
  '越南-中国贸易统计数据',
  'Vietnam-China Trade Statistics',

  'Kim ngạch thương mại song phương Việt Nam – Trung Quốc giai đoạn 2021–2025 (Tỷ USD)',
  '2021-2025年越南-中国双边贸易额（十亿美元）',
  'Vietnam-China bilateral trade volume 2021–2025 (Billion USD)',

  '<h3>Kim Ngạch Thương Mại Song Phương (Tỷ USD)</h3>
<table>
  <thead>
    <tr>
      <th>Năm</th>
      <th>VN Xuất Khẩu</th>
      <th>VN Nhập Khẩu</th>
      <th>Tổng Kim Ngạch</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>2021</td><td>56 tỷ USD</td><td>110 tỷ USD</td><td>166 tỷ USD</td></tr>
    <tr><td>2022</td><td>59 tỷ USD</td><td>118 tỷ USD</td><td>177 tỷ USD</td></tr>
    <tr><td>2023</td><td>61 tỷ USD</td><td>111 tỷ USD</td><td>172 tỷ USD</td></tr>
    <tr><td>2024</td><td>70 tỷ USD</td><td>135 tỷ USD</td><td>205 tỷ USD</td></tr>
    <tr><td>2025 (Dự kiến)</td><td>80 tỷ USD</td><td>150 tỷ USD</td><td>230 tỷ USD</td></tr>
  </tbody>
</table>
<p><em>Nguồn: Tổng cục Hải quan Việt Nam &amp; Bộ Thương mại Trung Quốc.</em></p>',

  '<h3>双边贸易额（十亿美元）</h3>
<table>
  <thead>
    <tr>
      <th>年份</th>
      <th>越南出口</th>
      <th>越南进口</th>
      <th>贸易总额</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>2021</td><td>560亿美元</td><td>1100亿美元</td><td>1660亿美元</td></tr>
    <tr><td>2022</td><td>590亿美元</td><td>1180亿美元</td><td>1770亿美元</td></tr>
    <tr><td>2023</td><td>610亿美元</td><td>1110亿美元</td><td>1720亿美元</td></tr>
    <tr><td>2024</td><td>700亿美元</td><td>1350亿美元</td><td>2050亿美元</td></tr>
    <tr><td>2025（预计）</td><td>800亿美元</td><td>1500亿美元</td><td>2300亿美元</td></tr>
  </tbody>
</table>
<p><em>来源：越南海关总局 &amp; 中国商务部。</em></p>',

  '<h3>Bilateral Trade Volume (Billion USD)</h3>
<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>VN Exports</th>
      <th>VN Imports</th>
      <th>Total Trade</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>2021</td><td>$56B</td><td>$110B</td><td>$166B</td></tr>
    <tr><td>2022</td><td>$59B</td><td>$118B</td><td>$177B</td></tr>
    <tr><td>2023</td><td>$61B</td><td>$111B</td><td>$172B</td></tr>
    <tr><td>2024</td><td>$70B</td><td>$135B</td><td>$205B</td></tr>
    <tr><td>2025 (Est.)</td><td>$80B</td><td>$150B</td><td>$230B</td></tr>
  </tbody>
</table>
<p><em>Source: Vietnam General Department of Customs &amp; China Ministry of Commerce.</em></p>',

  '2020-01-01T00:00:00Z'
);
