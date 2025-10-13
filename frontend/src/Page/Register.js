import React from "react";
import { Link } from "react-router-dom";
import '../styles/Register.scss';

export default function Register() {
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h2>Tạo tài khoản</h2>
                    <p>Bắt đầu hành trình tìm kiếm việc làm của bạn</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Họ</label>
                            <input id="firstName" type="text" placeholder="Nhập họ của bạn" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Tên</label>
                            <input id="lastName" type="text" placeholder="Nhập tên của bạn" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Nhập email của bạn" />
                    </div>
                    <div className="form-group password-field">
                        <label htmlFor="password">Mật khẩu</label>
                        <input id="password" type="password" placeholder="Tạo mật khẩu" />
                    </div>
                    <div className="form-group password-field">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <div className="terms">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">Tôi đồng ý với <Link to="/terms">Điều khoản dịch vụ</Link></label>
                    </div>
                    <button type="submit" className="register-button">Đăng ký</button>
                    <div className="login-link">
                        <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
