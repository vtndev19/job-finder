import React, { useState } from 'react';
import '../styles/components/ProfileCV.scss';

export default function ProfileCV({ user, onSave }) {
    const [cvList, setCvList] = useState(user?.cvList || []);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Kiểm tra loại file
        if (!file.type.includes('pdf') && !file.type.includes('word')) {
            alert('Chỉ chấp nhận file PDF hoặc Word');
            return;
        }

        // Giả lập upload progress
        for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(i);
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Thêm CV mới vào danh sách
        const newCV = {
            id: Date.now(),
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString(),
            status: 'active'
        };

        const updatedCVList = [...cvList, newCV];
        setCvList(updatedCVList);
        onSave({ cvList: updatedCVList });
        setUploadProgress(0);
    };

    const handleDelete = (cvId) => {
        const updatedCVList = cvList.filter(cv => cv.id !== cvId);
        setCvList(updatedCVList);
        onSave({ cvList: updatedCVList });
    };

    const handleSetDefault = (cvId) => {
        const updatedCVList = cvList.map(cv => ({
            ...cv,
            isDefault: cv.id === cvId
        }));
        setCvList(updatedCVList);
        onSave({ cvList: updatedCVList });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="profile-cv">
            <div className="cv-header">
                <h2>Quản lý CV</h2>
                <div className="cv-upload">
                    <label className="upload-button" htmlFor="cv-upload">
                        <i className="fas fa-upload"></i>
                        Tải CV lên
                    </label>
                    <input
                        type="file"
                        id="cv-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="upload-progress">
                            <div 
                                className="progress-bar"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                            <span>{uploadProgress}%</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="cv-list">
                {cvList.length === 0 ? (
                    <div className="no-cv">
                        <i className="fas fa-file-alt"></i>
                        <p>Bạn chưa tải lên CV nào</p>
                        <span>Hãy tải lên CV để bắt đầu ứng tuyển</span>
                    </div>
                ) : (
                    cvList.map((cv) => (
                        <div key={cv.id} className={`cv-item ${cv.isDefault ? 'default' : ''}`}>
                            <div className="cv-icon">
                                <i className={`fas fa-file-${cv.type.includes('pdf') ? 'pdf' : 'word'}`}></i>
                            </div>
                            <div className="cv-info">
                                <h3>{cv.name}</h3>
                                <p className="cv-meta">
                                    {formatFileSize(cv.size)} • Tải lên {formatDate(cv.uploadDate)}
                                </p>
                            </div>
                            <div className="cv-actions">
                                {!cv.isDefault && (
                                    <button 
                                        className="btn-set-default"
                                        onClick={() => handleSetDefault(cv.id)}
                                    >
                                        Đặt làm mặc định
                                    </button>
                                )}
                                <button 
                                    className="btn-preview"
                                    onClick={() => window.open(`#preview-${cv.id}`, '_blank')}
                                >
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                    className="btn-download"
                                    onClick={() => window.open(`#download-${cv.id}`, '_blank')}
                                >
                                    <i className="fas fa-download"></i>
                                </button>
                                <button 
                                    className="btn-delete"
                                    onClick={() => handleDelete(cv.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cv-tips">
                <h3>Lưu ý khi tải CV:</h3>
                <ul>
                    <li>Chấp nhận file định dạng PDF hoặc Word (doc, docx)</li>
                    <li>Kích thước file tối đa 5MB</li>
                    <li>CV nên có độ dài 1-2 trang</li>
                    <li>Đặt tên file dễ nhớ và chuyên nghiệp</li>
                </ul>
            </div>
        </div>
    );
}