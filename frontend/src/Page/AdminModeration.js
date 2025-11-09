import React, { useState } from 'react';
import '../styles/AdminModeration.scss';

export default function AdminModeration() {
    const [filters, setFilters] = useState({
        type: 'all',
        status: 'all'
    });

    return (
        <div className="admin-moderation">
            <div className="admin-moderation__header">
                <h1>Công cụ kiểm duyệt</h1>
            </div>

            <div className="admin-moderation__tools">
                <div className="tool-card">
                    <h3>Bộ lọc từ khóa vi phạm</h3>
                    <textarea
                        rows="5"
                        placeholder="Nhập các từ khóa vi phạm, mỗi từ một dòng"
                        defaultValue="spam\nscam\nvi phạm"
                    />
                    <button className="btn btn-primary">Lưu từ khóa</button>
                </div>

                <div className="tool-card">
                    <h3>Cài đặt kiểm duyệt</h3>
                    <label>
                        <input type="checkbox" defaultChecked />
                        Tự động đánh dấu nội dung nghi ngờ (AI-assisted)
                    </label>
                    <label>
                        <input type="checkbox" defaultChecked />
                        Tự động ẩn nội dung vi phạm
                    </label>
                    <label>
                        <input type="checkbox" />
                        Yêu cầu duyệt thủ công
                    </label>
                </div>
            </div>

            <div className="admin-moderation__content">
                <div className="moderation-filters">
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                        <option value="all">Tất cả loại</option>
                        <option value="jobs">Tin tuyển dụng</option>
                        <option value="comments">Bình luận</option>
                        <option value="posts">Bài viết</option>
                    </select>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="flagged">Đã đánh dấu</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="rejected">Đã từ chối</option>
                    </select>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loại</th>
                            <th>Nội dung</th>
                            <th>Người đăng</th>
                            <th>Điểm nghi ngờ</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Tin tuyển dụng</td>
                            <td>Senior Developer...</td>
                            <td>Công ty ABC</td>
                            <td>85%</td>
                            <td><span className="badge badge-warning">Chờ duyệt</span></td>
                            <td>
                                <button className="btn-icon"><i className="fas fa-check"></i></button>
                                <button className="btn-icon"><i className="fas fa-times"></i></button>
                                <button className="btn-icon"><i className="fas fa-ban"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
