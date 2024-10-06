import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AdminContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";
import { TeacherContext } from "../context/TecherContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { TeacherToken, setTeacherToken } = useContext(TeacherContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/login-admin`,
          {
            email,
            password,
          }
        );

        if (data.success) {
          toast.success("Logged in successfully!");
          localStorage.setItem("aToken", data.Token);
          setAToken(data.Token);
          navigate("/admin-dashboard");
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/teacher/teacher-login`,
          {
            email,
            password,
          }
        );

        if (data.success) {
          toast.success("Logged in successfully!");
          localStorage.setItem("TeacherToken", data.Token);
          setTeacherToken(data.Token);
          navigate("/teacher-Dashboard");
        } else {
          toast.error("Invalid Credentials");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            {" "}
            Teacher Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Teacher");
              }}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Admin");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
