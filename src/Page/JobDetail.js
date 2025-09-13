import React from 'react';
import { useParams, Link } from 'react-router-dom';
import db from '../data/db.json';
import '../styles/JobDetail.scss';

const JobDetail = () => {
    const { jobId } = useParams();
    const job = db.jobs.find(j => j.id === jobId);

    if (!job) {
        return (
            <div className="job-detail-page container">
                <h2>Không tìm thấy công việc</h2>
                <p>Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/" className="back-link">Quay lại trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="job-detail-page container">
            <div className="job-detail-header">
                <h1>{job.title}</h1>
                <div className="header-meta">
                    <span className="company-name">{job.company}</span>
                    <span className="location">{job.location}</span>
                </div>
                <div className="salary-type">
                    <span className="salary">{job.salary}</span>
                    <span className="job-type">{job.type}</span>
                </div>
                <button className="apply-now-btn">Ứng tuyển ngay</button>
            </div>

            <div className="job-detail-content">
                <div className="job-section">
                    <h2>Mô tả công việc</h2>
                    <p>{job.description}</p>
                </div>

                <div className="job-section">
                    <h2>Yêu cầu ứng viên</h2>
                    <ul>
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                <div className="job-section">
                    <h2>Quyền lợi</h2>
                    <ul>
                        {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="job-detail-footer">
                <p>Đăng ngày: {new Date(job.posted_date).toLocaleDateString('vi-VN')}</p>
                <Link to="/" className="back-link">← Quay lại danh sách</Link>
            </div>
        </div>
    );
};

export default JobDetail;
