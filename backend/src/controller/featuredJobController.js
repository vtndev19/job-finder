// ================================================
// ✅ FEATURED JOB CONTROLLER - LẤY VIỆC LÀM NỔI BẬT
// ================================================
import db from "../configs/data.js";

export const getFeaturedJobs = async (req, res) => {
  try {
    // 🔹 Truy vấn danh sách việc làm nổi bật từ bảng featured_jobs
    const [jobs] = await db.query(`
      SELECT 
        j.job_id AS id,
        j.title,
        c.company_name AS company,
        l.city AS location,
        j.salary_range AS salary,
        jt.type_name AS type,
        j.posted_date,
        j.description,
        j.requirements,
        j.benefits,
        f.featured_since
      FROM featured_jobs f
      JOIN jobs j ON f.job_id = j.job_id
      JOIN companies c ON j.company_id = c.company_id
      JOIN locations l ON j.location_id = l.location_id
      JOIN job_types jt ON j.job_type_id = jt.job_type_id
      WHERE f.is_active = TRUE
      ORDER BY f.featured_since DESC
      LIMIT 9
    `);

    // 🔹 Chuẩn hoá dữ liệu trả về (phù hợp frontend)
    const formatted = jobs.map((job) => ({
      ...job,
      requirements: job.requirements
        ? job.requirements.split("\n").map((r) => r.trim()).filter(Boolean)
        : [],
      benefits: job.benefits
        ? job.benefits.split(/[;\n,]+/).map((b) => b.trim()).filter(Boolean)
        : [],
    }));

    res.json(formatted);
  } catch (error) {
    console.error("❌ Lỗi khi lấy việc làm nổi bật:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi truy vấn việc làm nổi bật", error: error.message });
  }
};
