import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/HomeJobs.scss';

const HomeJobs = ({ jobs }) => {
    return (
        <div className="home-jobs-container">
            <h2>Việc làm nổi bật</h2>
            {jobs.length === 0 && <p>Không có việc làm nào phù hợp với tìm kiếm của bạn.</p>}
            <div className="job-list">
                {jobs.map(job => (
                    <Link to={`/job/${job.id}`} key={job.id} className="job-card">
                        <div className="job-card-header">
                            <h3>{job.title}</h3>
                            <span className="job-salary">{job.salary}</span>
                        </div>
                        <div className="job-card-company">
                            <span>{job.company}</span>
                        </div>
                        <div className="job-card-footer">
                            <span className="job-location">{job.location}</span>
                            <span className="job-posted-date">{new Date(job.posted_date).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeJobs;
