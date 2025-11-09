import React, { useState } from 'react';
import '../styles/AdminAI.scss';

export default function AdminAI() {
    const [activeTab, setActiveTab] = useState('training');

    const tabs = [
        { id: 'training', label: 'Dữ liệu huấn luyện', icon: 'fas fa-database' },
        { id: 'prompts', label: 'Quản lý Prompt', icon: 'fas fa-code' },
        { id: 'workflows', label: 'Workflow AI', icon: 'fas fa-project-diagram' },
        { id: 'models', label: 'Mô hình AI', icon: 'fas fa-brain' }
    ];

    return (
        <div className="admin-ai">
            <div className="admin-ai__header">
                <h1>Quản lý AI</h1>
            </div>

            <div className="admin-ai__tabs">
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

            <div className="admin-ai__content">
                {activeTab === 'training' && (
                    <div className="ai-section">
                        <h2>Dữ liệu huấn luyện / Feedback</h2>
                        <p>Thu thập và quản lý dữ liệu để cải thiện độ chính xác của AI</p>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Tổng mẫu dữ liệu</h3>
                                <p className="stat-value">12,450</p>
                            </div>
                            <div className="stat-card">
                                <h3>Mẫu đã duyệt</h3>
                                <p className="stat-value">10,230</p>
                            </div>
                            <div className="stat-card">
                                <h3>Mẫu chờ duyệt</h3>
                                <p className="stat-value">2,220</p>
                            </div>
                            <div className="stat-card">
                                <h3>Mẫu bị từ chối</h3>
                                <p className="stat-value">1,850</p>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nội dung</th>
                                    <th>Loại</th>
                                    <th>Đánh giá</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Sample data 1</td>
                                    <td>Chatbot</td>
                                    <td>Positive</td>
                                    <td><span className="badge badge-warning">Chờ duyệt</span></td>
                                    <td>
                                        <button className="btn-icon"><i className="fas fa-check"></i></button>
                                        <button className="btn-icon"><i className="fas fa-times"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'prompts' && (
                    <div className="ai-section">
                        <h2>Quản lý Prompt / Workflow AI</h2>
                        <p>Điều chỉnh prompt hệ thống và các workflow AI</p>
                        <div className="prompt-editor">
                            <label>System Prompt</label>
                            <textarea
                                rows="10"
                                placeholder="Nhập system prompt..."
                                defaultValue="Bạn là trợ lý AI chuyên tư vấn việc làm..."
                            />
                            <button className="btn btn-primary">Lưu prompt</button>
                        </div>
                        <div className="features-list">
                            <h3>Tính năng AI</h3>
                            <label>
                                <input type="checkbox" defaultChecked />
                                Chatbot tư vấn việc làm
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked />
                                Gợi ý CV tự động
                            </label>
                            <label>
                                <input type="checkbox" defaultChecked />
                                Gợi ý công việc phù hợp
                            </label>
                            <label>
                                <input type="checkbox" />
                                Phát hiện tin rác/spam
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 'workflows' && (
                    <div className="ai-section">
                        <h2>Workflow AI</h2>
                        <p>Quản lý các workflow AI tự động</p>
                    </div>
                )}

                {activeTab === 'models' && (
                    <div className="ai-section">
                        <h2>Mô hình AI</h2>
                        <p>Quản lý các mô hình AI đang được sử dụng</p>
                        <div className="models-list">
                            <div className="model-card">
                                <h3>GPT-4</h3>
                                <p>Status: Active</p>
                                <p>Usage: 45,230 requests</p>
                            </div>
                            <div className="model-card">
                                <h3>GPT-3.5</h3>
                                <p>Status: Active</p>
                                <p>Usage: 12,450 requests</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
