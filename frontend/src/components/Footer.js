import React from "react";
import { Link } from "react-router-dom";
import '../styles/components/Footer.scss';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <h2>Giữ liên lạc với chúng tôi</h2>
                    <p>Nhận thông tin cập nhật mới nhất về việc làm, mẹo nghề nghiệp và tin tức ngành.</p>
                    <div className="subscribe-form">
                        <input type="email" placeholder="Nhập email của bạn" />
                        <button>Đăng ký</button>
                    </div>
                </div>

                <div className="footer-main">
                    <div className="footer-col about">
                        <h3>JobFinder</h3>
                        <p>Nền tảng tìm kiếm việc làm hàng đầu Việt Nam, kết nối ứng viên tài năng với các nhà tuyển dụng uy tín.</p>
                        <div className="social-links">
                            <a href="/#" aria-label="Facebook">FB</a>
                            <a href="/#" aria-label="LinkedIn">IN</a>
                            <a href="/#" aria-label="Twitter">TW</a>
                        </div>
                    </div>

                    <div className="footer-col links">
                        <h4>Dành cho ứng viên</h4>
                        <ul>
                            <li><Link to="/jobs">Tìm việc làm</Link></li>
                            <li><Link to="/profile">Tạo hồ sơ</Link></li>
                            <li><Link to="/blog">Blog - Kiến thức nghề nghiệp</Link></li>
                            <li><Link to="/career-advice">Tư vấn nghề nghiệp</Link></li>
                            <li><Link to="/salary-guide">Bảng lương</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col links">
                        <h4>Dành cho nhà tuyển dụng</h4>
                        <ul>
                            <li><Link to="/employer">Đăng tin tuyển dụng</Link></li>
                            <li><Link to="/employer/search">Tìm ứng viên</Link></li>
                            <li><Link to="/employer/pricing">Bảng giá</Link></li>
                            <li><Link to="/employer/support">Hỗ trợ</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col contact">
                        <h4>Liên hệ</h4>
                        <ul>
                            <li><span role="img" aria-label="email">📧</span> contact@jobfinder.vn</li>
                            <li><span role="img" aria-label="phone">📞</span> </li>
                            <li><span role="img" aria-label="address">📍</span> </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} JobFinder. Tất cả quyền được bảo lưu.</p>
                    <div className="footer-legal-links">
                        <Link to="/privacy">Chính sách bảo mật</Link>
                        <Link to="/terms">Điều khoản sử dụng</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
