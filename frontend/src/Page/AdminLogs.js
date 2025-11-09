import React, { useState } from 'react';
import '../styles/AdminLogs.scss';

export default function AdminLogs() {
    const [activeTab, setActiveTab] = useState('errors');
    const [logs, setLogs] = useState([]);

    const tabs = [
        { id: 'errors', label: 'Log lỗi', icon: 'fas fa-exclamation-triangle' },
        { id: 'auth', label: 'Log đăng nhập', icon: 'fas fa-key' },
        { id: 'api', label: 'Log API AI', icon: 'fas fa-code' },
        { id: 'audit', label: 'Audit Log', icon: 'fas fa-history' },
        { id: 'payment', label: 'Log thanh toán', icon: 'fas fa-credit-card' }
    ];

    return (
        <div className="admin-logs">
            <div className="admin-logs__header">
                <h1>Logs & Monitoring</h1>
            </div>

            <div className="admin-logs__tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <i className={tab.icon}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="admin-logs__content">
                <div className="logs-filters">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <input type="date" />
                    <select>
                        <option value="all">Tất cả mức độ</option>
                        <option value="error">Lỗi</option>
                        <option value="warning">Cảnh báo</option>
                        <option value="info">Thông tin</option>
                    </select>
                </div>

                <div className="logs-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Mức độ</th>
                                <th>Loại</th>
                                <th>Nội dung</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024-01-15 10:30:25</td>
                                <td><span className="badge badge-danger">Error</span></td>
                                <td>Backend</td>
                                <td>Database connection failed</td>
                                <td>
                                    <button className="btn-icon"><i className="fas fa-eye"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>2024-01-15 10:29:10</td>
                                <td><span className="badge badge-warning">Warning</span></td>
                                <td>API</td>
                                <td>Rate limit exceeded</td>
                                <td>
                                    <button className="btn-icon"><i className="fas fa-eye"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
