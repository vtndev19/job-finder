import React from 'react';
import '../styles/components/ProfileModal.scss';

export default function ProfileModal({ title, description, onClose, children }) {
    return (
        <div className="profile-modal-overlay" role="dialog" aria-modal="true">
            <div className="profile-modal">
                <header className="profile-modal__header">
                    <div className="profile-modal__title-group">
                        <h2>{title}</h2>
                        {description && <p>{description}</p>}
                    </div>
                    <button
                        type="button"
                        className="profile-modal__close"
                        onClick={onClose}
                        aria-label="Đóng"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </header>
                <div className="profile-modal__content">
                    {children}
                </div>
            </div>
        </div>
    );
}
