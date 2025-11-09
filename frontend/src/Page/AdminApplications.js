import React, { useState, useEffect } from 'react';
import '../styles/AdminApplications.scss';

export default function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        page: 1
    });

    useEffect(() => {
        const mockApplications = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            candidateName: `Ứng viên ${i + 1}`,
            jobTitle: `Việc làm ${i + 1}`,
            company: `Công ty ${i + 1}`,
            status: i % 4 === 0 ? 'pending' : i % 4 === 1 ? 'viewed' : i % 4 === 2 ? 'approved' : 'rejected',
            appliedAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
            viewedAt: i % 3 !== 0 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN') : null
        }));
        setApplications(mockApplications);
    }, []);

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        viewed: applications.filter(a => a.status === 'viewed').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length
    };

    return (
        <div className="admin-applications">
            <div className="admin-applications__header">
                <h1>Quản lý ứng tuyển</h1>
            </div>

            <div className="admin-applications__stats">
                <div className="stat-card">
                    <h3>Tổng ứng tuyển</h3>
                    <p className="stat-value">{stats.total}</p>
                </div>
                <div className="stat-card">
                    <h3>Chờ xử lý</h3>
                    <p className="stat-value">{stats.pending}</p>
                </div>
                <div className="stat-card">
                    <h3>Đã xem</h3>
                    <p className="stat-value">{stats.viewed}</p>
                </div>
                <div className="stat-card">
                    <h3>Đã chấp nhận</h3>
                    <p className="stat-value">{stats.approved}</p>
                </div>
                <div className="stat-card">
                    <h3>Đã từ chối</h3>
                    <p className="stat-value">{stats.rejected}</p>
                </div>
                <div className="stat-card">
                    <h3>Tỷ lệ thành công</h3>
                    <p className="stat-value">
                        {stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : 0}%
                    </p>
                </div>
            </div>

            <div className="admin-applications__filters">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={filters.search}
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                        className="filter-input"
                    />
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                        className="filter-select"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="viewed">Đã xem</option>
                        <option value="approved">Đã chấp nhận</option>
                        <option value="rejected">Đã từ chối</option>
                    </select>
                </div>
            </div>

            <div className="admin-applications__table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ứng viên</th>
                            <th>Việc làm</th>
                            <th>Công ty</th>
                            <th>Ngày ứng tuyển</th>
                            <th>Ngày xem</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.id}</td>
                                <td>{app.candidateName}</td>
                                <td>{app.jobTitle}</td>
                                <td>{app.company}</td>
                                <td>{app.appliedAt}</td>
                                <td>{app.viewedAt || '-'}</td>
                                <td>
                                    <span className={`badge badge-${app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'danger' : app.status === 'viewed' ? 'info' : 'warning'}`}>
                                        {app.status === 'pending' ? 'Chờ xử lý' : 
                                         app.status === 'viewed' ? 'Đã xem' : 
                                         app.status === 'approved' ? 'Đã chấp nhận' : 'Đã từ chối'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-icon" title="Xem chi tiết">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="btn-icon" title="Xem hồ sơ">
                                            <i className="fas fa-file-alt"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
