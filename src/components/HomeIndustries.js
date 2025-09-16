import React from "react";
import data from "../data/db.json"; // đường dẫn đến file json

export default function HomeIndustries() {
    const industries = data.industries;

    return (
        <div className="industries container">
            <h3 className="mb-4">Top ngành nghề nổi bật</h3>
            <div className="grid grid-cols-4 gap-4">
                {industries.map(ind => (
                    <div
                        key={ind.id}
                        className="p-4 bg-gray-100 rounded-lg flex flex-col items-center shadow hover:shadow-md transition"
                    >
                        {/* Icon có thể custom theo ngành, tạm thời chỉ text */}
                        <div className="text-3xl mb-2">🏷️</div>
                        <h4 className="font-semibold text-center">{ind.name}</h4>
                        <p className="text-green-600">{ind.job_count.toLocaleString()} việc làm</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
