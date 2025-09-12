import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

/* Components */
import HomeHeader from "../components/HomeHeader";
import HomeSearch from "../components/HomeSearch";
import HomeBanner from "../components/HomeBanner";
import HomeFilters from "../components/HomeFilters";
import HomeJobs from "../components/HomeJobs";
import HomeIndustries from "../components/HomeIndustries";

/* Views */
import Login from "../Page/Login";
import Register from "../Page/Register";

/* Styles */
import "../styles/global.scss";
import "../styles/Home.scss";

/* Mock data */
const MOCK_JOBS = [
  { id: 1, title: "Frontend Developer", city: "Hanoi", industry: "IT", hrPosts: 5, uploadedAt: "2025-09-10" },
  { id: 2, title: "Backend Developer", city: "Ho Chi Minh", industry: "IT", hrPosts: 8, uploadedAt: "2025-09-11" },
  { id: 3, title: "Marketing Specialist", city: "Da Nang", industry: "Marketing", hrPosts: 3, uploadedAt: "2025-09-08" },
  { id: 4, title: "Data Analyst", city: "Ho Chi Minh", industry: "Data", hrPosts: 6, uploadedAt: "2025-09-12" },
  { id: 5, title: "UI/UX Designer", city: "Hanoi", industry: "Design", hrPosts: 2, uploadedAt: "2025-09-09" },
];

/* App chính */
export default function App() {
  return (
    <>
      <HomeHeader siteName="JobFinder" />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomeMain jobs={MOCK_JOBS} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

/* Trang chủ */
function HomeMain({ jobs }) {
  const [keyword, setKeyword] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const cities = Array.from(new Set(jobs.map((j) => j.city)));
  const industries = Array.from(new Set(jobs.map((j) => j.industry)));

  const filtered = jobs.filter((j) => {
    const matchKeyword = keyword.trim() === "" || j.title.toLowerCase().includes(keyword.toLowerCase());
    const matchCity = cityFilter === "All" || j.city === cityFilter;
    const matchIndustry = industryFilter === "All" || j.industry === industryFilter;
    return matchKeyword && matchCity && matchIndustry;
  });

  return (
    <section className="home">
      <HomeSearch keyword={keyword} setKeyword={setKeyword} />
      <HomeBanner />
      <HomeFilters
        cities={cities}
        industries={industries}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
      />
      <HomeJobs jobs={filtered} />
      <HomeIndustries jobs={jobs} />
    </section>
  );
}
