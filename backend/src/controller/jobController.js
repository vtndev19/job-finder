import db from "../configs/data.js";

// ================================================
// ✅ LẤY DANH SÁCH NGÀNH
// ================================================
export const getIndustries = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT industry_id, name
      FROM industries
      ORDER BY name
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách ngành:", error.message);
    res.status(500).json({ message: "Lỗi khi truy vấn industries" });
  }
};

// ================================================
// ✅ LẤY DANH SÁCH CÔNG VIỆC (đã có cột benefits)
// ================================================
export const getAllJobs = async (req, res) => {
  try {
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
        i.industry_id,
        i.name AS industry_name
      FROM jobs j
      JOIN companies c ON j.company_id = c.company_id
      JOIN locations l ON j.location_id = l.location_id
      JOIN job_types jt ON j.job_type_id = jt.job_type_id
      JOIN industries i ON j.industry_id = i.industry_id
      ORDER BY j.posted_date DESC
    `);

    // Format lại dữ liệu để frontend dễ xử lý
    const jobsWithExtras = jobs.map((job) => ({
      ...job,
      requirements: job.requirements
        ? job.requirements.split("\n").map((r) => r.trim()).filter(Boolean)
        : [],
      benefits: job.benefits
        ? job.benefits
            .split(/[;\n,]+/) // hỗ trợ ;, \n hoặc , làm dấu phân cách
            .map((b) => b.trim())
            .filter(Boolean)
        : [],
    }));

    res.json(jobsWithExtras);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách công việc:", error.message);
    res.status(500).json({ message: "Lỗi khi truy vấn jobs" });
  }
};

// ================================================
// ✅ LẤY CHI TIẾT CÔNG VIỆC THEO ID (kèm benefits)
// ================================================
export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const [jobs] = await db.query(
      `
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
        j.benefits
      FROM jobs j
      JOIN companies c ON j.company_id = c.company_id
      JOIN locations l ON j.location_id = l.location_id
      JOIN job_types jt ON j.job_type_id = jt.job_type_id
      WHERE j.job_id = ?
      `,
      [id]
    );

    if (jobs.length === 0)
      return res.status(404).json({ message: "Không tìm thấy công việc" });

    const job = {
      ...jobs[0],
      requirements: jobs[0].requirements
        ? jobs[0].requirements.split("\n").map((r) => r.trim()).filter(Boolean)
        : [],
      benefits: jobs[0].benefits
        ? jobs[0].benefits
            .split(/[;\n,]+/)
            .map((b) => b.trim())
            .filter(Boolean)
        : [],
    };

    res.json(job);
  } catch (error) {
    console.error("❌ Lỗi khi lấy chi tiết công việc:", error.message);
    res.status(500).json({ message: "Lỗi khi truy vấn chi tiết công việc" });
  }
};
