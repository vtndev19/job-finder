import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

/* Components */
import HomeHeader from "../components/HomeHeader";
import Home from "../Page/Home";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import AdminLayout from "../components/AdminLayout";
/* Views */
import Login from "../Page/Login";
import Register from "../Page/Register";
import JobDetail from "../Page/JobDetail";
import AllJobs from '../Page/AllJobs';
import Profile from '../Page/Profile';
import Blog from '../Page/Blog';
import CVInteriorDesign from '../Page/CVInteriorDesign';
/* Admin Pages */
import AdminDashboard from '../Page/AdminDashboard';
import AdminUsers from '../Page/AdminUsers';
import AdminJobs from '../Page/AdminJobs';
import AdminApplications from '../Page/AdminApplications';
import AdminContent from '../Page/AdminContent';
import AdminAI from '../Page/AdminAI';
import AdminNotifications from '../Page/AdminNotifications';
import AdminSupport from '../Page/AdminSupport';
import AdminModeration from '../Page/AdminModeration';
import AdminSettings from '../Page/AdminSettings';
import AdminLogs from '../Page/AdminLogs';
import AdminSecurity from '../Page/AdminSecurity';

/* Styles */
import "../styles/global.scss";
import "../styles/Home.scss";

/* App chính */
export default function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users/candidates" element={<AdminUsers />} />
        <Route path="users/employers" element={<AdminUsers />} />
        <Route path="users/admins" element={<AdminUsers />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="ai" element={<AdminAI />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="support" element={<AdminSupport />} />
        <Route path="moderation" element={<AdminModeration />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="logs" element={<AdminLogs />} />
        <Route path="security" element={<AdminSecurity />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <Home />
          </main>
          <Chat />
          <Footer />
        </>
      } />
      <Route path="/login" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <Login />
          </main>
          <Footer />
        </>
      } />
      <Route path="/register" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <Register />
          </main>
          <Footer />
        </>
      } />
      <Route path="/jobs" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <AllJobs />
          </main>
          <Footer />
        </>
      } />
      <Route path="/job/:jobId" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <JobDetail />
          </main>
          <Footer />
        </>
      } />
      <Route path="/profile" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <Profile />
          </main>
          <Footer />
        </>
      } />
      <Route path="/blog" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <Blog />
          </main>
          <Footer />
        </>
      } />
      <Route path="/blog/cv-thiet-ke-noi-that" element={
        <>
          <HomeHeader siteName="JobFinder" />
          <main>
            <CVInteriorDesign />
          </main>
          <Footer />
        </>
      } />
    </Routes>
  );
}
