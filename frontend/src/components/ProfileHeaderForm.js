import React, { useEffect, useMemo, useState } from 'react';
import '../styles/components/ProfileHeaderForm.scss';

const levelOptions = ['Thực tập sinh', 'Nhân viên', 'Chuyên viên', 'Trưởng nhóm', 'Quản lý', 'Giám đốc'];
const industryOptions = ['Công nghệ thông tin', 'Marketing', 'Tài chính - Ngân hàng', 'Kế toán - Kiểm toán', 'Dịch vụ khách hàng', 'Sản xuất', 'Bán lẻ', 'Khác'];
const functionOptions = ['Kinh doanh/Bán hàng', 'Thiết kế', 'Nhân sự', 'Kỹ thuật', 'Dịch vụ khách hàng', 'Vận hành', 'Khác'];
const degreeOptions = ['Trung cấp', 'Cao đẳng', 'Đại học', 'Thạc sĩ', 'Tiến sĩ', 'Khác'];
const nationalityOptions = ['Người Việt Nam', 'Hoa Kỳ', 'Anh', 'Nhật Bản', 'Singapore', 'Khác'];
const genderOptions = ['Nam', 'Nữ', 'Khác'];
const maritalOptions = ['Độc thân', 'Đã kết hôn', 'Khác'];
const countryOptions = ['Việt Nam', 'Hoa Kỳ', 'Singapore', 'Nhật Bản', 'Khác'];
const phoneCountryOptions = ['+84', '+1', '+81', '+65'];

const defaultForm = {
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
    avatar: '',
    email: '',
    phoneCountryCode: '+84',
    phoneNumber: '',
    nationality: '',
    country: '',
    city: '',
    address: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: ''
};

