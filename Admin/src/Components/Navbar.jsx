import React, { useContext } from "react";
import LogoImg from "../assets/logo.png";
import { AdminContext } from "../context/AdminContext.jsx";
import { TeacherContext } from "../context/TecherContext.jsx";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { TeacherToken, setTeacherToken } = useContext(TeacherContext);

  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      navigate("/login");
      aToken && setAToken("");
      aToken && localStorage.removeItem("aToken");
    } else {
      navigate("/login");
      TeacherToken && setTeacherToken("");
      TeacherToken && localStorage.removeItem("TeacherToken");
    }
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointe"
          src={LogoImg}
          alt="Admin_Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Teacher"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
