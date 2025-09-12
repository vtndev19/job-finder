import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/components/HomeHeader.scss';

export default function HomeHeader({ siteName }) {
    const loc = useLocation();
    return (
        <header className="header">
            <div className="header-inner container">
                <div className="brand">
                    <Link to="/"><h1>{siteName}</h1></Link>
                </div>
                <nav className="nav">
                    <Link className={loc.pathname === "/" ? "active" : ""} to="/">Trang chủ</Link>
                    <Link to="/jobs">Việc làm</Link>
                    <Link to="/companies">Công ty</Link>
                    <Link to="/blog">Blog</Link>
                </nav>
                <div className="auth">
                    <Link className="btn" to="/login">Đăng nhập</Link>
                    <Link className="btn outline" to="/register">Đăng ký</Link>
                </div>
            </div>
        </header>
    );
}
