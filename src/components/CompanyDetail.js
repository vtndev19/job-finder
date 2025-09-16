import React from "react";



function CompanyDetail({ company, onBack }) {
  if (!company) return <p>Chọn một công ty để xem chi tiết</p>;

  return (
    <div className="p-4">
      <button
        onClick={onBack}
      >
        ← Quay lại
      </button>
      <img src={company.logo} alt={company.name}/>
      <h1>{company.name}</h1>
      <p><b>Ngành:</b> {company.industry}</p>
      <p><b>Địa điểm:</b> {company.location}</p>
      <p><b>Quy mô:</b> {company.size}</p>
      <p className="mt-2">{company.description}</p>

      <h2>Việc làm đang tuyển</h2>
      <ul>
        {company.jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;
