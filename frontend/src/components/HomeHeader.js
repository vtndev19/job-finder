import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/components/HomeHeader.scss';
import db from '../data/db.json'; // Import data
// CODE CŨ (tham chiếu khi tích hợp backend):
// import user from "../data/user"; // Dùng object tĩnh hiển thị avatar


export default function HomeHeader({ siteName }) {
    const [industries, setIndustries] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false); // popup menu
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });
    const avatarRef = useRef(null); // tham chiếu đến avatar
    const loc = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Set industries from imported db.json
        setIndustries(db.industries);
    }, []);

    // Lắng nghe thay đổi user từ localStorage (từ tab khác hoặc sau khi login/register)
    useEffect(() => {
        const syncUser = () => {
            try {
                const raw = localStorage.getItem('user');
                setCurrentUser(raw ? JSON.parse(raw) : null);
            } catch {
                setCurrentUser(null);
            }
        };
        window.addEventListener('storage', syncUser);
        window.addEventListener('user-changed', syncUser);
        return () => {
            window.removeEventListener('storage', syncUser);
            window.removeEventListener('user-changed', syncUser);
        };
    }, []);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    const handleAvatarClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleMenuBlur = (event) => {
        if (avatarRef.current && !avatarRef.current.contains(event.relatedTarget)) {
            setMenuOpen(false);
        }
    };

    const onLogout = () => {
        try {
            localStorage.removeItem('user');
        } catch {}
        setCurrentUser(null);
        setMenuOpen(false);
        navigate("/"); // Quay lại trang chính
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
                
                    {/* ✅ CODE MỚI: Nếu có currentUser => hiện avatar, nếu chưa login => hiện nút Đăng nhập / Đăng ký */}
                    {/* ✅ CODE CŨ: Dựa vào object tĩnh `user` từ data/user.js */}
                    {currentUser ? (
                        <div className="user-menu" ref={avatarRef} onBlur={handleMenuBlur}>
                            <img
                                src={currentUser.avatar}
                                alt="User Avatar"
                                className="user-avatar"
                                onClick={handleAvatarClick}
                                tabIndex={0}
                            />
                        {isMenuOpen && (
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <img src={currentUser.avatar} alt="avatar" />
                                    <div className="user-details">
                                        <p className="user-name">{currentUser.name}</p>
                                        <p className="user-id">ID: {currentUser.id}</p>
                                        <p className="user-email">{currentUser.email}</p>
                                    </div>
                                </div>
                            <ul>
                                <li><Link to="/profile">Hồ sơ cá nhân</Link></li>
                                <li><Link to="/notification-management">Quản lý thông báo</Link></li>
                                <li><Link to="/settings/security">Cá nhân & bảo mật</Link></li>
                                <li><button onClick={onLogout}>Đăng xuất</button></li>
                            </ul>
                        </div>
                        )}
                    </div>
                ) : (
                    <div className="auth">
                        <Link className="btn" to="/login">Đăng nhập</Link>
                        <Link className="btn outline" to="/register">Đăng ký</Link>
                    </div>
                )}
            </div>
        </header>
    );
}
