import React from "react";
import { Link } from "react-router-dom";
import '../styles/Register.scss';

export default function Register() {
    return (
        <div className="container simple-view">
            <h2>Đăng ký</h2>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Họ và tên" />
                <input placeholder="Email" />
                <input type="password" placeholder="Mật khẩu" />
                <button type="submit">Đăng ký</button>
            </form>
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
    );
}
