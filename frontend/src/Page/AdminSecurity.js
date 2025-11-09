import React, { useState } from 'react';
import '../styles/AdminSecurity.scss';

export default function AdminSecurity() {
    const [settings, setSettings] = useState({
        twoFA: true,
        sessionTimeout: 3600,
        ipWhitelist: [],
        ipBlacklist: []
    });

    return (
        <div className="admin-security">
            <div className="admin-security__header">
                <h1>Bảo mật</h1>
            </div>

            <div className="admin-security__sections">
                <div className="security-section">
                    <h2>Kiểm soát đăng nhập Admin</h2>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.twoFA}
                                onChange={(e) => setSettings({...settings, twoFA: e.target.checked})}
                            />
                            Bật xác thực 2 yếu tố (2FA)
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Session timeout (giây)</label>
                        <input
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="security-section">
                    <h2>IP Whitelist / Blacklist</h2>
                    <div className="ip-list">
                        <h3>IP Whitelist</h3>
                        <div className="ip-input-group">
                            <input type="text" placeholder="Nhập IP address" />
                            <button className="btn btn-primary">Thêm</button>
                        </div>
                        <ul className="ip-list-items">
                            <li>192.168.1.1 <button className="btn-icon"><i className="fas fa-times"></i></button></li>
                        </ul>
                    </div>
                    <div className="ip-list">
                        <h3>IP Blacklist</h3>
                        <div className="ip-input-group">
                            <input type="text" placeholder="Nhập IP address" />
                            <button className="btn btn-primary">Thêm</button>
                        </div>
                        <ul className="ip-list-items">
                            <li>10.0.0.1 <button className="btn-icon"><i className="fas fa-times"></i></button></li>
                        </ul>
                    </div>
                </div>

                <div className="security-section">
                    <h2>Theo dõi cảnh báo</h2>
                    <div className="alerts-list">
                        <div className="alert-item">
                            <div className="alert-info">
                                <h4>Brute force login attempt</h4>
                                <p>IP: 192.168.1.100 - 2024-01-15 10:30</p>
                            </div>
                            <span className="badge badge-danger">Nguy hiểm</span>
                        </div>
                        <div className="alert-item">
                            <div className="alert-info">
                                <h4>Suspicious activity detected</h4>
                                <p>User: admin@example.com - 2024-01-15 09:15</p>
                            </div>
                            <span className="badge badge-warning">Cảnh báo</span>
                        </div>
                    </div>
                </div>

                <div className="security-section">
                    <h2>Phân quyền</h2>
                    <p>Quản lý permissions granular theo module</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Module</th>
                                <th>Quyền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Super Admin</td>
                                <td>All</td>
                                <td>Full Access</td>
                                <td>
                                    <button className="btn-icon"><i className="fas fa-edit"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>Content Admin</td>
                                <td>Content Management</td>
                                <td>Read, Write</td>
                                <td>
                                    <button className="btn-icon"><i className="fas fa-edit"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
