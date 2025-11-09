import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../styles/components/AdminLayout.scss';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="admin-layout__main">
                <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="admin-layout__content">
                    <Outlet />
                </main>
            </div>
            {sidebarOpen && (
                <div 
                    className="admin-layout__overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
