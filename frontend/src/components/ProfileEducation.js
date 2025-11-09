import React, { useState } from 'react';
import '../styles/components/ProfileEducation.scss';

export default function ProfileEducation({ user, isEditing, onSave }) {
    const [educations, setEducations] = useState(user?.education || []);
    const [newEducation, setNewEducation] = useState({
        school: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        description: ''
    });

    const handleAdd = () => {
        if (newEducation.school && newEducation.degree) {
            const updatedEducations = [...educations, { ...newEducation, id: Date.now() }];
            setEducations(updatedEducations);
            onSave({ education: updatedEducations });
            setNewEducation({
                school: '',
                degree: '',
                field: '',
                startYear: '',
                endYear: '',
                description: ''
            });
        }
    };

    const handleDelete = (id) => {
        const updatedEducations = educations.filter(edu => edu.id !== id);
        setEducations(updatedEducations);
        onSave({ education: updatedEducations });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEducation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="profile-education">
            <h2>Học vấn</h2>
            
            {educations.map((edu) => (
                <div key={edu.id} className="education-item">
                    <div className="education-header">
                        <h3>{edu.school}</h3>
                        {isEditing && (
                            <button 
                                className="btn-delete"
                                onClick={() => handleDelete(edu.id)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        )}
                    </div>
                    <p className="degree">{edu.degree} - {edu.field}</p>
                    <p className="year">{edu.startYear} - {edu.endYear || 'Hiện tại'}</p>
                    {edu.description && (
                        <p className="description">{edu.description}</p>
                    )}
                </div>
            ))}

            {isEditing && (
                <div className="education-form">
                    <h3>Thêm học vấn mới</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            name="school"
                            placeholder="Tên trường"
                            value={newEducation.school}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="degree"
                                placeholder="Bằng cấp"
                                value={newEducation.degree}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="field"
                                placeholder="Ngành học"
                                value={newEducation.field}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="startYear"
                                placeholder="Năm bắt đầu"
                                value={newEducation.startYear}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="endYear"
                                placeholder="Năm kết thúc (hoặc để trống nếu đang học)"
                                value={newEducation.endYear}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            placeholder="Mô tả thêm về quá trình học tập (không bắt buộc)"
                            value={newEducation.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAdd}>
                        Thêm học vấn
                    </button>
                </div>
            )}
        </div>
    );
}