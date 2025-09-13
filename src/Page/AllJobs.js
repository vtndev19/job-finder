import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import db from '../data/db.json';
import '../styles/AllJobs.scss';

const AllJobs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    // Lấy danh sách ngành nghề và địa điểm duy nhất từ db.json
    const industries = db.industries;
    const locations = useMemo(() => [...new Set(db.jobs.map(job => job.location))], []);

    const filteredJobs = useMemo(() => {
        return db.jobs.filter(job => {
            const industry = industries.find(ind => ind.id === job.industry_id);
            const industryName = industry ? industry.name : '';

            // Lọc theo từ khóa tìm kiếm (tiêu đề, công ty)
            const searchTermMatch = searchTerm.toLowerCase() === '' ||
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase());

            // Lọc theo ngành nghề
            const industryMatch = selectedIndustry === '' || job.industry_id === parseInt(selectedIndustry);

            // Lọc theo địa điểm
            const locationMatch = selectedLocation === '' || job.location === selectedLocation;

            return searchTermMatch && industryMatch && locationMatch;
        });
    }, [searchTerm, selectedIndustry, selectedLocation, industries]);

    return (
        <div className="all-jobs-page container">
            <div className="page-header">
                <h1>Tất cả việc làm</h1>
                <p>Khám phá {filteredJobs.length} cơ hội việc làm đang chờ bạn.</p>
            </div>

            <div className="filter-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề, công ty..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="filter-input"
                />
                <select
                    value={selectedIndustry}
                    onChange={e => setSelectedIndustry(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Tất cả ngành nghề</option>
                    {industries.map(industry => (
                        <option key={industry.id} value={industry.id}>{industry.name}</option>
                    ))}
                </select>
                <select
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Tất cả địa điểm</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <div className="job-list">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
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
                    ))
                ) : (
                    <p className="no-results">Không tìm thấy việc làm phù hợp.</p>
                )}
            </div>
        </div>
    );
};

export default AllJobs;
