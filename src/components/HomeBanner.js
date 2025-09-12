import React from "react";
import '../styles/components/HomeBanner.scss';

export default function HomeBanner() {
    return (
        <div className="banner">
            <div className="banner-content container">
                <h2>Tìm việc nhanh — Liên hệ trực tiếp nhà tuyển dụng</h2>
                <p>Hàng ngàn cơ hội việc làm tại Hà Nội, TP.HCM, Đà Nẵng...</p>
                <div className="banner-actions">
                    <button>Đăng CV</button>
                    <button className="outline">Đăng tin tuyển dụng</button>
                </div>
            </div>
        </div>
    );
}
