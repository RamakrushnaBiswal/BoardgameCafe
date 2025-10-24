import React, { useState, useEffect } from 'react';
import photo from '../../../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { useUser } from '../../../context/userContext';

const AdminLogin = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
      const res = JSON.stringify(result.admin);
      Cookies.set('authToken', result.token, { expires: 1, secure: true });
      Cookies.set('authenticatedUser', res, { expires: 1, secure: true });
      setUser(result.admin);
      message.success('Login successful');
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen h-screen dark:bg-black flex items-center justify-center lg:pt-10 px-4">
      {/* Background Image */}
      <img
        src={photo}
        alt="login"
        loading="lazy"
        className="absolute w-3/4 lg:w-auto lg:opacity-100 opacity-10 object-cover"
      />
      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="z-10 p-8 lg:p-14 bg-[#f1e9dc] dark:bg-amber-800 dark:text-white flex flex-col gap-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] w-full max-w-md lg:max-w-xl"
      >
        <div className="text-[#323232] dark:text-white font-black text-4xl lg:text-6xl mb-2">
          Admin Login,
          <span className="block text-[#666] dark:text-gray-400 font-semibold text-lg lg:text-2xl mt-1">
            Log in to continue
          </span>
        </div>

        <input
          className="w-full h-12 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666]"
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />

        <div className="relative w-full">
          <input
            className="w-full h-12 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666]"
            name="password"
            placeholder="Password"
            type={hidden ? 'password' : 'text'}
            onChange={handleChange}
          />
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4"
            onClick={(e) => {
              e.preventDefault();
              setHidden(!hidden);
            }}
          >
            {hidden ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <Link
          to="/email-verify"
          className="text-sm lg:text-base text-gray-500 dark:text-gray-200 hover:text-red-500 transition"
        >
          Forgot Password?
        </Link>

        <h3 className="flex justify-between items-center w-full text-sm lg:text-base">
          Don’t have an account?
          <Link
            to="/admin-signup"
            className="text-green-500 font-semibold hover:scale-110 transition"
          >
            Register Here
          </Link>
        </h3>

        <Link to={`${API_URL}/api/user/auth/google`} className="w-full">
          <button
            type="button"
            className="w-full h-12 rounded-md border-2 dark:text-white border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] transition active:translate-x-[3px] active:translate-y-[3px]"
          >
            Sign in with Google
          </button>
        </Link>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full h-12 rounded-md dark:text-white border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] transition active:translate-x-[3px] active:translate-y-[3px]"
        >
          {isLoading ? 'Loading...' : 'Let’s Log you in →'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
