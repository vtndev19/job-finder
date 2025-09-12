import React from "react";

export default function HomeSearch({ keyword, setKeyword }) {
    return (
        <div className="search-bar container">
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm theo từ khóa..."
            />
            <button>Tìm kiếm</button>
        </div>
    );
}
