import React, { useState } from 'react';
import '../styles/AdminSupport.scss';

export default function AdminSupport() {
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState({
        status: 'all',
        priority: 'all'
    });

    return (
        <div className="admin-support">
            <div className="admin-support__header">
                <h1>Hỗ trợ & CSKH</h1>
            </div>

            <div className="admin-support__stats">
                <div className="stat-card">
                    <h3>Tổng ticket</h3>
                    <p className="stat-value">245</p>
                </div>
                <div className="stat-card">
                    <h3>Chờ xử lý</h3>
                    <p className="stat-value">32</p>
                </div>
                <div className="stat-card">
                    <h3>Đang xử lý</h3>
                    <p className="stat-value">18</p>
                </div>
                <div className="stat-card">
                    <h3>Đã giải quyết</h3>
                    <p className="stat-value">195</p>
                </div>
            </div>

            <div className="admin-support__filters">
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="resolved">Đã giải quyết</option>
                </select>
                <select
                    value={filters.priority}
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                >
                    <option value="all">Tất cả mức độ</option>
                    <option value="high">Cao</option>
                    <option value="medium">Trung bình</option>
                    <option value="low">Thấp</option>
                </select>
            </div>

            <div className="admin-support__table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Người dùng</th>
                            <th>Tiêu đề</th>
                            <th>Mức độ</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Người xử lý</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1234</td>
                            <td>Nguyễn Văn A</td>
                            <td>Không thể đăng nhập</td>
                            <td><span className="badge badge-danger">Cao</span></td>
                            <td><span className="badge badge-warning">Chờ xử lý</span></td>
                            <td>2024-01-15</td>
                            <td>-</td>
                            <td>
                                <button className="btn-icon"><i className="fas fa-eye"></i></button>
                                <button className="btn-icon"><i className="fas fa-comments"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
