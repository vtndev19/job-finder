import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/components/JobNews.scss";

// Import ảnh trực tiếp
import news1 from "../assets/images/news/news (1).png";
import news2 from "../assets/images/news/news (2).png";
import news3 from "../assets/images/news/news (3).png";
import news4 from "../assets/images/news/news (4).png";
import news5 from "../assets/images/news/news (5).png";
import news6 from "../assets/images/news/news (6).png";

// Danh sách ảnh giả định (sau này có thể thay bằng dữ liệu từ backend)
const newsImages = [news1, news2, news3, news4, news5, news6];

export function JobNews({ articles = [], isLoading = false, onReadMore }) {
    const formatDate = (iso) => {
        if (!iso) return "";
        try {
            const d = new Date(iso);
            return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        } catch (e) {
            return iso;
        }
    };

    const SkeletonCard = () => (
        <div className="jobnews-skeleton">
            <div className="skeleton-img" />
            <div className="skeleton-title" />
            <div className="skeleton-text" />
        </div>
    );

    const NewsCard = ({ article, index }) => {
        // Map article to blog post link if available
        const getBlogLink = (articleId) => {
            const blogMapping = {
                'cv-thiet-ke-noi-that': '/blog/cv-thiet-ke-noi-that',
                'cv-xuat-nhap-khau': '/blog/cv-xuat-nhap-khau',
                'cv-le-tan': '/blog/cv-le-tan'
            };
            // Check if article title contains keywords
            if (article.title?.toLowerCase().includes('cv') || article.title?.toLowerCase().includes('thiết kế')) {
                return '/blog/cv-thiet-ke-noi-that';
            }
            return blogMapping[articleId] || '/blog';
        };

        const blogLink = article.blogLink || getBlogLink(article.id);

        return (
            <motion.article
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="jobnews-card"
            >
                <Link to={blogLink} className="jobnews-card-link">
                    <div className="jobnews-card-content">
                        <div className="jobnews-text">
                            <h3>{article.title}</h3>
                            <p>{article.excerpt || "Tin tức mới về tuyển dụng"}</p>

                            <div className="jobnews-meta">
                                <span>{article.company}</span>
                                <span>
                                    {article.location ? `${article.location} · ` : ""}
                                    {formatDate(article.date)}
                                </span>
                                <span className="read-more-text">Đọc thêm →</span>
                            </div>
                        </div>

                        <div className="jobnews-image">
                            <img
                                src={newsImages[index % newsImages.length]} // Chọn ảnh theo index
                                alt={article.title}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    };

    const showSkeletons = isLoading && (!articles || articles.length === 0);

    return (
        <section className="jobnews">
            <div className="jobnews-header">
                <h2>Tin tức tuyển dụng</h2>
                <Link to="/blog">Xem tất cả</Link>
            </div>

            <div className="jobnews-grid">
                {showSkeletons
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : articles && articles.length > 0
                        ? articles.map((a, i) => <NewsCard key={a.id} article={a} index={i} />)
                        : (
                            <div className="jobnews-empty">
                                <p>Không có tin tức nào. Hãy thử tải lại hoặc tạo nội dung mới.</p>
                            </div>
                        )}
            </div>
        </section>
    );
}

export default JobNews;
