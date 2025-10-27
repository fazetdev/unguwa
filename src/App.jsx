import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom"; 
import { AuthProvider } from "./context/AuthContext";
import { ExamProvider } from "./context/ExamContext";
import { BulkPrintProvider } from "./context/BulkPrintContext";
import Navbar from "./components/Navbar";

// Public Pages
import LandingPage from "./pages/LandingPage";
import AboutSchool from "./menu/AboutSchool";
import DutyRoster from "./menu/DutyRoster";
import Timetable from "./menu/Timetable";
import Contact from "./menu/Contact";
import ELibrary from "./menu/ELibrary";
import TopStudents from "./menu/TopStudents";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Attendance Pages
import GeneralAttendance from "./pages/Attendance/GeneralAttendance";
import MyAttendance from "./pages/Attendance/MyAttendance";
import EnterAttendance from "./pages/Attendance/EnterAttendance";

// Dashboard Pages
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import UnifiedDashboard from "./pages/Dashboard/UnifiedDashboard";
import ExamBank from "./pages/Dashboard/ExamBank"; 
import ScoreCenter from "./pages/Dashboard/ScoreCenter"; 
import ProfileCard from "./pages/Dashboard/ProfileCard";
import ReportCardDashboard from "./pages/Dashboard/ReportCardDashboard";
import BulkReportCenter from "./pages/Dashboard/BulkReportCenter";
import TeachingPortal from './pages/Dashboard/TeachingPortal';

import { initializeClassData } from "./data/classes";
import { initializeAttendanceData } from "./data/attendanceConfig";

// Initialize admin user on app start
const initializeAdmin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const adminExists = users.some(user => user.role === "admin");

  if (!adminExists) {
    const adminUser = {
      id: "admin-001",
      role: "admin",
      fullName: "System Administrator",
      name: "System Administrator",
      email: "admin@school.edu",
      password: "admin123",
      createdAt: new Date().toISOString(),
      status: "active"
    };

    users.push(adminUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Default admin user created: admin@school.edu / admin123");
  }
};

// Initialize both systems
initializeAdmin();
initializeClassData();
initializeAttendanceData();

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}

      <Routes>
        {/* ===================== Public Routes ===================== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-school" element={<AboutSchool />} />
        <Route path="/duty-roster" element={<DutyRoster />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/elibrary" element={<ELibrary />} />
        <Route path="/top-students" element={<TopStudents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===================== Attendance Routes ===================== */}
        <Route path="/attendance/general" element={<GeneralAttendance />} />
        <Route path="/attendance/staff" element={<MyAttendance />} />
        <Route path="/attendance/admin" element={<EnterAttendance />} />

        {/* ===================== Dashboard Routes ===================== */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* ALL role-specific dashboards use UnifiedDashboard */}
          <Route index element={<UnifiedDashboard />} />
          <Route path="principal" element={<UnifiedDashboard />} />
          <Route path="vp-admin" element={<UnifiedDashboard />} />
          <Route path="vp-academic" element={<UnifiedDashboard />} />
          <Route path="senior-master" element={<UnifiedDashboard />} />
          <Route path="exam-officer" element={<UnifiedDashboard />} />
          <Route path="form-master" element={<UnifiedDashboard />} />
          <Route path="teacher" element={<UnifiedDashboard />} />
          <Route path="admin" element={<UnifiedDashboard />} />

          {/* Dashboard utility pages */}
          <Route path="profile" element={<ProfileCard />} />
          <Route path="exambank" element={<ExamBank />} />
          <Route path="score-center" element={<ScoreCenter />} />
          <Route path="bulk-reports" element={<BulkReportCenter />} />
          <Route path="exam-officer/report-cards" element={<ReportCardDashboard />} />
          <Route path="teaching-portal" element={<TeachingPortal />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
              <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
              <a href="/" className="text-blue-600 hover:text-blue-800 underline">Return to Home</a>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <BulkPrintProvider>
          <AppContent />
        </BulkPrintProvider>
      </ExamProvider>
    </AuthProvider>
  );
}
