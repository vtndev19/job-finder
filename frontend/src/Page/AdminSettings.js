import React, { useState } from 'react';
import '../styles/AdminSettings.scss';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('ai');
    const [settings, setSettings] = useState({
        ai: {
            apiKey: '',
            model: 'gpt-4',
            enabled: true
        },
        search: {
            refreshRate: 3600,
            indexEnabled: true
        },
        email: {
            smtpHost: '',
            smtpPort: 587,
            smtpUser: '',
            smtpPass: ''
        },
        cache: {
            enabled: true,
            ttl: 3600
        },
        rateLimit: {
            enabled: true,
            maxRequests: 100,
            windowMs: 60000
        }
    });

    const tabs = [
        { id: 'ai', label: 'Cấu hình AI', icon: 'fas fa-robot' },
        { id: 'search', label: 'Tìm kiếm', icon: 'fas fa-search' },
        { id: 'email', label: 'Email SMTP', icon: 'fas fa-envelope' },
        { id: 'cache', label: 'Caching', icon: 'fas fa-database' },
        { id: 'rateLimit', label: 'Rate Limiting', icon: 'fas fa-tachometer-alt' },
        { id: 'cronjobs', label: 'Cronjobs', icon: 'fas fa-clock' }
    ];

    const handleSave = () => {
        console.log('Saving settings:', settings);
        // Implement save logic
    };

    return (
        <div className="admin-settings">
            <div className="admin-settings__header">
                <h1>Cài đặt hệ thống</h1>
                <button className="btn btn-primary" onClick={handleSave}>
                    <i className="fas fa-save"></i> Lưu cài đặt
                </button>
            </div>

            <div className="admin-settings__tabs">
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

            <div className="admin-settings__content">
                {activeTab === 'ai' && (
                    <div className="settings-section">
                        <h2>Cấu hình AI</h2>
                        <div className="form-group">
                            <label>API Key</label>
                            <input
                                type="password"
                                value={settings.ai.apiKey}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    ai: { ...settings.ai, apiKey: e.target.value }
                                })}
                                placeholder="Nhập API key"
                            />
                        </div>
                        <div className="form-group">
                            <label>Mô hình AI</label>
                            <select
                                value={settings.ai.model}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    ai: { ...settings.ai, model: e.target.value }
                                })}
                            >
                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-3.5">GPT-3.5</option>
                                <option value="claude">Claude</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.ai.enabled}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        ai: { ...settings.ai, enabled: e.target.checked }
                                    })}
                                />
                                Kích hoạt AI
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 'search' && (
                    <div className="settings-section">
                        <h2>Cấu hình tìm kiếm</h2>
                        <div className="form-group">
                            <label>Tỷ lệ refresh index (giây)</label>
                            <input
                                type="number"
                                value={settings.search.refreshRate}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    search: { ...settings.search, refreshRate: parseInt(e.target.value) }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.search.indexEnabled}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        search: { ...settings.search, indexEnabled: e.target.checked }
                                    })}
                                />
                                Bật index tìm kiếm
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 'email' && (
                    <div className="settings-section">
                        <h2>Cấu hình Email SMTP</h2>
                        <div className="form-group">
                            <label>SMTP Host</label>
                            <input
                                type="text"
                                value={settings.email.smtpHost}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    email: { ...settings.email, smtpHost: e.target.value }
                                })}
                                placeholder="smtp.gmail.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>SMTP Port</label>
                            <input
                                type="number"
                                value={settings.email.smtpPort}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    email: { ...settings.email, smtpPort: parseInt(e.target.value) }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>SMTP User</label>
                            <input
                                type="text"
                                value={settings.email.smtpUser}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    email: { ...settings.email, smtpUser: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>SMTP Password</label>
                            <input
                                type="password"
                                value={settings.email.smtpPass}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    email: { ...settings.email, smtpPass: e.target.value }
                                })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'cache' && (
                    <div className="settings-section">
                        <h2>Cấu hình Caching</h2>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.cache.enabled}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        cache: { ...settings.cache, enabled: e.target.checked }
                                    })}
                                />
                                Bật caching
                            </label>
                        </div>
                        <div className="form-group">
                            <label>TTL (Time To Live) - giây</label>
                            <input
                                type="number"
                                value={settings.cache.ttl}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    cache: { ...settings.cache, ttl: parseInt(e.target.value) }
                                })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'rateLimit' && (
                    <div className="settings-section">
                        <h2>Cấu hình Rate Limiting</h2>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.rateLimit.enabled}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        rateLimit: { ...settings.rateLimit, enabled: e.target.checked }
                                    })}
                                />
                                Bật rate limiting
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Số request tối đa</label>
                            <input
                                type="number"
                                value={settings.rateLimit.maxRequests}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    rateLimit: { ...settings.rateLimit, maxRequests: parseInt(e.target.value) }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Thời gian cửa sổ (ms)</label>
                            <input
                                type="number"
                                value={settings.rateLimit.windowMs}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    rateLimit: { ...settings.rateLimit, windowMs: parseInt(e.target.value) }
                                })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'cronjobs' && (
                    <div className="settings-section">
                        <h2>Quản lý Cronjobs</h2>
                        <p>Quản lý các nhiệm vụ nền tự động chạy theo lịch trình...</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên nhiệm vụ</th>
                                    <th>Lịch trình</th>
                                    <th>Trạng thái</th>
                                    <th>Lần chạy cuối</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Refresh search index</td>
                                    <td>Mỗi giờ</td>
                                    <td><span className="badge badge-success">Đang chạy</span></td>
                                    <td>2024-01-15 10:00</td>
                                    <td>
                                        <button className="btn-icon"><i className="fas fa-pause"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gửi email thông báo</td>
                                    <td>Mỗi ngày</td>
                                    <td><span className="badge badge-success">Đang chạy</span></td>
                                    <td>2024-01-15 08:00</td>
                                    <td>
                                        <button className="btn-icon"><i className="fas fa-pause"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
