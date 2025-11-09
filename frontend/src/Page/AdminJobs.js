import React, { useState, useEffect } from 'react';
import AdminModal from '../components/AdminModal';
import AdminConfirmDialog from '../components/AdminConfirmDialog';
import AdminToast from '../components/AdminToast';
import AdminDropdown from '../components/AdminDropdown';
import '../styles/AdminJobs.scss';
import '../styles/components/AdminButtons.scss';

export default function AdminJobs() {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        priority: 'all',
        page: 1
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        const mockJobs = Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            title: `Việc làm ${i + 1}`,
            company: `Công ty ${i + 1}`,
            location: 'Hà Nội',
            salary: '15-20 triệu',
            status: i % 4 === 0 ? 'pending' : i % 4 === 1 ? 'approved' : i % 4 === 2 ? 'rejected' : 'active',
            priority: i % 3 === 0 ? 'high' : i % 3 === 1 ? 'medium' : 'normal',
            views: Math.floor(Math.random() * 10000),
            applications: Math.floor(Math.random() * 100),
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
            spamScore: Math.random() * 100
        }));
        setJobs(mockJobs);
    }, []);

    const showToast = (message, type = 'info') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'info' }), 3000);
    };

    const handleAction = async (jobId, action) => {
        setActionLoading({ [jobId]: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setActionLoading({ [jobId]: false });

        switch(action) {
            case 'view':
                const job = jobs.find(j => j.id === jobId);
                setSelectedJob(job);
                setIsModalOpen(true);
                break;
            case 'edit':
                showToast('Chức năng chỉnh sửa đang được phát triển', 'info');
                break;
            case 'approve':
                setJobs(jobs.map(j => 
                    j.id === jobId 
                        ? { ...j, status: 'approved' }
                        : j
                ));
                showToast('Đã duyệt tin tuyển dụng thành công', 'success');
                break;
            case 'reject':
                setJobs(jobs.map(j => 
                    j.id === jobId 
                        ? { ...j, status: 'rejected' }
                        : j
                ));
                showToast('Đã từ chối tin tuyển dụng', 'warning');
                break;
            case 'delete':
                setConfirmAction({ jobId, action });
                setIsConfirmOpen(true);
                break;
            default:
                break;
        }
    };

    const handleConfirmDelete = () => {
        if (confirmAction) {
            setJobs(jobs.filter(j => j.id !== confirmAction.jobId));
            showToast('Đã xóa tin tuyển dụng thành công', 'success');
            setConfirmAction(null);
        }
    };

    return (
        <div className="admin-jobs">
            <div className="admin-jobs__header">
                <h1>Quản lý tin tuyển dụng</h1>
                <div className="admin-jobs__actions">
                    <button 
                        className="btn btn-primary"
                        onClick={() => showToast('Chức năng tạo mới đang được phát triển', 'info')}
                    >
                        <i className="fas fa-plus"></i> Tạo tin mới
                    </button>
                    <button className="btn btn-secondary">
                        <i className="fas fa-download"></i> Xuất Excel
                    </button>
                </div>
            </div>

            <div className="admin-jobs__filters">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={filters.search}
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                        className="filter-input"
                    />
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                        className="filter-select"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="rejected">Từ chối</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="expired">Hết hạn</option>
                    </select>
                    <select
                        value={filters.priority}
                        onChange={(e) => setFilters({...filters, priority: e.target.value})}
                        className="filter-select"
                    >
                        <option value="all">Tất cả mức độ</option>
                        <option value="high">Ưu tiên cao</option>
                        <option value="medium">Ưu tiên trung bình</option>
                        <option value="normal">Bình thường</option>
                    </select>
                </div>
            </div>

            <div className="admin-jobs__stats">
                <div className="stat-item">
                    <span className="stat-label">Tổng tin:</span>
                    <span className="stat-value">{jobs.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Chờ duyệt:</span>
                    <span className="stat-value">{jobs.filter(j => j.status === 'pending').length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Đang hoạt động:</span>
                    <span className="stat-value">{jobs.filter(j => j.status === 'active').length}</span>
                </div>
            </div>

            <div className="admin-jobs__table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Công ty</th>
                            <th>Địa điểm</th>
                            <th>Lương</th>
                            <th>Trạng thái</th>
                            <th>Ưu tiên</th>
                            <th>Lượt xem</th>
                            <th>Ứng tuyển</th>
                            <th>Spam Score</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>{job.company}</td>
                                <td>{job.location}</td>
                                <td>{job.salary}</td>
                                <td>
                                    <span className={`badge badge-${job.status === 'approved' || job.status === 'active' ? 'success' : job.status === 'pending' ? 'warning' : 'danger'}`}>
                                        {job.status === 'pending' ? 'Chờ duyệt' : 
                                         job.status === 'approved' ? 'Đã duyệt' : 
                                         job.status === 'active' ? 'Đang hoạt động' : 
                                         job.status === 'rejected' ? 'Từ chối' : 'Hết hạn'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge badge-${job.priority === 'high' ? 'danger' : job.priority === 'medium' ? 'warning' : 'info'}`}>
                                        {job.priority === 'high' ? 'Cao' : job.priority === 'medium' ? 'Trung bình' : 'Bình thường'}
                                    </span>
                                </td>
                                <td>{job.views.toLocaleString('vi-VN')}</td>
                                <td>{job.applications}</td>
                                <td>
                                    <span className={job.spamScore > 70 ? 'spam-high' : job.spamScore > 40 ? 'spam-medium' : 'spam-low'}>
                                        {job.spamScore.toFixed(1)}%
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className={`btn-icon ${actionLoading[job.id] ? 'btn-loading' : ''}`}
                                            onClick={() => handleAction(job.id, 'view')}
                                            title="Xem chi tiết"
                                            disabled={actionLoading[job.id]}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <AdminDropdown
                                            trigger={
                                                <button className="btn-icon" title="Thêm thao tác">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </button>
                                            }
                                        >
                                            <button 
                                                className="admin-dropdown__item"
                                                onClick={() => handleAction(job.id, 'edit')}
                                            >
                                                <i className="fas fa-edit"></i>
                                                <span>Chỉnh sửa</span>
                                            </button>
                                            {job.status === 'pending' && (
                                                <>
                                                    <button 
                                                        className="admin-dropdown__item"
                                                        onClick={() => handleAction(job.id, 'approve')}
                                                    >
                                                        <i className="fas fa-check"></i>
                                                        <span>Duyệt tin</span>
                                                    </button>
                                                    <button 
                                                        className="admin-dropdown__item"
                                                        onClick={() => handleAction(job.id, 'reject')}
                                                    >
                                                        <i className="fas fa-times"></i>
                                                        <span>Từ chối</span>
                                                    </button>
                                                </>
                                            )}
                                            <div className="admin-dropdown__divider"></div>
                                            <button 
                                                className="admin-dropdown__item admin-dropdown__item--danger"
                                                onClick={() => handleAction(job.id, 'delete')}
                                            >
                                                <i className="fas fa-trash"></i>
                                                <span>Xóa</span>
                                            </button>
                                        </AdminDropdown>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-jobs__pagination">
                <button 
                    className="btn btn-secondary"
                    onClick={() => setFilters({...filters, page: Math.max(1, filters.page - 1)})}
                    disabled={filters.page === 1}
                >
                    <i className="fas fa-chevron-left"></i> Trước
                </button>
                <span>Trang {filters.page}</span>
                <button 
                    className="btn btn-secondary"
                    onClick={() => setFilters({...filters, page: filters.page + 1})}
                >
                    Sau <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* Modal xem chi tiết */}
            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Chi tiết ${selectedJob?.title || 'tin tuyển dụng'}`}
                size="large"
            >
                {selectedJob && (
                    <div className="job-detail">
                        <div className="job-detail__section">
                            <h3>Thông tin cơ bản</h3>
                            <div className="job-detail__grid">
                                <div className="job-detail__item">
                                    <label>ID:</label>
                                    <span>{selectedJob.id}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Tiêu đề:</label>
                                    <span>{selectedJob.title}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Công ty:</label>
                                    <span>{selectedJob.company}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Địa điểm:</label>
                                    <span>{selectedJob.location}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Lương:</label>
                                    <span>{selectedJob.salary}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Trạng thái:</label>
                                    <span className={`badge badge-${selectedJob.status === 'approved' || selectedJob.status === 'active' ? 'success' : selectedJob.status === 'pending' ? 'warning' : 'danger'}`}>
                                        {selectedJob.status === 'pending' ? 'Chờ duyệt' : 
                                         selectedJob.status === 'approved' ? 'Đã duyệt' : 
                                         selectedJob.status === 'active' ? 'Đang hoạt động' : 
                                         selectedJob.status === 'rejected' ? 'Từ chối' : 'Hết hạn'}
                                    </span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Lượt xem:</label>
                                    <span>{selectedJob.views.toLocaleString('vi-VN')}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Ứng tuyển:</label>
                                    <span>{selectedJob.applications}</span>
                                </div>
                                <div className="job-detail__item">
                                    <label>Spam Score:</label>
                                    <span className={selectedJob.spamScore > 70 ? 'spam-high' : selectedJob.spamScore > 40 ? 'spam-medium' : 'spam-low'}>
                                        {selectedJob.spamScore.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Confirm Dialog */}
            <AdminConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác."
                type="danger"
            />

            {/* Toast Notification */}
            <AdminToast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ isVisible: false, message: '', type: 'info' })}
            />
        </div>
    );
}
