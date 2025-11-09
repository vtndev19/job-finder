# Hướng dẫn kiểm tra trang Admin

## Cách chạy và truy cập

### 1. Khởi động Development Server

```bash
cd frontend
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

### 2. Truy cập trang Admin

Sau khi server đã chạy, mở trình duyệt và truy cập:

- **Dashboard**: http://localhost:3000/admin
- **Dashboard (đầy đủ)**: http://localhost:3000/admin/dashboard
- **Quản trị người dùng**: 
  - Ứng viên: http://localhost:3000/admin/users/candidates
  - Nhà tuyển dụng: http://localhost:3000/admin/users/employers
  - Quản trị viên: http://localhost:3000/admin/users/admins
- **Quản lý việc làm**: http://localhost:3000/admin/jobs
- **Quản lý ứng tuyển**: http://localhost:3000/admin/applications
- **Quản lý nội dung**: http://localhost:3000/admin/content
- **Quản lý AI**: http://localhost:3000/admin/ai
- **Thông báo**: http://localhost:3000/admin/notifications
- **Hỗ trợ**: http://localhost:3000/admin/support
- **Kiểm duyệt**: http://localhost:3000/admin/moderation
- **Cài đặt**: http://localhost:3000/admin/settings
- **Logs**: http://localhost:3000/admin/logs
- **Bảo mật**: http://localhost:3000/admin/security

## Các tính năng có thể kiểm tra

### ✅ Dashboard
- Xem thống kê tổng quan
- Xem các biểu đồ (placeholder)
- Xem bảng dữ liệu gần đây

### ✅ Quản trị người dùng
- Tìm kiếm và lọc người dùng
- Xem danh sách ứng viên/nhà tuyển dụng/admin
- Thao tác: Xem, Sửa, Khóa/Mở khóa, Xóa

### ✅ Quản lý việc làm
- Xem danh sách tin tuyển dụng
- Lọc theo trạng thái và mức độ ưu tiên
- Phát hiện spam (spam score)
- Duyệt/từ chối tin

### ✅ Quản lý ứng tuyển
- Xem thống kê ứng tuyển
- Theo dõi trạng thái ứng tuyển
- Xem chi tiết hồ sơ

### ✅ Quản lý nội dung
- Quản lý blog/bài viết
- Quản lý tin tức
- Quản lý bình luận
- Quản lý banner/popup
- Quản lý FAQ/chính sách

### ✅ Quản lý AI
- Quản lý dữ liệu huấn luyện
- Chỉnh sửa prompt
- Quản lý workflow AI
- Xem các mô hình AI

### ✅ Cài đặt hệ thống
- Cấu hình AI
- Cấu hình tìm kiếm
- Cấu hình Email SMTP
- Cấu hình Caching
- Cấu hình Rate Limiting
- Quản lý Cronjobs

### ✅ Logs & Monitoring
- Xem log lỗi
- Xem log đăng nhập
- Xem log API AI
- Xem Audit Log
- Xem log thanh toán

### ✅ Bảo mật
- Cài đặt 2FA
- Quản lý Session timeout
- Quản lý IP Whitelist/Blacklist
- Theo dõi cảnh báo
- Phân quyền

## Responsive Design

Trang admin hỗ trợ responsive trên:
- ✅ Desktop (full sidebar)
- ✅ Tablet (sidebar có thể toggle)
- ✅ Mobile (sidebar có thể toggle với overlay)

## Lưu ý

1. **Dữ liệu hiện tại**: Tất cả dữ liệu đang là mock data (dữ liệu giả) để demo
2. **Authentication**: Hiện tại chưa có authentication, có thể truy cập trực tiếp
3. **Backend**: Cần tích hợp với backend để có dữ liệu thật
4. **Icons**: Sử dụng Font Awesome, đảm bảo đã import trong HTML

## Troubleshooting

### Lỗi không tìm thấy route
- Kiểm tra xem đã import đúng các component trong `App.js` chưa
- Kiểm tra console browser để xem lỗi cụ thể

### Lỗi style không hiển thị
- Kiểm tra xem đã import SCSS files chưa
- Kiểm tra xem `sass` package đã được cài đặt chưa: `npm install sass`

### Sidebar không hiển thị trên mobile
- Kiểm tra xem đã click vào menu toggle (icon hamburger) chưa
- Kiểm tra console để xem có lỗi JavaScript không

## Font Awesome Icons

Đảm bảo đã thêm Font Awesome vào `public/index.html`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

Nếu chưa có, thêm vào thẻ `<head>` của file `public/index.html`.


