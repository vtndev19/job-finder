import React, { useState } from 'react';
import '../styles/AdminContent.scss';

export default function AdminContent() {
    const [activeTab, setActiveTab] = useState('blog');

    const tabs = [
        { id: 'blog', label: 'Blog / Bài viết', icon: 'fas fa-newspaper' },
        { id: 'news', label: 'Tin tức', icon: 'fas fa-bullhorn' },
        { id: 'career', label: 'Hướng nghiệp', icon: 'fas fa-graduation-cap' },
        { id: 'comments', label: 'Bình luận', icon: 'fas fa-comments' },
        { id: 'banners', label: 'Banner / Popup', icon: 'fas fa-image' },
        { id: 'faq', label: 'FAQ / Chính sách', icon: 'fas fa-question-circle' }
    ];

    return (
        <div className="admin-content">
            <div className="admin-content__header">
                <h1>Quản lý nội dung</h1>
                <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Tạo mới
                </button>
            </div>

            <div className="admin-content__tabs">
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

            <div className="admin-content__content">
                {activeTab === 'blog' && (
                    <div className="content-section">
                        <h2>Blog / Bài viết tư vấn nghề nghiệp</h2>
                        <p>Quản lý các bài viết blog về tư vấn nghề nghiệp, kỹ năng, mẹo phỏng vấn...</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Ngày đăng</th>
                                    <th>Lượt xem</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>10 kỹ năng cần thiết cho developer</td>
                                    <td>Admin</td>
                                    <td>2024-01-15</td>
                                    <td>1250</td>
                                    <td><span className="badge badge-success">Đã xuất bản</span></td>
                                    <td>
                                        <button className="btn-icon"><i className="fas fa-edit"></i></button>
                                        <button className="btn-icon"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'news' && (
                    <div className="content-section">
                        <h2>Tin tức thị trường lao động</h2>
                        <p>Quản lý các tin tức về thị trường lao động, xu hướng tuyển dụng...</p>
                    </div>
                )}

                {activeTab === 'career' && (
                    <div className="content-section">
                        <h2>Bài viết hướng nghiệp</h2>
                        <p>Quản lý các bài viết về hướng nghiệp, định hướng nghề nghiệp...</p>
                    </div>
                )}

                {activeTab === 'comments' && (
                    <div className="content-section">
                        <h2>Quản lý bình luận / đánh giá</h2>
                        <p>Duyệt, xóa, quản lý bình luận và đánh giá từ người dùng...</p>
                    </div>
                )}

                {activeTab === 'banners' && (
                    <div className="content-section">
                        <h2>Banner, popup, chiến dịch marketing</h2>
                        <p>Quản lý banner, popup quảng cáo và các chiến dịch marketing...</p>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div className="content-section">
                        <h2>FAQ, chính sách, điều khoản</h2>
                        <p>Quản lý các câu hỏi thường gặp, chính sách và điều khoản sử dụng...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
