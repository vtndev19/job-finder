import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CVInteriorDesign.scss';

export default function CVInteriorDesign() {
    return (
        <div className="cv-interior-design-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/blog">Blog</Link>
                    <span>/</span>
                    <span>CV thiết kế nội thất</span>
                </div>

                <div className="article-layout">
                    {/* Main Content */}
                    <article className="article-main">
                        {/* Article Header */}
                        <header className="article-header">
                            <div className="article-category">
                                <span>Hành trang yêu nghề</span>
                                <span>Phát triển kỹ năng</span>
                            </div>
                            <h1 className="article-title">
                                Cách viết CV thiết kế nội thất ấn tượng, chinh phục nhà tuyển dụng
                            </h1>
                            <div className="article-meta">
                                <span className="article-date">14/10/2025 04:10 PM</span>
                                <span className="article-views">Lượt Xem 223</span>
                            </div>
                            <div className="article-actions">
                                <button className="btn-share">Chia sẻ</button>
                                <button className="btn-copy">Copylink</button>
                            </div>
                        </header>

                        {/* Article Image */}
                        <div className="article-image">
                            <img 
                                src="https://via.placeholder.com/800x400?text=CV+Thiet+Ke+Noi+That" 
                                alt="CV thiết kế nội thất" 
                            />
                            <p className="image-caption">
                                CV thiết kế nội thất thể hiện gu thẩm mỹ, kỹ thuật và tư duy không gian chuyên nghiệp
                            </p>
                        </div>

                        {/* Article Content */}
                        <div className="article-content">
                            <p className="article-intro">
                                Thiết kế nội thất là lĩnh vực đòi hỏi sự sáng tạo và đam mê. Trong thị trường cạnh tranh, 
                                một <strong>CV thiết kế nội thất</strong> hoàn hảo chính là chìa khóa để chinh phục nhà tuyển dụng. 
                                Bài viết này sẽ hướng dẫn chi tiết cách tạo ra một bản CV thiết kế nội thất thể hiện được năng lực 
                                và gây ấn tượng đối với nhà tuyển dụng, đồng thời làm nổi bật cả hai yếu tố "cần" và "đủ".
                            </p>

                            {/* Table of Contents */}
                            <div className="table-of-contents">
                                <h3>Nội Dung Bài Viết</h3>
                                <ul>
                                    <li>
                                        <a href="#section-1">Đặc thù ngành thiết kế và yêu cầu của nhà tuyển dụng</a>
                                        <ul>
                                            <li><a href="#section-1-1">CV thiết kế nội thất phải thể hiện con mắt nghệ thuật</a></li>
                                            <li><a href="#section-1-2">Tiêu chuẩn tuyển dụng cơ bản cho vị trí thiết kế nội thất</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#section-2">Hướng dẫn viết từng phần trong CV thiết kế nội thất chuyên nghiệp</a>
                                        <ul>
                                            <li><a href="#section-2-1">Thông tin cá nhân và link portfolio (Không thể thiếu)</a></li>
                                            <li><a href="#section-2-2">Mục tiêu nghề nghiệp</a></li>
                                            <li><a href="#section-2-3">Kinh nghiệm làm việc</a></li>
                                            <li><a href="#section-2-4">Kỹ năng và phần mềm thiết kế (Hard Skills)</a></li>
                                            <li><a href="#section-2-5">Học vấn và chứng chỉ</a></li>
                                            <li><a href="#section-2-6">Portfolio: Tài sản quan trọng nhất của Interior Designer</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#section-3">Những Lỗi Cần Tránh khi Viết CV Thiết Kế Nội Thất</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 1 */}
                            <section id="section-1" className="article-section">
                                <h2>Đặc thù ngành thiết kế và yêu cầu của nhà tuyển dụng</h2>
                                <p>
                                    Thiết kế nội thất là ngành kết hợp giữa sự sáng tạo và kiến thức kỹ thuật để xây dựng nên 
                                    những không gian nội thất đáp ứng được yêu cầu về mặt thẩm mỹ, nhằm nâng cao chất lượng cuộc sống. 
                                    Nhà tuyển dụng luôn tìm kiếm các ứng viên tài năng, có sự tinh tế, độc đáo và năng lực thiết kế 
                                    để gia tăng sức cạnh tranh, tạo nên sự đa dạng và khác biệt cho công ty.
                                </p>

                                <h3 id="section-1-1">CV thiết kế nội thất phải thể hiện con mắt nghệ thuật</h3>
                                <p>
                                    Khác với các công việc cần dùng số liệu, CV thiết kế nội thất cần thể hiện gu thẩm mỹ, 
                                    tư duy sáng tạo và phong cách thiết kế riêng của ứng viên ngay từ cái nhìn đầu tiên.
                                </p>
                                <ul>
                                    <li>
                                        <strong>Sáng tạo và Khoa học:</strong> Thiết kế nội thất là ngành sáng tạo khoa học. 
                                        "Sáng tạo" ở đây là tạo ra cái mới, cái đẹp, cái riêng, trong khi "Khoa học" là sự bố trí, 
                                        sắp xếp đồ đạc nội thất sao cho vừa thuận tiện khi sử dụng vừa không chiếm quá nhiều không gian.
                                    </li>
                                    <li>
                                        <strong>Hình thức trình bày:</strong> Hình thức của CV thiết kế nội thất phải đẹp, 
                                        ấn tượng cả về bố cục và màu sắc. Ứng viên nên tự thiết kế CV nếu có thời gian và tự tin 
                                        với khả năng của mình, hoặc sử dụng các mẫu CV online được tạo chuyên nghiệp.
                                    </li>
                                    <li>
                                        <strong>Bố cục đặc biệt:</strong> CV thiết kế nội thất có thể hơi phá cách, có hơi hướng 
                                        nghệ thuật nhưng không nên quá đà. Bố cục cần sạch sẽ, dễ hiểu, không chồng chéo thông tin. 
                                        Phong cách tối giản (Minimalism) hoặc 3D thú vị là những ý tưởng được khuyến khích.
                                    </li>
                                </ul>

                                <h3 id="section-1-2">Tiêu chuẩn tuyển dụng cơ bản cho vị trí thiết kế nội thất</h3>
                                <p>
                                    Mặc dù tiêu chuẩn tuyển dụng có thể thay đổi tùy thuộc vào phong cách của từng studio, 
                                    nhưng nhìn chung, các nhà tuyển dụng thường tìm kiếm ứng viên có:
                                </p>
                                <ul>
                                    <li>Kiến thức về nguyên tắc thiết kế nội thất và kiến trúc</li>
                                    <li>Kỹ năng sử dụng phần mềm thiết kế (AutoCAD, SketchUp, 3ds Max, Revit, etc.)</li>
                                    <li>Khả năng tư duy không gian và trực quan hóa</li>
                                    <li>Kỹ năng giao tiếp và làm việc nhóm</li>
                                    <li>Portfolio thể hiện các dự án đã hoàn thành</li>
                                </ul>
                            </section>

                            {/* Section 2 */}
                            <section id="section-2" className="article-section">
                                <h2>Hướng dẫn viết từng phần trong CV thiết kế nội thất chuyên nghiệp</h2>

                                <h3 id="section-2-1">Thông tin cá nhân và link portfolio (Không thể thiếu)</h3>
                                <p>
                                    Phần thông tin cá nhân trong CV thiết kế nội thất cần bao gồm:
                                </p>
                                <ul>
                                    <li>Họ và tên đầy đủ</li>
                                    <li>Số điện thoại và email liên hệ</li>
                                    <li>Địa chỉ (tùy chọn, có thể chỉ ghi thành phố)</li>
                                    <li><strong>Link portfolio online</strong> - Đây là phần quan trọng nhất!</li>
                                    <li>Link LinkedIn, Behance hoặc các mạng xã hội chuyên nghiệp khác</li>
                                </ul>

                                <h3 id="section-2-2">Mục tiêu nghề nghiệp</h3>
                                <p>
                                    Phần mục tiêu nghề nghiệp nên ngắn gọn, súc tích (2-3 câu) và thể hiện được:
                                </p>
                                <ul>
                                    <li>Đam mê với thiết kế nội thất</li>
                                    <li>Định hướng nghề nghiệp rõ ràng</li>
                                    <li>Giá trị bạn có thể mang lại cho công ty</li>
                                </ul>

                                <h3 id="section-2-3">Kinh nghiệm làm việc</h3>
                                <h4>Đối với ứng viên có kinh nghiệm</h4>
                                <p>
                                    Liệt kê các vị trí đã từng làm theo thứ tự thời gian (mới nhất trước). 
                                    Mỗi vị trí cần bao gồm:
                                </p>
                                <ul>
                                    <li>Tên công ty và vị trí làm việc</li>
                                    <li>Thời gian làm việc (tháng/năm - tháng/năm)</li>
                                    <li>Mô tả các dự án đã thực hiện</li>
                                    <li>Kết quả đạt được (số lượng dự án, phản hồi tích cực từ khách hàng, etc.)</li>
                                </ul>

                                <h4>Đối với ứng viên chưa có kinh nghiệm</h4>
                                <p>
                                    Nếu bạn là sinh viên mới ra trường hoặc đang tìm cơ hội đầu tiên:
                                </p>
                                <ul>
                                    <li>Nhấn mạnh vào các dự án học tập và đồ án tốt nghiệp</li>
                                    <li>Mô tả các khóa học, workshop đã tham gia</li>
                                    <li>Liệt kê các cuộc thi thiết kế (nếu có)</li>
                                    <li>Nhấn mạnh vào kỹ năng phần mềm và portfolio</li>
                                </ul>

                                <h3 id="section-2-4">Kỹ năng và phần mềm thiết kế (Hard Skills)</h3>
                                <p>
                                    Đây là phần quan trọng để nhà tuyển dụng đánh giá năng lực kỹ thuật của bạn:
                                </p>
                                <ul>
                                    <li><strong>Phần mềm 2D:</strong> AutoCAD, Adobe Illustrator, Adobe Photoshop</li>
                                    <li><strong>Phần mềm 3D:</strong> SketchUp, 3ds Max, Revit, Lumion</li>
                                    <li><strong>Phần mềm render:</strong> V-Ray, Corona Renderer, Enscape</li>
                                    <li><strong>Kỹ năng khác:</strong> Quản lý dự án, giao tiếp với khách hàng, làm việc nhóm</li>
                                </ul>

                                <h3 id="section-2-5">Học vấn và chứng chỉ</h3>
                                <p>
                                    Liệt kê trình độ học vấn và các chứng chỉ liên quan:
                                </p>
                                <ul>
                                    <li>Bằng cấp (Cử nhân/Kỹ sư Thiết kế Nội thất, Kiến trúc, etc.)</li>
                                    <li>Tên trường và năm tốt nghiệp</li>
                                    <li>Các chứng chỉ chuyên môn (nếu có)</li>
                                    <li>Khóa học bổ sung liên quan đến thiết kế</li>
                                </ul>

                                <h3 id="section-2-6">Portfolio: Tài sản quan trọng nhất của Interior Designer</h3>
                                <p>
                                    Portfolio là phần không thể thiếu trong CV thiết kế nội thất. Đây là nơi bạn thể hiện 
                                    khả năng thực tế của mình một cách trực quan và thuyết phục nhất. Hãy đảm bảo:
                                </p>
                                <ul>
                                    <li>Chọn lọc các dự án tốt nhất (5-10 dự án)</li>
                                    <li>Bao gồm các góc nhìn khác nhau: mặt bằng, phối cảnh, render, ảnh thực tế (nếu có)</li>
                                    <li>Mô tả ngắn gọn về concept và quy trình thiết kế</li>
                                    <li>Đảm bảo chất lượng hình ảnh cao, rõ nét</li>
                                </ul>
                            </section>

                            {/* Section 3 */}
                            <section id="section-3" className="article-section">
                                <h2>Những Lỗi Cần Tránh khi Viết CV Thiết Kế Nội Thất</h2>
                                <ul>
                                    <li>
                                        <strong>Thiếu link portfolio:</strong> Đây là lỗi nghiêm trọng nhất. 
                                        Không có portfolio, nhà tuyển dụng không thể đánh giá năng lực của bạn.
                                    </li>
                                    <li>
                                        <strong>CV quá dài hoặc quá ngắn:</strong> CV nên dài 1-2 trang, 
                                        tập trung vào những thông tin quan trọng nhất.
                                    </li>
                                    <li>
                                        <strong>Thiếu thông tin liên hệ:</strong> Đảm bảo số điện thoại và email 
                                        chính xác và dễ liên lạc.
                                    </li>
                                    <li>
                                        <strong>Sử dụng font chữ khó đọc:</strong> Chọn font chữ chuyên nghiệp, 
                                        dễ đọc và phù hợp với ngành thiết kế.
                                    </li>
                                    <li>
                                        <strong>Lỗi chính tả và ngữ pháp:</strong> Kiểm tra kỹ lưỡng trước khi gửi CV.
                                    </li>
                                    <li>
                                        <strong>Không tùy chỉnh CV theo công ty:</strong> Mỗi công ty có phong cách khác nhau, 
                                        hãy điều chỉnh CV và portfolio cho phù hợp.
                                    </li>
                                </ul>
                            </section>

                            {/* Article Footer */}
                            <div className="article-footer">
                                <div className="article-tags">
                                    <span className="tag">CV thiết kế nội thất</span>
                                    <span className="tag">Thiết kế nội thất</span>
                                    <span className="tag">CV xin việc</span>
                                    <span className="tag">Hướng dẫn viết CV</span>
                                </div>
                                <div className="article-share">
                                    <h4>Chia sẻ bài viết:</h4>
                                    <div className="share-buttons">
                                        <button className="share-btn facebook">Facebook</button>
                                        <button className="share-btn linkedin">LinkedIn</button>
                                        <button className="share-btn twitter">Twitter</button>
                                        <button className="share-btn copy-link">Copy Link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="article-sidebar">
                        <div className="sidebar-section">
                            <h3>Bài Viết Liên Quan</h3>
                            <div className="related-articles">
                                <article className="related-article">
                                    <div className="related-article-image">
                                        <img src="https://via.placeholder.com/150x100?text=CV+XNK" alt="CV xuất nhập khẩu" />
                                    </div>
                                    <div className="related-article-content">
                                        <h4>
                                            <Link to="/blog/cv-xuat-nhap-khau">
                                                Mẫu CV xuất nhập khẩu bằng tiếng Anh
                                            </Link>
                                        </h4>
                                        <p>Cách viết và mẫu CV xuất nhập khẩu bằng tiếng Anh ghi điểm nhà tuyển dụng</p>
                                    </div>
                                </article>

                                <article className="related-article">
                                    <div className="related-article-image">
                                        <img src="https://via.placeholder.com/150x100?text=CV+Le+Tan" alt="CV lễ tân" />
                                    </div>
                                    <div className="related-article-content">
                                        <h4>
                                            <Link to="/blog/cv-le-tan">
                                                Mẫu CV nhân viên lễ tân hành chính
                                            </Link>
                                        </h4>
                                        <p>Mẫu cv nhân viên lễ tân hành chính chuyên nghiệp, gây ấn tượng</p>
                                    </div>
                                </article>

                                <article className="related-article">
                                    <div className="related-article-image">
                                        <img src="https://via.placeholder.com/150x100?text=CV+Dược" alt="CV trình dược viên" />
                                    </div>
                                    <div className="related-article-content">
                                        <h4>
                                            <Link to="/blog/cv-trinh-duoc-vien">
                                                Mẫu CV Trình dược viên chuẩn, chuyên nghiệp
                                            </Link>
                                        </h4>
                                        <p>Mẫu CV Trình dược viên chuẩn, chuyên nghiệp giúp chinh phục nhà tuyển dụng</p>
                                    </div>
                                </article>

                                <article className="related-article">
                                    <div className="related-article-image">
                                        <img src="https://via.placeholder.com/150x100?text=Phong+Van" alt="Phỏng vấn IT Helpdesk" />
                                    </div>
                                    <div className="related-article-content">
                                        <h4>
                                            <Link to="/blog/phong-van-it-helpdesk">
                                                Tổng hợp câu hỏi phỏng vấn IT Helpdesk
                                            </Link>
                                        </h4>
                                        <p>Tổng hợp câu hỏi phỏng vấn IT Helpdesk và gợi ý trả lời 2025</p>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3>Bài Đọc Nhiều</h3>
                            <ul className="popular-articles">
                                <li>
                                    <Link to="/blog/cv-xuat-nhap-khau">
                                        Mẫu CV xuất nhập khẩu bằng tiếng Anh
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blog/cv-thiet-ke-noi-that">
                                        Cách viết CV thiết kế nội thất ấn tượng
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blog/cv-le-tan">
                                        Mẫu cv nhân viên lễ tân hành chính chuyên nghiệp
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="sidebar-section">
                            <h3>Việc làm tốt nhất dành cho bạn</h3>
                            <div className="job-listings">
                                <div className="job-listing">
                                    <h4>Chief Technology Officer (CTO)</h4>
                                    <p className="company">Tập Đoàn Apec (Apec Group)</p>
                                    <p className="salary">$ 2,000-4,000 /tháng</p>
                                    <Link to="/jobs" className="btn-view-job">Xem chi tiết</Link>
                                </div>
                                <div className="job-listing">
                                    <h4>Junior/ Fresher ReactJS Developer</h4>
                                    <p className="company">Euroland ASIA Co., Ltd.</p>
                                    <p className="salary">$ 500-1,200 /tháng</p>
                                    <Link to="/jobs" className="btn-view-job">Xem chi tiết</Link>
                                </div>
                            </div>
                            <Link to="/jobs" className="btn-view-all-jobs">Tìm việc ngay</Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

