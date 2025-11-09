import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import ProfileSkills from '../components/ProfileSkills';
import ProfilePortfolio from '../components/ProfilePortfolio';
import ProfileContact from '../components/ProfileContact';
import ProfileObjectiveCard from '../components/ProfileObjectiveCard';
import ProfileSectionCard from '../components/ProfileSectionCard';
import ProfileModal from '../components/ProfileModal';
import ProfileHeaderForm from '../components/ProfileHeaderForm';
import '../styles/Profile.scss';

const defaultProfileData = {
    basicInfo: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        currentLevel: '',
        currentIndustry: '',
        currentFunction: '',
        yearsExperience: '',
        currentSalary: '',
        highestDegree: '',
        location: '',
        avatar: ''
    },
    contact: {
        email: '',
        phoneCountryCode: '+84',
        phoneNumber: '',
        nationality: '',
        address: '',
        city: '',
        country: '',
        gender: '',
        maritalStatus: '',
        dateOfBirth: ''
    },
    objective: '',
    targetJob: {
        jobTitle: '',
        location: '',
        salary: '',
        workMode: '',
        jobLevel: ''
    },
    experiences: [],
    education: [],
    languages: [],
    references: [],
    testimonials: [],
    certificates: [],
    activities: [],
    skills: [],
    portfolio: []
};

const completionRules = [
    {
        key: 'objective',
        label: 'Mục tiêu nghề nghiệp',
        check: (data) => Boolean(data.objective?.trim())
    },
    {
        key: 'experiences',
        label: 'Kinh nghiệm làm việc',
        check: (data) => Array.isArray(data.experiences) && data.experiences.length > 0
    },
    {
        key: 'education',
        label: 'Học vấn',
        check: (data) => Array.isArray(data.education) && data.education.length > 0
    },
    {
        key: 'portfolio',
        label: 'Dự án',
        check: (data) => (Array.isArray(data.portfolio) && data.portfolio.length > 0)
    },
    {
        key: 'skills',
        label: 'Kỹ năng',
        check: (data) => (Array.isArray(data.skills) && data.skills.length > 0)
    },
    {
        key: 'languages',
        label: 'Ngoại ngữ',
        check: (data) => Array.isArray(data.languages) && data.languages.length > 0
    },
    {
        key: 'references',
        label: 'Người tham khảo',
        check: (data) => Array.isArray(data.references) && data.references.length > 0
    },
    {
        key: 'testimonials',
        label: 'Lời nhận xét',
        check: (data) => Array.isArray(data.testimonials) && data.testimonials.length > 0
    },
    {
        key: 'certificates',
        label: 'Chứng chỉ',
        check: (data) => Array.isArray(data.certificates) && data.certificates.length > 0
    },
    {
        key: 'activities',
        label: 'Hoạt động',
        check: (data) => Array.isArray(data.activities) && data.activities.length > 0
    },
    {
        key: 'contact',
        label: 'Thông tin liên hệ',
        check: (data) => Boolean(data.phone || data.email)
    },
    {
        key: 'targetJob',
        label: 'Công việc mong muốn',
        check: (data) => Boolean(data.targetJob?.jobTitle || data.targetJob?.location || data.targetJob?.salary)
    }
];

