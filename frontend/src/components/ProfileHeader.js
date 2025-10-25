import React, { useState } from 'react';
import '../styles/components/ProfileHeader.scss';

export default function ProfileHeader({ user, isEditing, setIsEditing }) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        location: user?.location || 'Hà Nội',
        phone: user?.phone || '',
        bio: user?.bio || '',
        experience: user?.experience || '1-3 năm kinh nghiệm làm việc từ xa',
        verification: {
            email: user?.verification?.email || false,
            phone: user?.verification?.phone || false,
            identity: user?.verification?.identity || false
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Cập nhật thông tin user trong localStorage
        const updatedUser = {
            ...user,
            ...formData
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
        
        // Dispatch event để cập nhật header
        window.dispatchEvent(new Event('user-changed'));
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            location: user?.location || 'Hà Nội',
            phone: user?.phone || '',
            bio: user?.bio || '',
            experience: user?.experience || '1-3 năm kinh nghiệm làm việc từ xa',
            verification: {
                email: user?.verification?.email || false,
                phone: user?.verification?.phone || false,
                identity: user?.verification?.identity || false
            }
        });
        setIsEditing(false);
    };

    return (
        <div className="profile-header">
            <div className="profile-header-content">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        <img src={user?.avatar || '/default-avatar.png'} alt="Avatar" />
                        {isEditing && (
                            <button className="change-avatar-btn">
                                <i className="fas fa-camera"></i>
                            </button>
                        )}
                    </div>
                    <div className="profile-status">
                        <span className="status-indicator online"></span>
                        <span className="status-text">Online</span>
                    </div>
                </div>

                <div className="profile-info">
                    <div className="profile-title">
                        <h1>{isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="edit-input"
                            />
                        ) : (
                            formData.name
                        )}</h1>
                        <div className="profile-badges">
                            {!formData.verification.phone && (
                                <span className="badge warning">Chưa xác thực số điện thoại</span>
                            )}
                            {!formData.verification.identity && (
                                <span className="badge warning">Chưa xác thực thông tin</span>
                            )}
                        </div>
                    </div>

                    <div className="profile-meta">
                        <div className="meta-item">
                            <span className="meta-label">ID:</span>
                            <span className="meta-value">{user?.id}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Online cuối:</span>
                            <span className="meta-value">25/10/2025</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Địa điểm:</span>
                            <span className="meta-value">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="edit-input small"
                                    />
                                ) : (
                                    formData.location
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="profile-description">
                        <h3>Giới thiệu</h3>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="edit-textarea"
                                placeholder="Giới thiệu về bản thân..."
                            />
                        ) : (
                            <p>{formData.bio || `${formData.name} đã tạo tài khoản từ ngày 25-02-2025 và đã xác thực email cá nhân.`}</p>
                        )}
                    </div>

                    <div className="profile-experience">
                        <h3>Kinh nghiệm</h3>
                        {isEditing ? (
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                className="edit-input"
                            />
                        ) : (
                            <p>{formData.experience}</p>
                        )}
                    </div>

                    <div className="profile-actions">
                        {isEditing ? (
                            <div className="edit-actions">
                                <button className="btn btn-primary" onClick={handleSave}>
                                    Lưu thay đổi
                                </button>
                                <button className="btn btn-secondary" onClick={handleCancel}>
                                    Hủy
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                Chỉnh sửa hồ sơ
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
