import React from "react";
import '../styles/components/HomeJobs.scss';

export default function HomeJobs({ jobs }) {
    return (
        <div className="jobs container">
            <h3>Kết quả tìm kiếm ({jobs.length})</h3>
            {jobs.length === 0 && <p>Không có việc phù hợp.</p>}
            <ul className="job-list">
                {jobs.map(job => (
                    <li className="job-card" key={job.id}>
                        <h4>{job.title}</h4>
                        <p><strong>Thành phố:</strong> {job.city} — <strong>Ngành:</strong> {job.industry}</p>
                        <p className="meta">Đăng: {job.uploadedAt} · Quan tâm: {job.hrPosts} lượt</p>
                        <div className="job-actions">
                            <button>Ứng tuyển</button>
                            <button className="outline">Lưu</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
