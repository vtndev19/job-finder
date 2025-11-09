import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/AdminHeader.scss';

export default function AdminHeader({ onMenuClick }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user');
            const user = raw ? JSON.parse(raw) : null;
            setCurrentUser(user);
        } catch (error) {
            console.error('Error loading user:', error);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        setMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="admin-header">
            <div className="admin-header__left">
                <button className="admin-header__menu-toggle" onClick={onMenuClick}>
                    <i className="fas fa-bars"></i>
                </button>
                <div className="admin-header__search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Tìm kiếm..." />
                </div>
            </div>
            <div className="admin-header__right">
                <div className="admin-header__notifications">
                    <button className="admin-header__notification-btn">
                        <i className="fas fa-bell"></i>
                        <span className="badge">3</span>
                    </button>
                </div>
                <div className="admin-header__user" ref={menuRef}>
                    <button 
                        className="admin-header__user-btn"
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        <img 
                            src={currentUser?.avatar || '/default-avatar.png'} 
                            alt={currentUser?.name || 'Admin'} 
                        />
                        <span>{currentUser?.name || 'Admin'}</span>
                        <i className="fas fa-chevron-down"></i>
                    </button>
                    {isMenuOpen && (
                        <div className="admin-header__user-menu">
                            <div className="admin-header__user-info">
                                <img 
                                    src={currentUser?.avatar || '/default-avatar.png'} 
                                    alt={currentUser?.name || 'Admin'} 
                                />
                                <div>
                                    <p className="user-name">{currentUser?.name || 'Admin'}</p>
                                    <p className="user-email">{currentUser?.email || 'admin@jobfinder.vn'}</p>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <Link to="/profile">
                                        <i className="fas fa-user"></i>
                                        <span>Hồ sơ</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/settings">
                                        <i className="fas fa-cog"></i>
                                        <span>Cài đặt</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Đăng xuất</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

