import React, { useEffect, useMemo, useState } from 'react';
import '../styles/components/ProfileSectionCard.scss';

function buildDefaultItem(fields) {
    return fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue ?? '';
        return acc;
    }, {});
}

export default function ProfileSectionCard({
    title,
    description,
    items = [],
    fields,
    isEditing,
    onSave,
    onCancel,
    addLabel = 'Thêm mục',
    emptyMessage = 'Chưa có dữ liệu',
    sectionKey,
    anchorId,
    onEdit
}) {
    const defaultItem = useMemo(() => buildDefaultItem(fields), [fields]);
    const [localItems, setLocalItems] = useState(() =>
        (items && items.length > 0
            ? items.map((item, index) => ({ id: item.id ?? index + 1, ...item }))
            : [])
    );

    useEffect(() => {
        setLocalItems(
            items && items.length > 0
                ? items.map((item, index) => ({ id: item.id ?? index + 1, ...item }))
                : []
        );
    }, [items, isEditing]);

    const handleFieldChange = (id, fieldName, value) => {
        setLocalItems(prev =>
            prev.map(item => (item.id === id ? { ...item, [fieldName]: value } : item))
        );
    };

    const handleAddItem = () => {
        setLocalItems(prev => [
            ...prev,
            {
                id: Date.now(),
                ...defaultItem
            }
        ]);
    };

    const handleRemoveItem = (id) => {
        setLocalItems(prev => prev.filter(item => item.id !== id));
    };

    const handleSave = () => {
        const sanitized = localItems.map(item => {
            const { id, ...rest } = item;
            return { id, ...rest };
        });
        const success = onSave?.(sanitized);
        if (success) {
            onCancel?.();
        }
    };

    const handleCancel = () => {
        setLocalItems(
            items && items.length > 0
                ? items.map((item, index) => ({ id: item.id ?? index + 1, ...item }))
                : []
        );
        onCancel?.();
    };

    const hasData = localItems.length > 0;
    const elementId = anchorId || sectionKey;

    return (
        <section className={`profile-section-card ${isEditing ? 'is-editing' : ''}`} data-section={sectionKey} id={elementId}>
            <header className="section-header">
                <div>
                    <h2>{title}</h2>
                    {description && <p className="section-description">{description}</p>}
                </div>
                {!isEditing && (
                    <>
                        <span className={`section-count ${hasData ? 'filled' : 'empty'}`}>
                            {hasData ? `${localItems.length} mục` : 'Chưa cập nhật'}
                        </span>
                        {onEdit && (
                            <button className="section-edit-btn" type="button" onClick={onEdit}>
                                <i className="fas fa-pen"></i> Chỉnh sửa
                            </button>
                        )}
                    </>
                )}
            </header>

            <div className="section-body">
                {isEditing ? (
                    <div className="section-editor">
                        {localItems.length === 0 && (
                            <div className="section-empty-edit">
                                <p>{emptyMessage}</p>
                                <button className="btn btn-outline" type="button" onClick={handleAddItem}>
                                    {addLabel}
                                </button>
                            </div>
                        )}

                        {localItems.map((item, index) => (
                            <div key={item.id} className="section-edit-item">
                                <div className="item-index">#{index + 1}</div>
                                <div className="item-fields">
                                    {fields.map(field => {
                                        const fieldId = `${sectionKey || title}-${field.name}-${item.id}`;
                                        const value = item[field.name] ?? '';

                                        if (field.type === 'textarea') {
                                            return (
                                                <div className="form-group" key={fieldId}>
                                                    <label htmlFor={fieldId}>{field.label}</label>
                                                    <textarea
                                                        id={fieldId}
                                                        value={value}
                                                        placeholder={field.placeholder}
                                                        rows={field.rows || 3}
                                                        onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                                                    />
                                                </div>
                                            );
                                        }

                                        if (field.type === 'select') {
                                            return (
                                                <div className="form-group" key={fieldId}>
                                                    <label htmlFor={fieldId}>{field.label}</label>
                                                    <select
                                                        id={fieldId}
                                                        value={value}
                                                        onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                                                    >
                                                        <option value="">Chọn</option>
                                                        {field.options?.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div className="form-group" key={fieldId}>
                                                <label htmlFor={fieldId}>{field.label}</label>
                                                <input
                                                    id={fieldId}
                                                    type={field.type || 'text'}
                                                    value={value}
                                                    placeholder={field.placeholder}
                                                    onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    className="remove-item-btn"
                                    onClick={() => handleRemoveItem(item.id)}
                                    aria-label={`Xóa mục ${index + 1}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <div className="section-editor-actions">
                            <button className="btn btn-outline" type="button" onClick={handleAddItem}>
                                {addLabel}
                            </button>
                            <div className="action-group">
                                <button className="btn btn-primary" type="button" onClick={handleSave}>
                                    Lưu mục
                                </button>
                                <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="section-display">
                        {hasData ? (
                            localItems.map(item => (
                                <article key={item.id} className="section-item">
                                    <div className="item-header">
                                        <h3>{item[fields[0]?.name] || 'Chưa cập nhật'}</h3>
                                        {fields[1] && item[fields[1].name] && (
                                            <span className="item-subtitle">{item[fields[1].name]}</span>
                                        )}
                                    </div>
                                    <div className="item-details">
                                        {fields.slice(2).map(field => {
                                            const value = item[field.name];
                                            if (!value) return null;
                                            if (field.type === 'textarea') {
                                                return (
                                                    <p key={field.name} className="item-paragraph">
                                                        {value}
                                                    </p>
                                                );
                                            }
                                            return (
                                                <p key={field.name} className="item-meta">
                                                    <span className="label">{field.label}:</span>
                                                    <span className="value">{value}</span>
                                                </p>
                                            );
                                        })}
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="section-empty">
                                <p>{emptyMessage}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
