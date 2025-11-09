import React, { useState } from 'react';
import '../styles/AdminNotifications.scss';

export default function AdminNotifications() {
    const [notifications, setNotifications] = useState([]);

    return (
        <div className="admin-notifications">
            <div className="admin-notifications__header">
                <h1>Quản lý thông báo</h1>
                <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Tạo thông báo mới
                </button>
            </div>

            <div className="admin-notifications__tabs">
                <button className="tab-btn active">Push thông báo</button>
                <button className="tab-btn">Email automation</button>
                <button className="tab-btn">Lịch sử gửi</button>
            </div>

            <div className="admin-notifications__content">
                <div className="notification-form">
                    <h2>Gửi thông báo</h2>
                    <div className="form-group">
                        <label>Loại người nhận</label>
                        <select>
                            <option value="all">Tất cả người dùng</option>
                            <option value="candidates">Ứng viên</option>
                            <option value="employers">Nhà tuyển dụng</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tiêu đề</label>
                        <input type="text" placeholder="Nhập tiêu đề thông báo" />
                    </div>
                    <div className="form-group">
                        <label>Nội dung</label>
                        <textarea rows="5" placeholder="Nhập nội dung thông báo" />
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" />
                            Gửi email
                        </label>
                        <label>
                            <input type="checkbox" />
                            Gửi push notification
                        </label>
                    </div>
                    <button className="btn btn-primary">Gửi thông báo</button>
                </div>

                <div className="notification-history">
                    <h2>Lịch sử gửi thông báo</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Người nhận</th>
                                <th>Loại</th>
                                <th>Ngày gửi</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Thông báo việc làm mới</td>
                                <td>Tất cả ứng viên</td>
                                <td>Push + Email</td>
                                <td>2024-01-15 10:00</td>
                                <td><span className="badge badge-success">Đã gửi</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
