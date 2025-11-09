import React from 'react';
import AdminModal from './AdminModal';
import '../styles/components/AdminConfirmDialog.scss';

export default function AdminConfirmDialog({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <AdminModal isOpen={isOpen} onClose={onClose} title={title} size="small">
            <div className="admin-confirm-dialog">
                <div className="admin-confirm-dialog__icon">
                    {type === 'danger' && <i className="fas fa-exclamation-triangle"></i>}
                    {type === 'warning' && <i className="fas fa-exclamation-circle"></i>}
                    {type === 'info' && <i className="fas fa-info-circle"></i>}
                </div>
                <p className="admin-confirm-dialog__message">{message}</p>
                <div className="admin-confirm-dialog__actions">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Hủy
                    </button>
                    <button className={`btn btn-${type}`} onClick={handleConfirm}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </AdminModal>
    );
}


