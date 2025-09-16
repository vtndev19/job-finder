import React, { useState } from "react";
import CompanyList from "../components/CompanyList";
import CompanyDetail from "../components/CompanyDetail";

function CompanyPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div>
      {selectedCompany ? (
        <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompany(null)} />
      ) : (
        <CompanyList onSelect={setSelectedCompany} />
      )}
    </div>
  );
}

export default CompanyPage;
