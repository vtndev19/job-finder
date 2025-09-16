import React from "react";
import companies from "../data/companies";


function CompanyList({ onSelect }) {
  return (
    <div className="company-list">
      {companies.map((company) => (
        <div
          key={company.id}
          className="company-item"
          onClick={() => onSelect(company)}
          style={{ cursor: "pointer", marginBottom: "20px" }}
        >
          <img src={company.logo} alt={company.name} 
          style={{ width: "80px", height: "80px", objectFit: "contain" }} />
          <h2>{company.name}</h2>
          <p>{company.industry}</p>
          <p>{company.location}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;