export default function ProfileHeaderForm({ value = {}, contact = {}, onSave, onCancel }) {
    const initialForm = useMemo(() => ({
        ...defaultForm,
        ...value,
        email: contact.email || value.email || '',
        phoneCountryCode: contact.phoneCountryCode || defaultForm.phoneCountryCode,
        phoneNumber: contact.phoneNumber || contact.phone || value.phoneNumber || '',
        nationality: contact.nationality || value.nationality || '',
        country: contact.country || '',
        city: contact.city || value.city || '',
        address: contact.address || value.address || '',
        gender: contact.gender || '',
        maritalStatus: contact.maritalStatus || '',
        dateOfBirth: contact.dateOfBirth || '',
        location: value.location || contact.city || ''
    }), [value, contact]);

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        setFormData(initialForm);
    }, [initialForm]);

    const handleChange = (field, val) => {
        setFormData(prev => ({ ...prev, [field]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            email,
            phoneCountryCode,
            phoneNumber,
            nationality,
            country,
            city,
            address,
            gender,
            maritalStatus,
            dateOfBirth,
            ...basicFields
        } = formData;

        const basicPayload = {
            ...basicFields,
            location: basicFields.location || [city, country].filter(Boolean).join(', ')
        };

        const contactPayload = {
            email,
            phoneCountryCode,
            phoneNumber,
            nationality,
            country,
            city,
            address,
            gender,
            maritalStatus,
            dateOfBirth
        };

        const success = onSave?.({ basicInfo: basicPayload, contact: contactPayload });
        if (success) {
            onCancel?.();
        }
    };

    const handleCancel = () => {
        setFormData(initialForm);
        onCancel?.();
    };

    return (
        <form className="profile-header-form" onSubmit={handleSubmit}>
            <div className="profile-header-form__grid">
                <div className="profile-header-form__avatar">
                    <div className="avatar-preview">
                        <img src={formData.avatar || '/default-avatar.png'} alt="Avatar preview" />
                        <label className="avatar-upload">
                            <input
                                type="url"
                                value={formData.avatar}
                                onChange={(e) => handleChange('avatar', e.target.value)}
                                placeholder="URL ảnh đại diện"
                            />
                            <span><i className="fas fa-pen"></i></span>
                        </label>
                    </div>
                </div>

                <div className="profile-header-form__fields">
                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Họ</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="VD: Phạm"
                                required
                            />
                        </div>
                        <div className="form-group required">
                            <label>Tên</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                placeholder="VD: Tú"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group required">
                        <label>Chức danh</label>
                        <input
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                            placeholder="SECURITIES INVESTMENT ADVISORY INTERN"
                            required
                        />
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Cấp bậc hiện tại</label>
                            <select
                                value={formData.currentLevel}
                                onChange={(e) => handleChange('currentLevel', e.target.value)}
                                required
                            >
                                <option value="">Chọn cấp bậc</option>
                                {levelOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group required">
                            <label>Ngành nghề hiện tại</label>
                            <select
                                value={formData.currentIndustry}
                                onChange={(e) => handleChange('currentIndustry', e.target.value)}
                                required
                            >
                                <option value="">Chọn ngành nghề</option>
                                {industryOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Lĩnh vực hiện tại</label>
                            <select
                                value={formData.currentFunction}
                                onChange={(e) => handleChange('currentFunction', e.target.value)}
                                required
                            >
                                <option value="">Chọn lĩnh vực</option>
                                {functionOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Số năm kinh nghiệm</label>
                            <div className="input-inline">
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.yearsExperience}
                                    onChange={(e) => handleChange('yearsExperience', e.target.value)}
                                    placeholder="VD: 2"
                                />
                                <span>Năm</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group">
                            <label>Mức lương hiện tại</label>
                            <div className="input-inline">
                                <input
                                    type="text"
                                    value={formData.currentSalary}
                                    onChange={(e) => handleChange('currentSalary', e.target.value)}
                                    placeholder="VD: 1500"
                                />
                                <span>USD/tháng</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Bằng cấp cao nhất</label>
                            <select
                                value={formData.highestDegree}
                                onChange={(e) => handleChange('highestDegree', e.target.value)}
                            >
                                <option value="">Chọn trình độ</option>
                                {degreeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="tupham@example.com"
                                required
                            />
                        </div>
                        <div className="form-group required">
                            <label>Điện thoại</label>
                            <div className="phone-input">
                                <select
                                    value={formData.phoneCountryCode}
                                    onChange={(e) => handleChange('phoneCountryCode', e.target.value)}
                                >
                                    {phoneCountryOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                    placeholder="964908204"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Quốc tịch</label>
                            <select
                                value={formData.nationality}
                                onChange={(e) => handleChange('nationality', e.target.value)}
                                required
                            >
                                <option value="">Chọn quốc tịch</option>
                                {nationalityOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group required">
                            <label>Ngày sinh</label>
                            <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Quốc gia/ Tỉnh thành/ Quận huyện</label>
                            <select
                                value={formData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                required
                            >
                                <option value="">Chọn quốc gia</option>
                                {countryOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group required">
                            <label>Thành phố</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                placeholder="VD: Hà Nội"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="Số nhà, đường, phường"
                        />
                    </div>

                    <div className="form-row two-column">
                        <div className="form-group required">
                            <label>Giới tính</label>
                            <div className="option-group">
                                {genderOptions.map(option => (
                                    <button
                                        type="button"
                                        key={option}
                                        className={formData.gender === option ? 'active' : ''}
                                        onClick={() => handleChange('gender', option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group required">
                            <label>Tình trạng hôn nhân</label>
                            <div className="option-group">
                                {maritalOptions.map(option => (
                                    <button
                                        type="button"
                                        key={option}
                                        className={formData.maritalStatus === option ? 'active' : ''}
                                        onClick={() => handleChange('maritalStatus', option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="form-note">* Thông tin bắt buộc</p>
                </div>
            </div>

            <div className="profile-header-form__actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                    Lưu
                </button>
            </div>
        </form>
    );
}
