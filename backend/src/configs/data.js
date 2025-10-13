// ================================================
// ✅ CẤU HÌNH KẾT NỐI MYSQL CHO JOB_PORTAL
// ================================================
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Cho phép đọc biến môi trường từ file .env

// ✅ Tạo pool kết nối MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",   // Địa chỉ máy chủ MySQL
  user: process.env.DB_USER || "root",        // Tên người dùng MySQL
  password: process.env.DB_PASS || "",        // Mật khẩu (để trống nếu dùng XAMPP)
  database: process.env.DB_NAME || "job_portal", // Tên CSDL chính xác
  port: process.env.DB_PORT || 3306,          // Cổng mặc định của MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Kiểm tra kết nối MySQL khi khởi động
db.getConnection()
  .then(() => console.log("✅ Đã kết nối thành công tới MySQL (job_portal)"))
  .catch((err) => console.error("❌ Lỗi kết nối MySQL:", err.message));

export default db;
