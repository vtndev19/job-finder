import React, { useState } from "react";
import HomeBanner from "../components/HomeBanner";
import HomeSearch from "../components/HomeSearch";
import HomeFilters from "../components/HomeFilters";
import HomeJobs from "../components/HomeJobs";
import { JobNews } from "../components/JobNews";
import FeaturedIndustries from "../components/FeaturedIndustries";
import db from "../data/db.json";
import "../styles/Home.scss";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const jobs = db.jobs;
  const cities = Array.from(new Set(jobs.map(j => j.location)));
  const industries = Array.from(new Set(db.industries.map(i => i.name)));

  const filtered = jobs.filter(j => {
    const matchKeyword = !keyword.trim() || j.title.toLowerCase().includes(keyword.toLowerCase());
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
          <JobNews articles={db.articles} isLoading={false} />
          <FeaturedIndustries jobs={jobs} />
        </section>
      </div>
    </>
  );
}


