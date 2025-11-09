import React from 'react';
import '../styles/components/ProfileHeader.scss';

export default function ProfileHeader({ basicInfo = {}, contact = {}, onEdit }) {
    const {
        firstName = '',
        lastName = '',
        jobTitle = '',
        currentLevel = '',
        currentIndustry = '',
        currentFunction = '',
        yearsExperience = '',
        highestDegree = '',
        location = '',
        avatar = ''
    } = basicInfo;

    const email = contact.email || '';
    const phone = contact.phone || (contact.phoneCountryCode && contact.phoneNumber ? `${contact.phoneCountryCode} ${contact.phoneNumber}` : contact.phoneNumber || '');
    const address = contact.address || contact.city || location || '';

    const fullName = `${lastName || ''} ${firstName || ''}`.trim() || basicInfo.displayName || contact.name || 'Chưa cập nhật';
    const subtitleParts = [jobTitle || '', yearsExperience ? `${yearsExperience} năm kinh nghiệm` : ''].filter(Boolean);
    const subtitle = subtitleParts.join(' - ');

    const nationality = contact.nationality || '';
    const dob = contact.dateOfBirth ? new Date(contact.dateOfBirth).toLocaleDateString('vi-VN') : '';

    const infoItems = [
        { icon: 'fas fa-briefcase', label: currentLevel },
        { icon: 'fas fa-envelope', label: email },
        { icon: 'fas fa-phone', label: phone },
        { icon: 'fas fa-home', label: address },
        { icon: 'fas fa-graduation-cap', label: highestDegree },
        { icon: 'fas fa-flag', label: nationality },
        { icon: 'fas fa-birthday-cake', label: dob }
    ].filter(item => item.label);

    const avatarSrc = avatar || '/default-avatar.png';

    return (
        <section className="profile-header" id="basicInfo">
            <div className="profile-header__avatar">
                <img src={avatarSrc} alt={fullName} />
            </div>
            <div className="profile-header__body">
                <div className="profile-header__top">
                    <div>
                        <h1>{fullName}</h1>
                        {subtitle && <p className="profile-header__subtitle">{subtitle}</p>}
                    </div>
                    {onEdit && (
                        <button className="section-edit-btn" type="button" onClick={onEdit}>
                            <i className="fas fa-pen"></i> Chỉnh sửa
                        </button>
                    )}
                </div>

                {infoItems.length > 0 && (
                    <ul className="profile-header__info">
                        {infoItems.map((item, idx) => (
                            <li key={`${item.icon}-${idx}`}>
                                <i className={item.icon} aria-hidden="true"></i>
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {(currentIndustry || currentFunction) && (
                    <div className="profile-header__tags">
                        {currentIndustry && <span className="tag">{currentIndustry}</span>}
                        {currentFunction && currentFunction !== currentIndustry && (
                            <span className="tag">{currentFunction}</span>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
