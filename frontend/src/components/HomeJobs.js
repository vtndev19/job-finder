import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/HomeJobs.scss";

const HomeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================================
  // ✅ GỌI API LẤY DANH SÁCH 9 VIỆC LÀM NỔI BẬT
  // ================================================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/jobs/featured"); // ✅ API backend
        if (!res.ok) throw new Error("Lỗi khi kết nối đến server!");
        const data = await res.json();
        setJobs(data || []); // Tránh lỗi khi API trả null
      } catch (err) {
        console.error("❌ Lỗi khi lấy việc làm nổi bật:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ================================================
  // ✅ LOADING STATE
  // ================================================
  if (loading) {
    return <p className="loading">Đang tải việc làm nổi bật...</p>;
  }

  // ================================================
  // ✅ HIỂN THỊ DANH SÁCH CÔNG VIỆC
  // ================================================
  return (
    <div className="home-jobs-container">
      <h2>Việc làm nổi bật</h2>

      {jobs.length === 0 ? (
        <p>Không có việc làm nào nổi bật.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <Link to={`/job/${job.id}`} key={job.id} className="job-card">
              {/* --- Header: tiêu đề + lương --- */}
              <div className="job-card-header">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-salary">{job.salary || "Thoả thuận"}</span>
              </div>

              {/* --- Tên công ty --- */}
              <div className="job-card-company">
                <span>{job.company}</span>
              </div>

              {/* --- Footer: địa điểm + ngày đăng --- */}
              <div className="job-card-footer">
                <span className="job-location">{job.location}</span>
                <span className="job-posted-date">
                  {job.posted_date
                    ? new Date(job.posted_date).toLocaleDateString("vi-VN")
                    : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeJobs;
