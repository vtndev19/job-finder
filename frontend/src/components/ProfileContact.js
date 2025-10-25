import React, { useState } from 'react';
import '../styles/components/ProfileContact.scss';

export default function ProfileContact({ user, isEditing }) {
    const [contactInfo, setContactInfo] = useState({
        phone: user?.phone || '',
        email: user?.email || '',
        address: user?.address || '',
        website: user?.website || '',
        linkedin: user?.linkedin || '',
        github: user?.github || '',
        skype: user?.skype || ''
    });

    const [showContactModal, setShowContactModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveContact = () => {
        // Cập nhật thông tin liên hệ trong localStorage
        const updatedUser = {
            ...user,
            ...contactInfo
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Dispatch event để cập nhật header
        window.dispatchEvent(new Event('user-changed'));
    };

    const handleContactRequest = () => {
        setShowContactModal(true);
    };

    const handleCloseModal = () => {
        setShowContactModal(false);
    };

    const isPhoneVerified = user?.verification?.phone || false;
    const isEmailVerified = user?.verification?.email || false;

    return (
        <div className="profile-contact">
            <div className="contact-header">
                <h2>Thông tin liên lạc</h2>
            </div>

            <div className="contact-content">
                {isEditing ? (
                    <div className="contact-edit-form">
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <div className="input-with-status">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={contactInfo.phone}
                                    onChange={handleInputChange}
                                    className="contact-input"
                                    placeholder="Nhập số điện thoại"
                                />
                                <span className={`verification-status ${isPhoneVerified ? 'verified' : 'unverified'}`}>
                                    {isPhoneVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-with-status">
                                <input
                                    type="email"
                                    name="email"
                                    value={contactInfo.email}
                                    onChange={handleInputChange}
                                    className="contact-input"
                                    placeholder="Nhập email"
                                />
                                <span className={`verification-status ${isEmailVerified ? 'verified' : 'unverified'}`}>
                                    {isEmailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={contactInfo.address}
                                onChange={handleInputChange}
                                className="contact-input"
                                placeholder="Nhập địa chỉ"
                            />
                        </div>

                        <div className="form-group">
                            <label>Website</label>
                            <input
                                type="url"
                                name="website"
                                value={contactInfo.website}
                                onChange={handleInputChange}
                                className="contact-input"
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>LinkedIn</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={contactInfo.linkedin}
                                onChange={handleInputChange}
                                className="contact-input"
                                placeholder="https://linkedin.com/in/yourprofile"
                            />
                        </div>

                        <div className="form-group">
                            <label>GitHub</label>
                            <input
                                type="url"
                                name="github"
                                value={contactInfo.github}
                                onChange={handleInputChange}
                                className="contact-input"
                                placeholder="https://github.com/yourusername"
                            />
                        </div>

                        <div className="form-group">
                            <label>Skype</label>
                            <input
                                type="text"
                                name="skype"
                                value={contactInfo.skype}
                                onChange={handleInputChange}
                                className="contact-input"
                                placeholder="Skype username"
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleSaveContact}>
                            Lưu thông tin liên hệ
                        </button>
                    </div>
                ) : (
                    <div className="contact-display">
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-label">Số điện thoại:</span>
                                <span className="contact-value">
                                    {contactInfo.phone ? (
                                        <span className="phone-number">{contactInfo.phone}</span>
                                    ) : (
                                        <span className="hidden-info">Đã được ẩn</span>
                                    )}
                                </span>
                                {!isPhoneVerified && (
                                    <span className="verification-badge unverified">Chưa xác thực</span>
                                )}
                            </div>

                            <div className="contact-item">
                                <span className="contact-label">Email:</span>
                                <span className="contact-value">
                                    {contactInfo.email ? (
                                        <span className="email-address">{contactInfo.email}</span>
                                    ) : (
                                        <span className="hidden-info">Đã được ẩn</span>
                                    )}
                                </span>
                                {!isEmailVerified && (
                                    <span className="verification-badge unverified">Chưa xác thực</span>
                                )}
                            </div>

                            {contactInfo.address && (
                                <div className="contact-item">
                                    <span className="contact-label">Địa chỉ:</span>
                                    <span className="contact-value">{contactInfo.address}</span>
                                </div>
                            )}

                            {contactInfo.website && (
                                <div className="contact-item">
                                    <span className="contact-label">Website:</span>
                                    <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="contact-link">
                                        {contactInfo.website}
                                    </a>
                                </div>
                            )}

                            {contactInfo.linkedin && (
                                <div className="contact-item">
                                    <span className="contact-label">LinkedIn:</span>
                                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                                        {contactInfo.linkedin}
                                    </a>
                                </div>
                            )}

                            {contactInfo.github && (
                                <div className="contact-item">
                                    <span className="contact-label">GitHub:</span>
                                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                                        {contactInfo.github}
                                    </a>
                                </div>
                            )}

                            {contactInfo.skype && (
                                <div className="contact-item">
                                    <span className="contact-label">Skype:</span>
                                    <span className="contact-value">{contactInfo.skype}</span>
                                </div>
                            )}
                        </div>

                        <div className="contact-actions">
                            <button className="btn btn-primary" onClick={handleContactRequest}>
                                Liên hệ
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="contact-modal-overlay" onClick={handleCloseModal}>
                    <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Liên hệ trực tiếp</h3>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="modal-content">
                            {!isPhoneVerified ? (
                                <div className="verification-warning">
                                    <div className="warning-icon">
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <h4>Chưa thể lấy số điện thoại</h4>
                                    <p>
                                        Freelancer <strong>{user?.name}</strong> chưa xác thực số điện thoại 
                                        nên chưa thể thực hiện tính năng này. Đối với các freelancer đã xác thực, 
                                        bạn sẽ nhận được gợi ý lấy số của họ ngay.
                                    </p>
                                    <p>
                                        Bạn vui lòng gửi yêu cầu freelancer xác thực số điện thoại. 
                                        vLance sẽ thông báo cho bạn sau khi freelancer thực hiện yêu cầu.
                                    </p>
                                    <button className="btn btn-primary">
                                        Gửi yêu cầu freelancer xác thực
                                    </button>
                                </div>
                            ) : (
                                <div className="contact-success">
                                    <div className="success-icon">
                                        <i className="fas fa-check-circle"></i>
                                    </div>
                                    <h4>Gửi yêu cầu thành công</h4>
                                    <p>
                                        Ngay khi freelancer {user?.name} xác thực, vLance sẽ thông báo tới bạn 
                                        để lấy số điện thoại.
                                    </p>
                                    <p>
                                        <strong>Lưu ý:</strong> Bạn và freelancer vẫn có thể tiếp tục nhắn tin 
                                        trên Gói dịch vụ để được lưu trữ thông tin trao đổi trên hệ thống vLance.
                                    </p>
                                    <button className="btn btn-primary">
                                        Tiếp tục nhắn tin trao đổi
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
