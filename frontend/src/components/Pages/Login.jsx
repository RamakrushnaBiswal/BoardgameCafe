
import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import photo from "../../assets/login.png";

import { Link, useNavigate } from "react-router-dom";
import photo from "../../assets/login.png";
import React, { useState } from "react";
import { message } from "antd";


const Login = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate(); // Correctly initialize useNavigate
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      // Handle successful login (e.g., store token, redirect)
      message.success("Login successful");
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center pt-10">
      <img src={photo} alt="login" className=" w-3/4 absolute" />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="form z-10 p-16 bg-lightblue flex flex-col items-start justify-center gap-5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] bg-[#f1e9dc]"
      >
        <div className="title text-[#323232] font-black text-7xl mb-6">
          Welcome,
          <br />
          <span className="block text-[#666] font-semibold text-2xl ">
            Log in to continue
          </span>
        </div>

        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="email"
          placeholder="Email"
          type="email"
          onChange={(e) => handleChange(e)}
        />

        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => handleChange(e)}
        />
        <h3 className="flex items-center justify-between w-full">
          Dont have an account?
          <span className="block text-[#666] font-semibold text-xl transform hover:scale-110 hover:-translate-y-1 hover:text-green-500 transition">
            <Link to={"/signup"}>Register Here</Link>
          </span>
        </h3>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="button-confirm mx-auto mt-12 px-4 w-30 h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] cursor-pointer active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          {isLoading ? "Loading..." : "Let’s Log you in →"}
        </button>
      </form>
    </div>
  );
};

export default Login;
