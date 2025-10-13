import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/FeaturedIndustries.scss';
import db from '../data/db.json';

// Import industry icons
import itIcon from '../assets/images/information-technology.svg';
import marketingIcon from '../assets/images/marketing-advertising.svg';
import financeIcon from '../assets/images/finance-banking.svg';
import retailIcon from '../assets/images/retail-ecommerce.svg';
import manufacturingIcon from '../assets/images/manufacturing-processing.svg';
import constructionIcon from '../assets/images/construction-real-estate.svg';
import educationIcon from '../assets/images/education-training.svg';
import tourismIcon from '../assets/images/tourism-hospitality.svg';

const industryIcons = {
    1: itIcon,             // Công nghệ thông tin
    2: marketingIcon,      // Marketing & Quảng cáo
    3: financeIcon,        // Tài chính & Ngân hàng
    4: retailIcon,         // Bán lẻ & Thương mại điện tử
    5: manufacturingIcon,  // Sản xuất & Chế biến
    6: constructionIcon,   // Xây dựng & Bất động sản
    7: educationIcon,      // Giáo dục & Đào tạo
    8: tourismIcon        // Du lịch & Nhà hàng
};

const FeaturedIndustries = () => {
    const { industries } = db;

    return (
        <section className="featured-industries">
            <div className="container">
                <div className="section-header">
                    <h2>Top ngành nghề nổi bật</h2>
                    <Link to="/industries" className="view-all">
                        Xem tất cả
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="industries-grid">
                    {industries.map((industry) => (
                        <Link
                            to={`/jobs/industry/${industry.id}`}
                            key={industry.id}
                            className="industry-card"
                            data-industry={industry.id}
                        >
                            <div className="industry-icon">
                                <img src={industryIcons[industry.id]} alt={industry.name} />
                            </div>
                            <h3>{industry.name}</h3>
                            <p>{industry.job_count.toLocaleString()} việc làm</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedIndustries;