import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/components/HomeHeader.scss';
import db from '../data/db.json'; // Import data

export default function HomeHeader({ siteName }) {
    const [industries, setIndustries] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const loc = useLocation();

    useEffect(() => {
        // Set industries from imported db.json
        setIndustries(db.industries);
    }, []);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <header className="header">
            <div className="header-inner container">
                <div className="brand">
                    <Link to="/"><h1>{siteName}</h1></Link>
                </div>
                <nav className="nav">
                    <Link className={loc.pathname === "/" ? "active" : ""} to="/">Trang chủ</Link>
                    <div
                        className="jobs-menu-item"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/jobs">Việc làm</Link>
                        {isDropdownVisible && (
                            <div className="jobs-dropdown">
                                <ul>
                                    {industries.map(industry => (
                                        <li key={industry.id}>
                                            <Link to={`/jobs/industry/${industry.id}`}>
                                                {industry.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
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
