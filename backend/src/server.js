// ================================================
// ✅ IMPORT MODULES
// ================================================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routers/jobRoutes.js"; // 👉 Import route cho jobs & industries
import db from "./configs/data.js";             // 👉 Kiểm tra kết nối DB

// ================================================
// ✅ CẤU HÌNH CƠ BẢN
// ================================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS cho phép frontend React truy cập
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Cho phép nhận JSON trong body
app.use(express.json());

// ================================================
// ✅ ROUTE KIỂM TRA SERVER
// ================================================
app.get("/", (req, res) => {
  res.send("🚀 Server job-finder đang hoạt động!");
});

// ================================================
// ✅ ROUTE KIỂM TRA KẾT NỐI DB
// ================================================
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users LIMIT 5");
    res.json({
      message: "✅ Kết nối DB thành công!",
      sample: rows,
    });
  } catch (error) {
    console.error("❌ Lỗi truy vấn DB:", error.message);
    res.status(500).json({ message: "Lỗi truy vấn DB!", error: error.message });
  }
});

// ================================================
// ✅ CÁC ROUTE API CHÍNH
// ================================================
app.use("/api", jobRoutes); // 👉 Tất cả route bắt đầu bằng /api (ví dụ /api/jobs)

// ================================================
// ✅ KHỞI ĐỘNG SERVER
// ================================================
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
