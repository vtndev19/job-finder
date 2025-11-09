import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.scss';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: {
            total: 0,
            candidates: 0,
            employers: 0,
            newToday: 0,
            growth: 0
        },
        jobs: {
            total: 0,
            active: 0,
            pending: 0,
            newToday: 0,
            topViews: 0
        },
        applications: {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0,
            successRate: 0
        },
        ai: {
            interactions: 0,
            accuracy: 0,
            popularQueries: 0,
            models: 0
        }
    });

    useEffect(() => {
        // Simulate data loading
        setStats({
            users: {
                total: 15420,
                candidates: 12350,
                employers: 3070,
                newToday: 45,
                growth: 12.5
            },
            jobs: {
                total: 8520,
                active: 7230,
                pending: 290,
                newToday: 128,
                topViews: 15600
            },
            applications: {
                total: 45230,
                pending: 1230,
                approved: 32500,
                rejected: 11500,
                successRate: 71.8
            },
            ai: {
                interactions: 45230,
                accuracy: 94.2,
                popularQueries: 1250,
                models: 3
            }
        });
    }, []);

    const StatCard = ({ title, value, change, icon, color, subtitle }) => (
        <div className="stat-card">
            <div className="stat-card__icon" style={{ background: `linear-gradient(135deg, ${color}15, ${color}30)` }}>
                <i className={icon} style={{ color: color }}></i>
            </div>
            <div className="stat-card__content">
                <h3 className="stat-card__title">{title}</h3>
                <p className="stat-card__value">{value.toLocaleString('vi-VN')}</p>
                {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
                {change && (
                    <p className={`stat-card__change ${change > 0 ? 'positive' : 'negative'}`}>
                        <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'}`}></i>
                        {Math.abs(change)}% so với tháng trước
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard__header">
                <h1>Dashboard</h1>
                <p>Tổng quan hệ thống JobFinder</p>
            </div>

            <div className="admin-dashboard__stats">
                <div className="stats-grid">
                    <StatCard
                        title="Tổng người dùng"
                        value={stats.users.total}
                        change={stats.users.growth}
                        icon="fas fa-users"
                        color="#3b82f6"
                        subtitle={`${stats.users.candidates} ứng viên • ${stats.users.employers} nhà tuyển dụng`}
                    />
                    <StatCard
                        title="Việc làm"
                        value={stats.jobs.total}
                        change={8.2}
                        icon="fas fa-briefcase"
                        color="#10b981"
                        subtitle={`${stats.jobs.active} đang hoạt động • ${stats.jobs.pending} chờ duyệt`}
                    />
                    <StatCard
                        title="Ứng tuyển"
                        value={stats.applications.total}
                        change={15.3}
                        icon="fas fa-file-alt"
                        color="#f59e0b"
                        subtitle={`Tỷ lệ thành công: ${stats.applications.successRate}%`}
                    />
                    <StatCard
                        title="Tương tác AI"
                        value={stats.ai.interactions}
                        change={23.1}
                        icon="fas fa-robot"
                        color="#8b5cf6"
                        subtitle={`Độ chính xác: ${stats.ai.accuracy}%`}
                    />
                </div>
            </div>

            <div className="admin-dashboard__charts">
                <div className="chart-card">
                    <h3>Thống kê người dùng mới</h3>
                    <div className="chart-placeholder">
                        <p>Biểu đồ người dùng mới theo ngày/tuần/tháng</p>
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Top ngành tuyển dụng</h3>
                    <div className="chart-placeholder">
                        <p>Biểu đồ phân bổ việc làm theo ngành</p>
                    </div>
                </div>
            </div>

            <div className="admin-dashboard__tables">
                <div className="table-card">
                    <h3>Việc làm mới nhất</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Nhà tuyển dụng</th>
                                <th>Ngày đăng</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Senior Frontend Developer</td>
                                <td>Công ty ABC</td>
                                <td>2024-01-15</td>
                                <td><span className="badge badge-success">Đã duyệt</span></td>
                                <td>
                                    <button className="btn-icon"><i className="fas fa-eye"></i></button>
                                    <button className="btn-icon"><i className="fas fa-edit"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>Backend Developer</td>
                                <td>Công ty XYZ</td>
                                <td>2024-01-14</td>
                                <td><span className="badge badge-warning">Chờ duyệt</span></td>
                                <td>
                                    <button className="btn-icon"><i className="fas fa-eye"></i></button>
                                    <button className="btn-icon"><i className="fas fa-check"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="table-card">
                    <h3>Hoạt động gần đây</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Người dùng</th>
                                <th>Hành động</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10:30</td>
                                <td>Nguyễn Văn A</td>
                                <td>Đăng tin tuyển dụng</td>
                                <td>Senior Frontend Developer</td>
                            </tr>
                            <tr>
                                <td>09:15</td>
                                <td>Trần Thị B</td>
                                <td>Ứng tuyển</td>
                                <td>Backend Developer tại XYZ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