const sectionConfigs = [
    {
        key: 'experiences',
        title: 'Kinh nghiệm làm việc',
        description: 'Mô tả chi tiết trải nghiệm nghề nghiệp để tăng độ tin cậy cho hồ sơ của bạn.',
        addLabel: 'Thêm kinh nghiệm',
        emptyMessage: 'Bạn chưa cập nhật kinh nghiệm nào.',
        fields: [
            { name: 'position', label: 'Vị trí', placeholder: 'VD: Frontend Developer', type: 'text' },
            { name: 'company', label: 'Đơn vị công tác', placeholder: 'Tên công ty / tổ chức', type: 'text' },
            { name: 'period', label: 'Thời gian làm việc', placeholder: 'VD: 01/2022 - 08/2024', type: 'text' },
            { name: 'description', label: 'Mô tả chi tiết', placeholder: 'Tóm tắt trách nhiệm, thành tựu nổi bật...', type: 'textarea', rows: 4 }
        ]
    },
    {
        key: 'education',
        title: 'Học vấn',
        description: 'Liệt kê các bằng cấp và chương trình đào tạo bạn đã tham gia.',
        addLabel: 'Thêm học vấn',
        emptyMessage: 'Bạn chưa cập nhật thông tin học vấn.',
        fields: [
            { name: 'school', label: 'Trường / Đơn vị đào tạo', placeholder: 'VD: Đại học Bách Khoa Hà Nội', type: 'text' },
            { name: 'degree', label: 'Ngành học / Bằng cấp', placeholder: 'VD: Kỹ sư Công nghệ thông tin', type: 'text' },
            { name: 'period', label: 'Thời gian học', placeholder: 'VD: 2018 - 2022', type: 'text' },
            { name: 'description', label: 'Thành tích / Hoạt động nổi bật', placeholder: 'Mô tả các thành tích, hoạt động...', type: 'textarea', rows: 3 }
        ]
    },
    {
        key: 'languages',
        title: 'Ngoại ngữ',
        description: 'Cập nhật trình độ ngoại ngữ giúp tăng lợi thế cạnh tranh của bạn.',
        addLabel: 'Thêm ngoại ngữ',
        emptyMessage: 'Bạn chưa bổ sung ngoại ngữ.',
        fields: [
            { name: 'language', label: 'Ngoại ngữ', placeholder: 'VD: Tiếng Anh', type: 'text' },
            {
                name: 'level',
                label: 'Trình độ',
                type: 'select',
                options: [
                    { value: 'basic', label: 'Cơ bản' },
                    { value: 'intermediate', label: 'Trung cấp' },
                    { value: 'advanced', label: 'Cao cấp' },
                    { value: 'native', label: 'Bản ngữ' }
                ]
            },
            { name: 'certificate', label: 'Chứng chỉ (nếu có)', placeholder: 'VD: IELTS 7.5', type: 'text' }
        ]
    },
    {
        key: 'references',
        title: 'Người tham khảo',
        description: 'Thêm thông tin người tham khảo để tăng độ tin cậy cho hồ sơ.',
        addLabel: 'Thêm người tham khảo',
        emptyMessage: 'Bạn chưa thêm người tham khảo.',
        fields: [
            { name: 'name', label: 'Họ và tên', placeholder: 'VD: Nguyễn Văn A', type: 'text' },
            { name: 'position', label: 'Chức vụ', placeholder: 'VD: Trưởng phòng kỹ thuật', type: 'text' },
            { name: 'company', label: 'Công ty', placeholder: 'Tên công ty hiện tại của người tham khảo', type: 'text' },
            { name: 'contact', label: 'Thông tin liên hệ', placeholder: 'Số điện thoại hoặc email', type: 'text' }
        ]
    },
    {
        key: 'testimonials',
        title: 'Lời nhận xét',
        description: 'Ghi lại những nhận xét tích cực từ đồng nghiệp, khách hàng hoặc sếp cũ.',
        addLabel: 'Thêm lời nhận xét',
        emptyMessage: 'Bạn chưa có lời nhận xét nào.',
        fields: [
            { name: 'author', label: 'Người nhận xét', placeholder: 'VD: Trần Thị B - CEO ABC', type: 'text' },
            { name: 'content', label: 'Nội dung nhận xét', placeholder: 'Nhận xét chi tiết về năng lực, thái độ làm việc...', type: 'textarea', rows: 4 }
        ]
    },
    {
        key: 'certificates',
        title: 'Chứng chỉ',
        description: 'Liệt kê các chứng chỉ chuyên môn để tăng độ tin cậy.',
        addLabel: 'Thêm chứng chỉ',
        emptyMessage: 'Bạn chưa bổ sung chứng chỉ.',
        fields: [
            { name: 'name', label: 'Tên chứng chỉ', placeholder: 'VD: AWS Certified Solutions Architect', type: 'text' },
            { name: 'issuer', label: 'Đơn vị cấp', placeholder: 'VD: Amazon Web Services', type: 'text' },
            { name: 'year', label: 'Năm cấp', placeholder: 'VD: 2024', type: 'text' }
        ]
    },
    {
        key: 'activities',
        title: 'Hoạt động',
        description: 'Các hoạt động ngoại khóa giúp hồ sơ của bạn năng động hơn.',
        addLabel: 'Thêm hoạt động',
        emptyMessage: 'Bạn chưa cập nhật hoạt động nào.',
        fields: [
            { name: 'name', label: 'Tên hoạt động', placeholder: 'VD: Câu lạc bộ tình nguyện', type: 'text' },
            { name: 'role', label: 'Vai trò', placeholder: 'VD: Trưởng ban truyền thông', type: 'text' },
            { name: 'description', label: 'Mô tả', placeholder: 'Nội dung hoạt động, thành tựu...', type: 'textarea', rows: 3 }
        ]
    }
];

