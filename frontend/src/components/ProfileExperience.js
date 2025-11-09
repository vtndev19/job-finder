import React, { useState } from 'react';
import '../styles/components/ProfileExperience.scss';

export default function ProfileExperience({ user, isEditing, onSave }) {
    const [experiences, setExperiences] = useState(user?.workExperience || []);
    const [newExperience, setNewExperience] = useState({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        achievements: ''
    });

    const handleAdd = () => {
        if (newExperience.company && newExperience.position) {
            const updatedExperiences = [...experiences, { ...newExperience, id: Date.now() }];
            setExperiences(updatedExperiences);
            onSave({ workExperience: updatedExperiences });
            setNewExperience({
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                location: '',
                description: '',
                achievements: ''
            });
        }
    };

    const handleDelete = (id) => {
        const updatedExperiences = experiences.filter(exp => exp.id !== id);
        setExperiences(updatedExperiences);
        onSave({ workExperience: updatedExperiences });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperience(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="profile-experience">
            <h2>Kinh nghiệm làm việc</h2>
            
            {experiences.map((exp) => (
                <div key={exp.id} className="experience-item">
                    <div className="experience-header">
                        <h3>{exp.position}</h3>
                        {isEditing && (
                            <button 
                                className="btn-delete"
                                onClick={() => handleDelete(exp.id)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        )}
                    </div>
                    <p className="company">{exp.company}</p>
                    <p className="period">
                        {exp.startDate} - {exp.endDate || 'Hiện tại'}
                        {exp.location && ` • ${exp.location}`}
                    </p>
                    {exp.description && (
                        <div className="description">
                            <h4>Mô tả công việc:</h4>
                            <p>{exp.description}</p>
                        </div>
                    )}
                    {exp.achievements && (
                        <div className="achievements">
                            <h4>Thành tựu:</h4>
                            <p>{exp.achievements}</p>
                        </div>
                    )}
                </div>
            ))}

            {isEditing && (
                <div className="experience-form">
                    <h3>Thêm kinh nghiệm làm việc mới</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="company"
                                placeholder="Tên công ty"
                                value={newExperience.company}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="position"
                                placeholder="Vị trí công việc"
                                value={newExperience.position}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="startDate"
                                placeholder="Ngày bắt đầu (MM/YYYY)"
                                value={newExperience.startDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="endDate"
                                placeholder="Ngày kết thúc (MM/YYYY hoặc để trống nếu đang làm việc)"
                                value={newExperience.endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="location"
                            placeholder="Địa điểm làm việc"
                            value={newExperience.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            placeholder="Mô tả chi tiết công việc và trách nhiệm"
                            value={newExperience.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="achievements"
                            placeholder="Thành tựu đạt được (không bắt buộc)"
                            value={newExperience.achievements}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAdd}>
                        Thêm kinh nghiệm
                    </button>
                </div>
            )}
        </div>
    );
}