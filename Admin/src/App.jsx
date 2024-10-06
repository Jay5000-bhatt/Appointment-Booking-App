import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import { TeacherContext } from "./context/TecherContext.jsx";

import Login from "./pages/Login";
import NavBar from "./components/NavBar.jsx";
import Sidebar from "./Components/Sidebar.jsx";

import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddTeacher from "./pages/Admin/AddTeacher.jsx";
import TeacherList from "./pages/Admin/TeacherList.jsx";

import TeacherProfile from "./pages/Teacher/TeacherProfile.jsx";
import TeachersAppointments from "./pages/Teacher/TeachersAppointments.jsx";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { TeacherToken } = useContext(TeacherContext);

  return aToken || TeacherToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/teacher-list" element={<TeacherList />} />

          {/* Teacher Routes */}
          <Route path="/teacher-Dashboard" element={<TeacherDashboard />} />
          <Route
            path="/teacher-Appointments"
            element={<TeachersAppointments />}
          />
          <Route path="/teacher-Profile" element={<TeacherProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