function getCompletionLevel(progress) {
    if (progress >= 90) return 'Hoàn chỉnh';
    if (progress >= 70) return 'Tương đối hoàn chỉnh';
    if (progress >= 40) return 'Trung bình';
    if (progress >= 10) return 'Cơ bản';
    return 'Khởi tạo';
}

function ProfileTargetJobCard({ data, isEditing = false, onSave, onCancel, onEdit }) {
    const emptyTarget = defaultProfileData.targetJob;
    const [localData, setLocalData] = useState({ ...emptyTarget, ...data });

    useEffect(() => {
        setLocalData({ ...emptyTarget, ...data });
    }, [data, isEditing]);

    const handleChange = (field, value) => {
        setLocalData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const success = onSave?.(localData);
        if (success) {
            onCancel?.();
        }
    };

    const handleCancel = () => {
        setLocalData({ ...emptyTarget, ...data });
        onCancel?.();
    };

    const hasData = Object.values(localData).some(Boolean);

    return (
        <section className={`profile-target-card ${isEditing ? 'is-editing' : ''}`} id="targetJob">
            <header className="target-header">
                <div>
                    <h2>Công việc mong muốn</h2>
                    <p>Cho nhà tuyển dụng biết bạn đang tìm kiếm cơ hội như thế nào.</p>
                </div>
                {!isEditing && (
                    <>
                        <span className={hasData ? 'status-filled' : 'status-empty'}>
                            {hasData ? 'Đã cập nhật' : 'Chưa cập nhật'}
                        </span>
                        {onEdit && (
                            <button className="section-edit-btn" type="button" onClick={onEdit}>
                                <i className="fas fa-pen"></i> Chỉnh sửa
                            </button>
                        )}
                    </>
                )}
            </header>
            <div className="target-body">
                {isEditing ? (
                    <>
                        <div className="target-grid">
                            <div className="form-group">
                                <label htmlFor="target-jobTitle">Vị trí mong muốn</label>
                                <input
                                    id="target-jobTitle"
                                    type="text"
                                    value={localData.jobTitle}
                                    onChange={(e) => handleChange('jobTitle', e.target.value)}
                                    placeholder="VD: Senior UI/UX Designer"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="target-location">Địa điểm làm việc</label>
                                <input
                                    id="target-location"
                                    type="text"
                                    value={localData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    placeholder="VD: Hà Nội, TP.HCM..."
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="target-salary">Mức lương mong muốn (USD/tháng)</label>
                                <input
                                    id="target-salary"
                                    type="text"
                                    value={localData.salary}
                                    onChange={(e) => handleChange('salary', e.target.value)}
                                    placeholder="VD: 1500 - 2000"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="target-workMode">Hình thức làm việc</label>
                                <input
                                    id="target-workMode"
                                    type="text"
                                    value={localData.workMode}
                                    onChange={(e) => handleChange('workMode', e.target.value)}
                                    placeholder="VD: Toàn thời gian, Hybrid, Remote"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="target-jobLevel">Cấp bậc mong muốn</label>
                                <input
                                    id="target-jobLevel"
                                    type="text"
                                    value={localData.jobLevel}
                                    onChange={(e) => handleChange('jobLevel', e.target.value)}
                                    placeholder="VD: Senior, Lead"
                                />
                            </div>
                        </div>
                        <div className="target-actions">
                            <button className="btn btn-primary" type="button" onClick={handleSave}>Lưu thông tin</button>
                            <button className="btn btn-secondary" type="button" onClick={handleCancel}>Hủy</button>
                        </div>
                    </>
                ) : (
                    <div className={`target-summary ${hasData ? '' : 'empty'}`}>
                        {hasData ? (
                            <ul>
                                {localData.jobTitle && (
                                    <li>
                                        <span className="label">Vị trí:</span>
                                        <span className="value">{localData.jobTitle}</span>
                                    </li>
                                )}
                                {localData.location && (
                                    <li>
                                        <span className="label">Địa điểm:</span>
                                        <span className="value">{localData.location}</span>
                                    </li>
                                )}
                                {localData.salary && (
                                    <li>
                                        <span className="label">Mức lương:</span>
                                        <span className="value">{localData.salary} USD</span>
                                    </li>
                                )}
                                {localData.workMode && (
                                    <li>
                                        <span className="label">Hình thức làm việc:</span>
                                        <span className="value">{localData.workMode}</span>
                                    </li>
                                )}
                                {localData.jobLevel && (
                                    <li>
                                        <span className="label">Cấp bậc:</span>
                                        <span className="value">{localData.jobLevel}</span>
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <p>Hãy bổ sung công việc mong muốn để nhà tuyển dụng dễ dàng gợi ý vị trí phù hợp.</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

function CompletionCard({ percentage, missingSections }) {
    const level = getCompletionLevel(percentage);

    return (
        <div className="sidebar-card completion-card">
            <h3>Hoàn chỉnh hồ sơ</h3>
            <div className="progress-wrapper">
                <div className="progress-info">
                    <span className="progress-percentage">{percentage}%</span>
                    <span className="progress-level">{level}</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-bar-inner" style={{ width: `${percentage}%` }} />
                </div>
            </div>
            {missingSections.length > 0 ? (
                <div className="missing-section-list">
                    <p>Điền vào những mục sau để tăng bậc hồ sơ:</p>
                    <ul>
                        {missingSections.slice(0, 5).map(section => (
                            <li key={section.key}>
                                <a href={`#${section.key}`}>{section.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="all-done">Hồ sơ của bạn đã hoàn chỉnh! Đừng quên cập nhật thường xuyên.</p>
            )}
        </div>
    );
}

function QuickTipsCard({ missingSections }) {
    return (
        <div className="sidebar-card tips-card">
            <h3>Gợi ý hoàn thiện</h3>
            <ul>
                {missingSections.length > 0 ? (
                    missingSections.map(section => (
                        <li key={section.key}>
                            <a href={`#${section.key}`}>Bổ sung {section.label.toLowerCase()}</a>
                        </li>
                    ))
                ) : (
                    <li>Hồ sơ đã đầy đủ. Bạn có thể cập nhật chứng chỉ hoặc hoạt động mới.</li>
                )}
            </ul>
        </div>
    );
}

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [saveMessage, setSaveMessage] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user');
            const user = raw ? JSON.parse(raw) : null;
            setCurrentUser(user);
            if (user) {
                setProfileData({
                    ...defaultProfileData,
                    ...user,
                    basicInfo: {
                        ...defaultProfileData.basicInfo,
                        ...(user.basicInfo || {}),
                        location: user.location || user.basicInfo?.location || user.contact?.city || '',
                        avatar: user.avatar || user.basicInfo?.avatar || ''
                    },
                    contact: {
                        ...defaultProfileData.contact,
                        ...(user.contact || {}),
                        email: user.email || user.contact?.email || '',
                        phoneCountryCode: user.contact?.phoneCountryCode || defaultProfileData.contact.phoneCountryCode,
                        phoneNumber: user.phoneNumber || user.phone || user.contact?.phoneNumber || '',
                        address: user.address || user.contact?.address || '',
                        city: user.city || user.contact?.city || user.location || '',
                        country: user.country || user.contact?.country || '',
                        nationality: user.nationality || user.contact?.nationality || '',
                        gender: user.gender || user.contact?.gender || '',
                        maritalStatus: user.maritalStatus || user.contact?.maritalStatus || '',
                        dateOfBirth: user.dateOfBirth || user.contact?.dateOfBirth || ''
                    },
                    skills: user.skills || [],
                    portfolio: user.portfolio || [],
                    targetJob: {
                        ...defaultProfileData.targetJob,
                        ...(user.targetJob || {})
                    }
                });
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin user:', error);
        }
    }, []);

    const handleSaveUserData = (updatedData) => {
        if (!currentUser) return false;

        try {
            const normalizedUpdates = { ...updatedData };

            if (updatedData.basicInfo) {
                normalizedUpdates.basicInfo = {
                    ...profileData.basicInfo,
                    ...updatedData.basicInfo
                };

                const { firstName, lastName, location, avatar } = normalizedUpdates.basicInfo;
                const displayName = `${lastName || ''} ${firstName || ''}`.trim();
                if (displayName) {
                    normalizedUpdates.name = displayName;
                }
                if (location !== undefined) {
                    normalizedUpdates.location = location;
                }
                if (avatar !== undefined) {
                    normalizedUpdates.avatar = avatar;
                }
            }

            if (updatedData.contact) {
                normalizedUpdates.contact = {
                    ...profileData.contact,
                    ...updatedData.contact
                };

                const { email, phoneNumber, phoneCountryCode, address, city, country } = normalizedUpdates.contact;
                if (email !== undefined) {
                    normalizedUpdates.email = email;
                }
                if (phoneNumber !== undefined) {
                    normalizedUpdates.phone = `${phoneCountryCode || ''} ${phoneNumber}`.trim();
                    normalizedUpdates.phoneNumber = phoneNumber;
                }
                if (address !== undefined) {
                    normalizedUpdates.address = address;
                }
                if (city !== undefined) {
                    normalizedUpdates.city = city;
                }
                if (country !== undefined) {
                    normalizedUpdates.country = country;
                }
            }

            if (updatedData.targetJob) {
                normalizedUpdates.targetJob = {
                    ...profileData.targetJob,
                    ...updatedData.targetJob
                };
            }

            const updatedUser = {
                ...currentUser,
                ...normalizedUpdates
            };

            if (normalizedUpdates.targetJob) {
                updatedUser.targetJob = normalizedUpdates.targetJob;
            }
            if (normalizedUpdates.basicInfo) {
                updatedUser.basicInfo = normalizedUpdates.basicInfo;
            }
            if (normalizedUpdates.contact) {
                updatedUser.contact = normalizedUpdates.contact;
            }

            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('user-changed'));

            setCurrentUser(updatedUser);
            setProfileData(prev => ({
                ...prev,
                ...normalizedUpdates,
                basicInfo: normalizedUpdates.basicInfo || prev.basicInfo,
                contact: normalizedUpdates.contact || prev.contact,
                targetJob: normalizedUpdates.targetJob || prev.targetJob
            }));

            setSaveMessage('Đã lưu thông tin thành công!');
            setTimeout(() => setSaveMessage(null), 3000);
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu thông tin user:', error);
            setSaveMessage('Có lỗi xảy ra khi lưu thông tin!');
            setTimeout(() => setSaveMessage(null), 3000);
            return false;
        }
    };

    const completionInfo = useMemo(() => {
        if (!currentUser) {
            return { percentage: 0, missingSections: completionRules };
        }

        const aggregatedData = {
            ...profileData,
            skills: profileData.skills || currentUser.skills || [],
            portfolio: profileData.portfolio || currentUser.portfolio || [],
            phone: currentUser.phone,
            email: currentUser.email
        };

        const completed = completionRules.filter(rule => rule.check(aggregatedData));
        const missingSections = completionRules.filter(rule => !rule.check(aggregatedData));
        const percentage = Math.round((completed.length / completionRules.length) * 100);

        return { percentage, missingSections };
    }, [profileData, currentUser]);

    if (!currentUser) {
        return (
            <div className="profile-container">
                <div className="profile-error">
                    <h2>Vui lòng đăng nhập để xem hồ sơ</h2>
                    <Link to="/login" className="btn">Đăng nhập</Link>
                </div>
            </div>
        );
    }

    const openModal = (section) => setActiveModal(section);
    const closeModal = () => setActiveModal(null);

    return (
        <div className="profile-container">
            <div className="container">
                <div className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Hồ sơ cá nhân</span>
                </div>

                {saveMessage && (
                    <div className={`save-message ${saveMessage.includes('thành công') ? 'success' : 'error'}`}>
                        {saveMessage}
                    </div>
                )}

                <ProfileHeader
                    basicInfo={profileData.basicInfo}
                    contact={profileData.contact}
                    onEdit={() => openModal('header')}
                />

                <div className="profile-body">
                    <aside className="profile-sidebar">
                        <CompletionCard
                            percentage={completionInfo.percentage}
                            missingSections={completionInfo.missingSections}
                        />
                        <QuickTipsCard missingSections={completionInfo.missingSections} />
                    </aside>

                    <div className="profile-main">
                        <ProfileObjectiveCard
                            value={profileData.objective}
                            onEdit={() => openModal('objective')}
                        />

                        <ProfileTargetJobCard
                            data={profileData.targetJob}
                            onEdit={() => openModal('targetJob')}
                        />

                        <ProfileContact
                            user={{ ...currentUser, ...profileData.contact }}
                            onEdit={() => openModal('contact')}
                        />

                        <ProfileSkills
                            user={currentUser}
                            onEdit={() => openModal('skills')}
                        />

                        <ProfilePortfolio
                            user={currentUser}
                            onEdit={() => openModal('portfolio')}
                        />

                        {sectionConfigs.map(section => (
                            <ProfileSectionCard
                                key={section.key}
                                sectionKey={section.key}
                                anchorId={section.key}
                                title={section.title}
                                description={section.description}
                                items={profileData[section.key] || []}
                                fields={section.fields}
                                isEditing={false}
                                addLabel={section.addLabel}
                                emptyMessage={section.emptyMessage}
                                onEdit={() => openModal(section.key)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {activeModal === 'header' && (
                <ProfileModal title="Thông tin cơ bản" onClose={closeModal}>
                    <ProfileHeaderForm
                        value={profileData.basicInfo}
                        contact={profileData.contact}
                        onSave={(data) => handleSaveUserData(data)}
                        onCancel={closeModal}
                    />
                </ProfileModal>
            )}

            {activeModal === 'objective' && (
                <ProfileModal title="Mục tiêu nghề nghiệp" onClose={closeModal}>
                    <ProfileObjectiveCard
                        value={profileData.objective}
                        isEditing
                        onSave={(value) => handleSaveUserData({ objective: value })}
                        onCancel={closeModal}
                    />
                </ProfileModal>
            )}

            {activeModal === 'targetJob' && (
                <ProfileModal title="Công việc mong muốn" onClose={closeModal}>
                    <ProfileTargetJobCard
                        data={profileData.targetJob}
                        isEditing
                        onSave={(data) => handleSaveUserData({ targetJob: data })}
                        onCancel={closeModal}
                    />
                </ProfileModal>
            )}

            {activeModal === 'contact' && (
                <ProfileModal title="Thông tin liên lạc" onClose={closeModal}>
                    <ProfileContact
                        user={{ ...currentUser, ...profileData.contact }}
                        isEditing
                        onSave={(data) => handleSaveUserData(data)}
                        onCancel={closeModal}
                    />
                </ProfileModal>
            )}

            {activeModal === 'skills' && (
                <ProfileModal title="Hồ sơ năng lực" onClose={closeModal}>
                    <ProfileSkills
                        user={currentUser}
                        isEditing
                        onSave={(data) => handleSaveUserData(data)}
                        onCancel={closeModal}
                    />
                </ProfileModal>
            )}

            {activeModal === 'portfolio' && (
                <ProfileModal title="Danh mục dự án" onClose={closeModal}>
                    <ProfilePortfolio
                        user={currentUser}
                        isEditing
                        onSave={(data) => handleSaveUserData(data)}
                        onCancel={closeModal}
                    />
                </ProfileModal>
            )}

            {sectionConfigs.map(section => (
                activeModal === section.key && (
                    <ProfileModal
                        key={`${section.key}-modal`}
                        title={section.title}
                        onClose={closeModal}
                        description={section.description}
                    >
                        <ProfileSectionCard
                            sectionKey={section.key}
                            title={section.title}
                            description={section.description}
                            items={profileData[section.key] || []}
                            fields={section.fields}
                            isEditing
                            addLabel={section.addLabel}
                            emptyMessage={section.emptyMessage}
                            onSave={(items) => handleSaveUserData({ [section.key]: items })}
                            onCancel={closeModal}
                        />
                    </ProfileModal>
                )
            ))}
        </div>
    );
}
