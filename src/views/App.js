import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

/* Components */
import HomeHeader from "../components/HomeHeader";
import HomeSearch from "../components/HomeSearch";
import HomeBanner from "../components/HomeBanner";
import HomeFilters from "../components/HomeFilters";
import HomeJobs from "../components/HomeJobs";
import HomeIndustries from "../components/HomeIndustries";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
/* Views */
import Login from "../Page/Login";
import Register from "../Page/Register";
import JobDetail from "../Page/JobDetail";
import AllJobs from '../Page/AllJobs';

/* Styles */
import "../styles/global.scss";
import "../styles/Home.scss";

/* Mock data */
import db from '../data/db.json';

/* App chính */
export default function App() {
  return (
    <>
      <HomeHeader siteName="JobFinder" />
      <main>
        <Routes>
          <Route path="/" element={<HomeMain jobs={db.jobs} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/job/:jobId" element={<JobDetail />} />
        </Routes>
      </main>
      <Chat />
      <Footer />
    </>
  );
}

/* Trang chủ */
function HomeMain({ jobs }) {
  const [keyword, setKeyword] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const cities = Array.from(new Set(jobs.map((j) => j.location)));
  const industries = Array.from(new Set(db.industries.map((i) => i.name)));

  const filtered = jobs.filter((j) => {
    const matchKeyword = keyword.trim() === "" || j.title.toLowerCase().includes(keyword.toLowerCase());
    const matchCity = cityFilter === "All" || j.location === cityFilter;
    const matchIndustry = industryFilter === "All" || db.industries.find(i => i.id === j.industry_id)?.name === industryFilter;
    return matchKeyword && matchCity && matchIndustry;
  });

  return (
    <>
      <HomeBanner />
      <div className="container">
        <section className="home">
          <HomeSearch keyword={keyword} setKeyword={setKeyword} />
          <HomeFilters
            cities={cities}
            industries={industries}
            cityFilter={cityFilter}
            setCityFilter={setCityFilter}
            industryFilter={industryFilter}
            setIndustryFilter={setIndustryFilter}
          />
          <HomeJobs jobs={filtered.slice(0, 10)} />
          <HomeIndustries jobs={jobs} />
        </section>
      </div>
    </>
  );
}
