import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultUser from "../data/user";
/*
========================================
 CODE CŨ (trước khi dùng localStorage):
 - Không có state cho input, form onSubmit chỉ e.preventDefault()
 - Không lưu user, không điều hướng sau đăng ký

    import React from "react";
    import { Link } from "react-router-dom";
    export default function Register() {
        return (
            <form onSubmit={(e) => e.preventDefault()}>
                ... input không có state ...
            </form>
        );
    }

 KHI TÍCH HỢP BACKEND:
 - Thay localStorage bằng gọi API tạo user, ví dụ:

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { firstName, lastName, email, password };
        const res = await axios.post('/api/register', payload);
        // lưu token/res vào store (redux, context) hoặc cookie
        navigate('/');
    }
========================================
*/
import '../styles/Register.scss';

export default function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password || !confirmPassword) return;
        if (password !== confirmPassword) return;

        // Gộp dữ liệu form với user mặc định (ảnh đại diện, id mẫu, ...)
        const user = {
            ...defaultUser,
            id: defaultUser.id,
            name: `${firstName} ${lastName}`.trim(),
            email: email.trim(),
        };
        try {
            localStorage.setItem('user', JSON.stringify(user));
            // Phát sự kiện để Header cập nhật ngay trong cùng tab
            window.dispatchEvent(new Event('user-changed'));
        } catch {}
        navigate("/");
    };
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h2>Tạo tài khoản</h2>
                    <p>Bắt đầu hành trình tìm kiếm việc làm của bạn</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Họ</label>
                            <input id="firstName" type="text" placeholder="Nhập họ của bạn" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Tên</label>
                            <input id="lastName" type="text" placeholder="Nhập tên của bạn" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Nhập email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group password-field">
                        <label htmlFor="password">Mật khẩu</label>
                        <input id="password" type="password" placeholder="Tạo mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group password-field">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
