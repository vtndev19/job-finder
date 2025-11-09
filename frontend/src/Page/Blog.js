import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.scss';

export default function Blog() {
    const blogPosts = [
        {
            id: 'cv-thiet-ke-noi-that',
            title: 'Cách viết CV thiết kế nội thất ấn tượng, chinh phục nhà tuyển dụng',
            excerpt: 'Thiết kế nội thất là lĩnh vực đòi hỏi sự sáng tạo và đam mê. Trong thị trường cạnh tranh, một CV thiết kế nội thất hoàn hảo chính là chìa khóa để chinh phục nhà tuyển dụng.',
            category: ['Hành trang yêu nghề', 'Phát triển kỹ năng'],
            date: '14/10/2025',
            views: 223,
            image: 'https://via.placeholder.com/400x250?text=CV+Thiet+Ke+Noi+That',
            link: '/blog/cv-thiet-ke-noi-that'
        },
        {
            id: 'cv-xuat-nhap-khau',
            title: 'Cách viết và mẫu CV xuất nhập khẩu bằng tiếng Anh ghi điểm nhà tuyển dụng',
            excerpt: 'Hướng dẫn chi tiết cách tạo CV xuất nhập khẩu chuyên nghiệp bằng tiếng Anh, giúp bạn nổi bật trong quá trình tuyển dụng.',
            category: ['Kỹ năng nghề nghiệp'],
            date: '10/10/2025',
            views: 456,
            image: 'https://via.placeholder.com/400x250?text=CV+Xuat+Nhap+Khau',
            link: '/blog/cv-xuat-nhap-khau'
        },
        {
            id: 'cv-le-tan',
            title: 'Mẫu cv nhân viên lễ tân hành chính chuyên nghiệp, gây ấn tượng',
            excerpt: 'Tìm hiểu cách tạo CV nhân viên lễ tân hành chính ấn tượng, thể hiện được kỹ năng giao tiếp và chuyên nghiệp.',
            category: ['Hành trang yêu nghề'],
            date: '08/10/2025',
            views: 312,
            image: 'https://via.placeholder.com/400x250?text=CV+Le+Tan',
            link: '/blog/cv-le-tan'
        }
    ];

    return (
        <div className="blog-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Blog</span>
                </div>

                {/* Page Header */}
                <header className="page-header">
                    <h1>Blog - Kiến thức nghề nghiệp</h1>
                    <p>Chia sẻ kiến thức, kinh nghiệm và mẹo hay về tìm việc, phỏng vấn và phát triển sự nghiệp</p>
                </header>

                {/* Blog Posts Grid */}
                <div className="blog-posts-grid">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="blog-post-card">
                            <Link to={post.link} className="blog-post-link">
                                <div className="blog-post-image">
                                    <img src={post.image} alt={post.title} />
                                    <div className="blog-post-categories">
                                        {post.category.map((cat, idx) => (
                                            <span key={idx} className="category-tag">{cat}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="blog-post-content">
                                    <h2 className="blog-post-title">{post.title}</h2>
                                    <p className="blog-post-excerpt">{post.excerpt}</p>
                                    <div className="blog-post-meta">
                                        <span className="blog-post-date">📅 {post.date}</span>
                                        <span className="blog-post-views">👁️ {post.views} lượt xem</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Load More Section */}
                <div className="blog-load-more">
                    <p>Đang tải thêm bài viết...</p>
                </div>
            </div>
        </div>
    );
}

