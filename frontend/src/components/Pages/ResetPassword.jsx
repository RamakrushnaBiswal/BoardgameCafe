import { Link, useNavigate, useParams } from 'react-router-dom';
import photo from '../../assets/login.png';
import React, { useState } from 'react';
import { message } from 'antd';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

const ResetPassword = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidden, setHidden] = useState(true);
  const [confHidden, setConfHidden] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/forgot/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Reset password failed');
      }

      // Display success message and navigate to login
      message.success('Password reset successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center pt-10">
      <img src={photo} alt="login" loading="lazy" className=" w-3/4 absolute" />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="form z-10 p-16 bg-lightblue flex flex-col items-start justify-center gap-5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] bg-[#f1e9dc]"
      >
        <span className="block text-[#666] font-semibold text-2xl ">
          Hey User,
        </span>
        <div className="title text-[#323232] font-black text-7xl mb-6">
          Enter your<br></br>New Password
          <br />
        </div>

        {error && (
          <div className="w-full p-2 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <div className="relative w-full">
          <input
            className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
            name="password"
            placeholder="Password"
            type={hidden ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4"
            onClick={(e) => {
              e.preventDefault();
              setHidden(!hidden);
            }}
          >
            {hidden ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative w-full">
          <input
            className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
            name="confirmPassword"
            placeholder="Confirm Password"
            type={confHidden ? 'password' : 'text'}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4"
            onClick={(e) => {
              e.preventDefault();
              setConfHidden(!confHidden);
            }}
          >
            {confHidden ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="button-confirm mx-auto mt-12 px-4 w-30 h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] cursor-pointer active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Let’s go →'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
