import React, { useEffect } from 'react';
import '../styles/components/AdminModal.scss';

export default function AdminModal({ isOpen, onClose, title, children, size = 'medium' }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div className={`admin-modal admin-modal--${size}`} onClick={(e) => e.stopPropagation()}>
                <div className="admin-modal__header">
                    <h2>{title}</h2>
                    <button className="admin-modal__close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="admin-modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
}


