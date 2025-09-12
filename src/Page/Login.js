import React from "react";
import { Link } from "react-router-dom";
import '../styles/Login.scss';

export default function Login() {
    return (
        <div className="container simple-view">
            <h2>Đăng nhập</h2>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Email" />
                <input type="password" placeholder="Mật khẩu" />
                <button type="submit">Đăng nhập</button>
            </form>
            <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
        </div>
    );
}
