import React, { useState, useEffect } from 'react';
import '../styles/components/ProfilePortfolio.scss';

export default function ProfilePortfolio({ user, isEditing, onSave, onEdit, onCancel }) {
    const [portfolio, setPortfolio] = useState(user?.portfolio || [
        {
            id: 1,
            title: 'Website thương mại điện tử',
            description: 'Phát triển website bán hàng online với React và Node.js',
            image: '/portfolio-1.jpg',
            technologies: ['React', 'Node.js', 'MongoDB'],
            status: 'Hoàn thành',
            date: '2024-12-15'
        },
        {
            id: 2,
            title: 'Ứng dụng quản lý khách hàng',
            description: 'Xây dựng hệ thống CRM cho doanh nghiệp',
            image: '/portfolio-2.jpg',
            technologies: ['Vue.js', 'Express', 'PostgreSQL'],
            status: 'Đang thực hiện',
            date: '2024-11-20'
        }
    ]);

    useEffect(() => {
        if (user?.portfolio) {
            setPortfolio(user.portfolio);
        }
    }, [user, isEditing]);

    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        status: 'Hoàn thành',
        date: new Date().toISOString().split('T')[0]
    });

    const handleAddProject = () => {
        if (newProject.title.trim()) {
            const project = {
                id: Date.now(),
                ...newProject,
                technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
            };
            setPortfolio(prev => [...prev, project]);
            setNewProject({
                title: '',
                description: '',
                image: '',
                technologies: '',
                status: 'Hoàn thành',
                date: new Date().toISOString().split('T')[0]
            });
        }
    };

    const handleRemoveProject = (projectId) => {
        setPortfolio(prev => prev.filter(project => project.id !== projectId));
    };

    const handleProjectChange = (projectId, field, value) => {
        setPortfolio(prev => prev.map(project => {
            if (project.id === projectId) {
                if (field === 'technologies') {
                    return {
                        ...project,
                        technologies: typeof value === 'string'
                            ? value.split(',').map(tech => tech.trim()).filter(tech => tech)
                            : value
                    };
                }
                return { ...project, [field]: value };
            }
            return project;
        }));
    };

    const handleSavePortfolio = () => {
        const success = onSave?.({ portfolio });
        if (success) {
            onCancel?.();
        }
    };

    const handleCancelEdit = () => {
        if (user?.portfolio) {
            setPortfolio(user.portfolio);
        }
        onCancel?.();
    };

    return (
        <div className={`profile-portfolio ${isEditing ? 'is-editing' : ''}`} id="portfolio">
            <div className="portfolio-header">
                <h2>Dự án đã thực hiện</h2>
                {!isEditing && onEdit && (
                    <button className="section-edit-btn" type="button" onClick={onEdit}>
                        <i className="fas fa-pen"></i> Chỉnh sửa
                    </button>
                )}
                {isEditing && (
                    <span className="status-text">Freelancer đang cập nhật portfolio</span>
                )}
            </div>

            <div className="portfolio-content">
                {portfolio.length === 0 ? (
                    <div className="empty-state">
                        <p>Freelancer chưa có dự án nào trong portfolio.</p>
                    </div>
                ) : (
                    <div className="portfolio-grid">
                        {portfolio.map(project => (
                            <div key={project.id} className="portfolio-item">
                                <div className="project-image">
                                    <img 
                                        src={project.image || '/default-project.jpg'} 
                                        alt={project.title}
                                        onError={(e) => {
                                            e.target.src = '/default-project.jpg';
                                        }}
                                    />
                                    {isEditing && (
                                        <button 
                                            className="remove-project-btn"
                                            type="button"
                                            onClick={() => handleRemoveProject(project.id)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                                
                                <div className="project-info">
                                    {isEditing ? (
                                        <div className="project-edit">
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                                                className="project-title-input"
                                            />
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                                                className="project-description-input"
                                                rows="3"
                                            />
                                            <input
                                                type="text"
                                                value={Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                                                onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value)}
                                                className="project-tech-input"
                                                placeholder="Công nghệ sử dụng (cách nhau bởi dấu phẩy)"
                                            />
                                            <div className="project-meta-edit">
                                                <select
                                                    value={project.status}
                                                    onChange={(e) => handleProjectChange(project.id, 'status', e.target.value)}
                                                    className="status-select"
                                                >
                                                    <option value="Hoàn thành">Hoàn thành</option>
                                                    <option value="Đang thực hiện">Đang thực hiện</option>
                                                    <option value="Tạm dừng">Tạm dừng</option>
                                                </select>
                                                <input
                                                    type="date"
                                                    value={project.date}
                                                    onChange={(e) => handleProjectChange(project.id, 'date', e.target.value)}
                                                    className="date-input"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="project-display">
                                            <h3 className="project-title">{project.title}</h3>
                                            <p className="project-description">{project.description}</p>
                                            <div className="project-technologies">
                                                {(project.technologies || []).map((tech, index) => (
                                                    <span key={index} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="project-meta">
                                                <span className={`status-badge ${project.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                                    {project.status}
                                                </span>
                                                <span className="project-date">
                                                    {new Date(project.date).toLocaleDateString('vi-VN')}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isEditing && (
                    <>
                        <div className="add-project-section">
                            <h3>Thêm dự án mới</h3>
                            <div className="add-project-form">
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Tên dự án"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                                        className="project-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL hình ảnh"
                                        value={newProject.image}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
                                        className="project-input"
                                    />
                                </div>
                                <textarea
                                    placeholder="Mô tả dự án"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                                    className="project-textarea"
                                    rows="3"
                                />
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Công nghệ sử dụng (cách nhau bởi dấu phẩy)"
                                        value={newProject.technologies}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
                                        className="project-input"
                                    />
                                    <select
                                        value={newProject.status}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value }))}
                                        className="status-select"
                                    >
                                        <option value="Hoàn thành">Hoàn thành</option>
                                        <option value="Đang thực hiện">Đang thực hiện</option>
                                        <option value="Tạm dừng">Tạm dừng</option>
                                    </select>
                                    <input
                                        type="date"
                                        value={newProject.date}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, date: e.target.value }))}
                                        className="date-input"
                                    />
                                </div>
                                <button className="btn btn-primary" type="button" onClick={handleAddProject}>
                                    Thêm dự án
                                </button>
                            </div>
                        </div>
                        <div className="portfolio-save-section">
                            <button className="btn btn-primary" type="button" onClick={handleSavePortfolio}>
                                Lưu portfolio
                            </button>
                            <button className="btn btn-secondary" type="button" onClick={handleCancelEdit}>
                                Hủy
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
