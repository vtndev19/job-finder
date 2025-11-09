import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/AdminSidebar.scss';

export default function AdminSidebar({ isOpen, onClose }) {
    const location = useLocation();

    const menuItems = [
        {
            title: 'Tổng quan',
            icon: 'fas fa-chart-line',
            path: '/admin/dashboard',
            exact: true
        },
        {
            title: 'Quản trị người dùng',
            icon: 'fas fa-users',
            children: [
                { title: 'Ứng viên', path: '/admin/users/candidates', icon: 'fas fa-user' },
                { title: 'Nhà tuyển dụng', path: '/admin/users/employers', icon: 'fas fa-building' },
                { title: 'Quản trị viên', path: '/admin/users/admins', icon: 'fas fa-user-shield' }
            ]
        },
        {
            title: 'Quản lý việc làm',
            icon: 'fas fa-briefcase',
            path: '/admin/jobs'
        },
        {
            title: 'Quản lý ứng tuyển',
            icon: 'fas fa-file-alt',
            path: '/admin/applications'
        },
        {
            title: 'Quản lý nội dung',
            icon: 'fas fa-newspaper',
            path: '/admin/content'
        },
        {
            title: 'Quản lý AI',
            icon: 'fas fa-robot',
            path: '/admin/ai'
        },
        {
            title: 'Thông báo',
            icon: 'fas fa-bell',
            path: '/admin/notifications'
        },
        {
            title: 'Hỗ trợ & CSKH',
            icon: 'fas fa-headset',
            path: '/admin/support'
        },
        {
            title: 'Kiểm duyệt',
            icon: 'fas fa-shield-alt',
            path: '/admin/moderation'
        },
        {
            title: 'Cài đặt hệ thống',
            icon: 'fas fa-cog',
            path: '/admin/settings'
        },
        {
            title: 'Logs & Monitoring',
            icon: 'fas fa-chart-bar',
            path: '/admin/logs'
        },
        {
            title: 'Bảo mật',
            icon: 'fas fa-lock',
            path: '/admin/security'
        }
    ];

    const isActive = (path) => {
        if (path === '/admin/dashboard') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const [expandedItems, setExpandedItems] = React.useState([]);

    const toggleExpand = (index) => {
        setExpandedItems(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="admin-sidebar__logo">
                <h2>JobFinder Admin</h2>
            </div>
            <nav className="admin-sidebar__nav">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.children ? (
                                <>
                                    <div 
                                        className={`admin-sidebar__item ${expandedItems.includes(index) ? 'expanded' : ''}`}
                                        onClick={() => toggleExpand(index)}
                                    >
                                        <i className={item.icon}></i>
                                        <span>{item.title}</span>
                                        <i className={`fas fa-chevron-down ${expandedItems.includes(index) ? 'rotated' : ''}`}></i>
                                    </div>
                                    {expandedItems.includes(index) && (
                                        <ul className="admin-sidebar__submenu">
                                            {item.children.map((child, childIndex) => (
                                                <li key={childIndex}>
                                                    <Link 
                                                        to={child.path}
                                                        className={isActive(child.path) ? 'active' : ''}
                                                        onClick={onClose}
                                                    >
                                                        <i className={child.icon}></i>
                                                        <span>{child.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link 
                                    to={item.path}
                                    className={`admin-sidebar__item ${isActive(item.path) ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <i className={item.icon}></i>
                                    <span>{item.title}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

