import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import ProfileSkills from '../components/ProfileSkills';
import ProfilePortfolio from '../components/ProfilePortfolio';
import ProfileContact from '../components/ProfileContact';
import '../styles/Profile.scss';

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Lấy thông tin user từ localStorage
        try {
            const raw = localStorage.getItem('user');
            const user = raw ? JSON.parse(raw) : null;
            setCurrentUser(user);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin user:', error);
        }
    }, []);

    if (!currentUser) {
        return (
            <div className="profile-container">
                <div className="profile-error">
                    <h2>Vui lòng đăng nhập để xem hồ sơ</h2>
                    <Link to="/login" className="btn">Đăng nhập</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-wrapper">
                    {/* Breadcrumb */}
                    <div className="breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span>/</span>
                        <span>Hồ sơ cá nhân</span>
                    </div>

                    {/* Profile Header */}
                    <ProfileHeader 
                        user={currentUser} 
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />

                    {/* Profile Skills */}
                    <ProfileSkills 
                        user={currentUser}
                        isEditing={isEditing}
                    />

                    {/* Profile Portfolio */}
                    <ProfilePortfolio 
                        user={currentUser}
                        isEditing={isEditing}
                    />

                    {/* Profile Contact */}
                    <ProfileContact 
                        user={currentUser}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </div>
    );
}
