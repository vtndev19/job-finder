import React from "react";
import { Link } from "react-router-dom";
import '../styles/Login.scss';

export default function Login() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h2>Đăng nhập</h2>
                    <p>Chào mừng bạn đã quay trở lại!</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Nhập email của bạn" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input id="password" type="password" placeholder="Nhập mật khẩu" />
                    </div>
                    <div className="remember-forgot">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Ghi nhớ tôi</label>
                        </div>
                        <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
                    </div>
                    <button type="submit" className="login-button">Đăng nhập</button>
                    <div className="register-link">
                        <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
