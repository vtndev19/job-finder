import React from "react";

export default function HomeIndustries({ jobs }) {
    const byIndustry = jobs.reduce((acc, j) => {
        if (!acc[j.industry]) acc[j.industry] = { name: j.industry, latest: j.uploadedAt, score: 0 };
        acc[j.industry].score += j.hrPosts;
        if (new Date(j.uploadedAt) > new Date(acc[j.industry].latest)) acc[j.industry].latest = j.uploadedAt;
        return acc;
    }, {});

    const industriesArr = Object.values(byIndustry);
    const newest = industriesArr.sort((a, b) => new Date(b.latest) - new Date(a.latest)).slice(0, 4);
    const popular = industriesArr.sort((a, b) => b.score - a.score).slice(0, 4);

    return (
        <div className="industries container">
            <div className="grid-2">
                <section>
                    <h4>Ngành mới upload gần đây</h4>
                    <ul>
                        {newest.map(i => (
                            <li key={i.name}>
                                <strong>{i.name}</strong> — mới nhất: {i.latest}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h4>Ngành được quan tâm nhiều</h4>
                    <ul>
                        {popular.map(i => (
                            <li key={i.name}>
                                <strong>{i.name}</strong> — lượt quan tâm: {i.score}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
