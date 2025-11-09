import React, { useEffect, useState } from 'react';
import '../styles/components/ProfileObjectiveCard.scss';

export default function ProfileObjectiveCard({ value, isEditing, onSave, onCancel, onEdit }) {
    const [localValue, setLocalValue] = useState(value || '');

    useEffect(() => {
        setLocalValue(value || '');
    }, [value, isEditing]);

    const handleSave = () => {
        const success = onSave?.(localValue || '');
        if (success) {
            onCancel?.();
        }
    };

    const handleCancel = () => {
        setLocalValue(value || '');
        onCancel?.();
    };

    return (
        <section className={`profile-objective-card ${isEditing ? 'is-editing' : ''}`} id="objective">
            <header className="objective-header">
                <div>
                    <h2>Mục tiêu nghề nghiệp</h2>
                    <p>Giới thiệu bản thân và mô tả mục tiêu nghề nghiệp của bạn để thu hút nhà tuyển dụng.</p>
                </div>
                {!isEditing ? (
                    <span className={value ? 'status-filled' : 'status-empty'}>
                        {value ? 'Đã cập nhật' : 'Chưa cập nhật'}
                    </span>
                ) : null}
                {!isEditing && onEdit && (
                    <button className="section-edit-btn" type="button" onClick={onEdit}>
                        <i className="fas fa-pen"></i> Chỉnh sửa
                    </button>
                )}
            </header>

            <div className="objective-body">
                {isEditing ? (
                    <>
                        <textarea
                            value={localValue}
                            placeholder="Ví dụ: Tôi mong muốn tìm kiếm cơ hội làm việc trong môi trường năng động, nơi tôi có thể áp dụng kỹ năng thiết kế UI/UX và phát triển sản phẩm..."
                            onChange={(e) => setLocalValue(e.target.value)}
                        />
                        <div className="objective-actions">
                            <button className="btn btn-primary" type="button" onClick={handleSave}>
                                Lưu mục tiêu
                            </button>
                            <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                                Hủy
                            </button>
                        </div>
                    </>
                ) : (
                    <p className={`objective-text ${value ? '' : 'empty'}`}>
                        {value || 'Hãy bổ sung mục tiêu nghề nghiệp để nhà tuyển dụng hiểu rõ định hướng của bạn.'}
                    </p>
                )}
            </div>
        </section>
    );
}
