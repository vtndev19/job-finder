import React, { useState, useEffect } from 'react';
import '../styles/components/ProfileSkills.scss';

export default function ProfileSkills({ user, isEditing, onSave, onEdit, onCancel }) {
    const [skills, setSkills] = useState(user?.skills || [
        { id: 1, name: 'Xử lý dữ liệu', category: 'Data Processing' },
        { id: 2, name: 'Lập trình web', category: 'Web Development' },
        { id: 3, name: 'Thiết kế UI/UX', category: 'Design' }
    ]);

    useEffect(() => {
        if (user?.skills) {
            setSkills(user.skills);
        }
    }, [user, isEditing]);

    const [newSkill, setNewSkill] = useState({ name: '', category: '' });

    const handleAddSkill = () => {
        if (newSkill.name.trim()) {
            const skill = {
                id: Date.now(),
                name: newSkill.name,
                category: newSkill.category || 'Other'
            };
            setSkills(prev => [...prev, skill]);
            setNewSkill({ name: '', category: '' });
        }
    };

    const handleRemoveSkill = (skillId) => {
        setSkills(prev => prev.filter(skill => skill.id !== skillId));
    };

    const handleSkillChange = (skillId, field, value) => {
        setSkills(prev => prev.map(skill => 
            skill.id === skillId ? { ...skill, [field]: value } : skill
        ));
    };

    const handleSaveSkills = () => {
        const success = onSave?.({ skills });
        if (success) {
            onCancel?.();
        }
    };

    const handleCancelEdit = () => {
        if (user?.skills) {
            setSkills(user.skills);
        }
        onCancel?.();
    };

    return (
        <div className={`profile-skills ${isEditing ? 'is-editing' : ''}`} id="skills">
            <div className="skills-header">
                <h2>Hồ sơ năng lực</h2>
                {!isEditing && onEdit && (
                    <button className="section-edit-btn" type="button" onClick={onEdit}>
                        <i className="fas fa-pen"></i> Chỉnh sửa
                    </button>
                )}
                {isEditing && (
                    <span className="status-text">Freelancer đang cập nhật kỹ năng</span>
                )}
            </div>

            <div className="skills-content">
                {skills.length === 0 ? (
                    <div className="empty-state">
                        <p>Freelancer đang bổ sung hồ sơ năng lực.</p>
                    </div>
                ) : (
                    <div className="skills-grid">
                        {skills.map(skill => (
                            <div key={skill.id} className="skill-item">
                                {isEditing ? (
                                    <div className="skill-edit">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                                            className="skill-input"
                                        />
                                        <input
                                            type="text"
                                            value={skill.category}
                                            onChange={(e) => handleSkillChange(skill.id, 'category', e.target.value)}
                                            className="skill-category-input"
                                            placeholder="Danh mục"
                                        />
                                        <button 
                                            className="remove-skill-btn"
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill.id)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="skill-display">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-category">{skill.category}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {isEditing && (
                    <>
                        <div className="add-skill-section">
                            <h3>Thêm kỹ năng mới</h3>
                            <div className="add-skill-form">
                                <input
                                    type="text"
                                    placeholder="Tên kỹ năng"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                                    className="skill-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Danh mục"
                                    value={newSkill.category}
                                    onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                                    className="skill-category-input"
                                />
                                <button className="btn btn-primary" type="button" onClick={handleAddSkill}>
                                    Thêm kỹ năng
                                </button>
                            </div>
                        </div>
                        <div className="skills-save-section">
                            <button className="btn btn-primary" type="button" onClick={handleSaveSkills}>
                                Lưu kỹ năng
                            </button>
                            <button className="btn btn-secondary" type="button" onClick={handleCancelEdit}>
                                Hủy
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="skills-footer">
                <div className="experience-info">
                    <h3>Freelancer kinh nghiệm</h3>
                    <p>{user?.experience || 'Freelancer 1-3 năm kinh nghiệm làm việc từ xa'}</p>
                </div>
                
                <div className="cta-section">
                    <h3>Đăng việc ngay</h3>
                    <p>Chỉ trong 3 bước: đăng ký/đăng nhập - đăng việc - liên hệ Freelancer.</p>
                </div>
            </div>
        </div>
    );
}
