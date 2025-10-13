import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AllJobs.scss';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [loading, setLoading] = useState(true);

    // ✅ Lấy dữ liệu từ backend khi load trang (với AbortController + kiểm tra lỗi)
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true);
                const [jobsRes, indRes] = await Promise.all([
                    fetch(`${API_BASE}/api/jobs`, { signal: controller.signal }),
                    fetch(`${API_BASE}/api/industries`, { signal: controller.signal })
                ]);

                if (!jobsRes.ok) throw new Error(`Jobs API lỗi: ${jobsRes.status}`);
                if (!indRes.ok) throw new Error(`Industries API lỗi: ${indRes.status}`);

                const jobsData = await jobsRes.json();
                const industriesData = await indRes.json();

                setJobs(Array.isArray(jobsData) ? jobsData : []);
                setIndustries(Array.isArray(industriesData) ? industriesData : []);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("❌ Lỗi khi tải dữ liệu:", error);
                    setJobs([]);
                    setIndustries([]);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => controller.abort();
    }, []);

    // ✅ Lấy danh sách địa điểm duy nhất (loại bỏ null/undefined)
    const locations = useMemo(() => {
        return [...new Set(jobs.map(job => job.location).filter(Boolean))];
    }, [jobs]);

    // ✅ Lọc dữ liệu (so sánh stringify để tránh khác kiểu)
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const title = (job.title || '').toString();
            const company = (job.company || '').toString();

            const searchTermMatch =
                searchTerm === '' ||
                title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.toLowerCase().includes(searchTerm.toLowerCase());

            const industryMatch =
                selectedIndustry === '' ||
                String(job.industry_id ?? job.industryId ?? '') === selectedIndustry;

            const locationMatch =
                selectedLocation === '' || job.location === selectedLocation;

            return searchTermMatch && industryMatch && locationMatch;
        });
    }, [searchTerm, selectedIndustry, selectedLocation, jobs]);

    // 🕓 Hiển thị khi đang tải
    if (loading) {
        return (
            <div className="all-jobs-page container">
                <h2>Đang tải danh sách việc làm...</h2>
            </div>
        );
    }

    return (
        <div className="all-jobs-page container">
            <div className="page-header">
                <h1>Tất cả việc làm</h1>
                <p>Khám phá {filteredJobs.length} cơ hội việc làm đang chờ bạn.</p>
            </div>

            {/* 🔍 Bộ lọc */}
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
                    {industries.map(ind => (
                        <option key={ind.industry_id ?? ind.id} value={String(ind.industry_id ?? ind.id)}>
                            {ind.name}
                        </option>
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

            {/* ✅ Danh sách việc làm */}
            <div className="job-list">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => {
                        const postedDate = job.posted_date ? new Date(job.posted_date) : null;
                        const companyName = job.company || 'Công ty';
                        const salary = job.salary || 'Thoả thuận';
                        // industry_name có thể trả về trực tiếp hoặc cần map từ industries
                        const industryLabel = job.industry_name
                            || (() => {
                                const found = industries.find(i => String(i.industry_id ?? i.id) === String(job.industry_id ?? job.industryId ?? ''));
                                return found ? found.name : '';
                            })();

                        return (
                            <Link to={`/job/${job.id}`} key={job.id} className="job-card">
                                <div className="job-card-header">
                                    <h3>{job.title}</h3>
                                    <span className="job-salary">{salary}</span>
                                </div>

                                <div className="job-card-body">
                                    <div className="job-card-company">
                                        <span className="company-name">{companyName}</span>
                                        {industryLabel && <span className="company-industry"> • {industryLabel}</span>}
                                    </div>
                                </div>

                                <div className="job-card-footer">
                                    <span className="job-location">{job.location || '—'}</span>
                                    <span className="job-posted-date">
                                        <span id="job-posted-date-tile">Đăng ngày: </span>
                                        {postedDate ? postedDate.toLocaleDateString('vi-VN') : '—'}
                                    </span>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className="no-results">Không tìm thấy việc làm phù hợp.</p>
                )}
            </div>
        </div>
    );
};

export default AllJobs;
