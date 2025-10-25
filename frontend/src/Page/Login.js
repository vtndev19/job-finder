import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultUser from "../data/user";
import '../styles/Login.scss';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;
        // Nếu đã có user từ lần đăng ký trước, ưu tiên dùng lại
        let user = null;
        try {
            const raw = localStorage.getItem('user');
            user = raw ? JSON.parse(raw) : null;
        } catch {
            user = null;
        }
        if (!user) {
            // Demo: tạo user tạm với email nhập vào
            user = {
                ...defaultUser,
                email: email.trim() || defaultUser.email,
            };
        }
        try {
            localStorage.setItem('user', JSON.stringify(user));
            // Phát sự kiện để Header cập nhật ngay trong cùng tab
            window.dispatchEvent(new Event('user-changed'));
        } catch {}
        navigate("/");
    };
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h2>Đăng nhập</h2>
                    <p>Chào mừng bạn đã quay trở lại!</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Nhập email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input id="password" type="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
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
