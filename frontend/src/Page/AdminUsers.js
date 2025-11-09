import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminModal from '../components/AdminModal';
import AdminConfirmDialog from '../components/AdminConfirmDialog';
import AdminToast from '../components/AdminToast';
import AdminDropdown from '../components/AdminDropdown';
import '../styles/AdminUsers.scss';
import '../styles/components/AdminButtons.scss';

export default function AdminUsers() {
    const location = useLocation();
    const type = location.pathname.split('/').pop(); // Get last segment of path
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        page: 1,
        limit: 20
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    useEffect(() => {
        // Simulate data loading
        const mockUsers = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'banned' : 'pending',
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
            searches: Math.floor(Math.random() * 1000),
            applications: Math.floor(Math.random() * 50)
        }));
        setUsers(mockUsers);
    }, [type]);

    const showToast = (message, type = 'info') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'info' }), 3000);
    };

    const handleAction = async (userId, action) => {
        setActionLoading({ [userId]: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setActionLoading({ [userId]: false });

        switch(action) {
            case 'view':
                const user = users.find(u => u.id === userId);
                setSelectedUser(user);
                setIsModalOpen(true);
                break;
            case 'edit':
                showToast('Chức năng chỉnh sửa đang được phát triển', 'info');
                break;
            case 'ban':
            case 'unban':
                setUsers(users.map(u => 
                    u.id === userId 
                        ? { ...u, status: action === 'ban' ? 'banned' : 'active' }
                        : u
                ));
                showToast(`Đã ${action === 'ban' ? 'khóa' : 'mở khóa'} tài khoản thành công`, 'success');
                break;
            case 'delete':
                setConfirmAction({ userId, action });
                setIsConfirmOpen(true);
                break;
            case 'reset':
                showToast('Đã gửi email reset mật khẩu', 'success');
                break;
            default:
                break;
        }
    };

    const handleConfirmDelete = () => {
        if (confirmAction) {
            setUsers(users.filter(u => u.id !== confirmAction.userId));
            showToast('Đã xóa tài khoản thành công', 'success');
            setConfirmAction(null);
        }
    };

    const getTypeTitle = () => {
        switch(type) {
            case 'candidates': return 'Ứng viên';
            case 'employers': return 'Nhà tuyển dụng';
            case 'admins': return 'Quản trị viên';
            default: return 'Người dùng';
        }
    };

    return (
        <div className="admin-users">
            <div className="admin-users__header">
                <h1>Quản trị {getTypeTitle()}</h1>
                <div className="admin-users__actions">
                    <button 
                        className="btn btn-primary"
                        onClick={() => showToast('Chức năng tạo mới đang được phát triển', 'info')}
                    >
                        <i className="fas fa-plus"></i> Tạo mới
                    </button>
                    <button className="btn btn-secondary">
                        <i className="fas fa-download"></i> Xuất Excel
                    </button>
                </div>
            </div>

            <div className="admin-users__filters">
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
                        <option value="active">Đang hoạt động</option>
                        <option value="banned">Đã khóa</option>
                        <option value="pending">Chờ duyệt</option>
                    </select>
                </div>
            </div>

            <div className="admin-users__table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Đăng nhập cuối</th>
                            {type === 'candidates' && (
                                <>
                                    <th>Lượt tìm kiếm</th>
                                    <th>Lượt ứng tuyển</th>
                                </>
                            )}
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge badge-${user.status === 'active' ? 'success' : user.status === 'banned' ? 'danger' : 'warning'}`}>
                                        {user.status === 'active' ? 'Hoạt động' : user.status === 'banned' ? 'Đã khóa' : 'Chờ duyệt'}
                                    </span>
                                </td>
                                <td>{user.createdAt}</td>
                                <td>{user.lastLogin}</td>
                                {type === 'candidates' && (
                                    <>
                                        <td>{user.searches}</td>
                                        <td>{user.applications}</td>
                                    </>
                                )}
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className={`btn-icon ${actionLoading[user.id] ? 'btn-loading' : ''}`}
                                            onClick={() => handleAction(user.id, 'view')}
                                            title="Xem chi tiết"
                                            disabled={actionLoading[user.id]}
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
                                                onClick={() => handleAction(user.id, 'edit')}
                                            >
                                                <i className="fas fa-edit"></i>
                                                <span>Chỉnh sửa</span>
                                            </button>
                                            <button 
                                                className="admin-dropdown__item"
                                                onClick={() => handleAction(user.id, 'reset')}
                                            >
                                                <i className="fas fa-key"></i>
                                                <span>Reset mật khẩu</span>
                                            </button>
                                            <div className="admin-dropdown__divider"></div>
                                            <button 
                                                className="admin-dropdown__item"
                                                onClick={() => handleAction(user.id, user.status === 'active' ? 'ban' : 'unban')}
                                            >
                                                <i className={`fas fa-${user.status === 'active' ? 'lock' : 'unlock'}`}></i>
                                                <span>{user.status === 'active' ? 'Khóa' : 'Mở khóa'}</span>
                                            </button>
                                            <button 
                                                className="admin-dropdown__item admin-dropdown__item--danger"
                                                onClick={() => handleAction(user.id, 'delete')}
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

            <div className="admin-users__pagination">
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
                title={`Chi tiết ${selectedUser?.name || 'người dùng'}`}
                size="large"
            >
                {selectedUser && (
                    <div className="user-detail">
                        <div className="user-detail__section">
                            <h3>Thông tin cơ bản</h3>
                            <div className="user-detail__grid">
                                <div className="user-detail__item">
                                    <label>ID:</label>
                                    <span>{selectedUser.id}</span>
                                </div>
                                <div className="user-detail__item">
                                    <label>Tên:</label>
                                    <span>{selectedUser.name}</span>
                                </div>
                                <div className="user-detail__item">
                                    <label>Email:</label>
                                    <span>{selectedUser.email}</span>
                                </div>
                                <div className="user-detail__item">
                                    <label>Trạng thái:</label>
                                    <span className={`badge badge-${selectedUser.status === 'active' ? 'success' : selectedUser.status === 'banned' ? 'danger' : 'warning'}`}>
                                        {selectedUser.status === 'active' ? 'Hoạt động' : selectedUser.status === 'banned' ? 'Đã khóa' : 'Chờ duyệt'}
                                    </span>
                                </div>
                                <div className="user-detail__item">
                                    <label>Ngày tạo:</label>
                                    <span>{selectedUser.createdAt}</span>
                                </div>
                                <div className="user-detail__item">
                                    <label>Đăng nhập cuối:</label>
                                    <span>{selectedUser.lastLogin}</span>
                                </div>
                            </div>
                        </div>
                        {type === 'candidates' && (
                            <div className="user-detail__section">
                                <h3>Hoạt động</h3>
                                <div className="user-detail__grid">
                                    <div className="user-detail__item">
                                        <label>Lượt tìm kiếm:</label>
                                        <span>{selectedUser.searches}</span>
                                    </div>
                                    <div className="user-detail__item">
                                        <label>Lượt ứng tuyển:</label>
                                        <span>{selectedUser.applications}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </AdminModal>

            {/* Confirm Dialog */}
            <AdminConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác."
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
