import React, { useEffect } from 'react';
import '../styles/components/AdminToast.scss';

export default function AdminToast({ message, type = 'info', isVisible, onClose, duration = 3000 }) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    return (
        <div className={`admin-toast admin-toast--${type} ${isVisible ? 'admin-toast--show' : ''}`}>
            <div className="admin-toast__icon">
                <i className={`fas ${icons[type]}`}></i>
            </div>
            <div className="admin-toast__message">{message}</div>
            <button className="admin-toast__close" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}


