import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, Token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.Token); // Ensure the key matches the backend response
          setToken(data.Token);
          toast.success("Account created successfully!");
          setEmail("");
          setName("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.Token); // Ensure the key matches the backend response
          setToken(data.Token);
          toast.success("Logged in successfully!");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error.response);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (Token) {
      navigate("/"); // Redirect to dashboard if token is present
    }
  }, [Token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book an
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)} // Corrected the handler
              value={name}
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)} // Corrected the handler
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)} // Corrected the handler
            value={password}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p
            onClick={() => setState("Login")}
            className="text-sm text-gray-600 hover:text-gray-800 mt-3"
          >
            Already have an account?{" "}
            <span className="text-primary underline cursor-pointer hover:text-purple-600">
              Login
            </span>
          </p>
        ) : (
          <p
            onClick={() => setState("Sign Up")}
            className="text-sm text-gray-600 hover:text-gray-800 mt-3"
          >
            Create a new account?{" "}
            <span className="text-primary underline cursor-pointer hover:text-purple-600">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
