import React from "react";
import '../styles/components/HomeFilters.scss';

export default function HomeFilters({
    cities,
    industries,
    cityFilter,
    setCityFilter,
    industryFilter,
    setIndustryFilter,
}) {
    return (
        <div className="filters container">
            <div className="filter-group">
                <label>Thành phố:</label>
                <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                    <option value="All">Tất cả</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>Ngành nghề:</label>
                <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}>
                    <option value="All">Tất cả</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
        </div>
    );
}
