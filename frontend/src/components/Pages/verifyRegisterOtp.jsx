import { Link, useNavigate, useParams } from 'react-router-dom';
import photo from '../../assets/login-opt.png';
import React, { useState } from 'react';
import { message } from 'antd';

const OtpRegisterVerify = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(id || '');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsLoading(false);
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Now using the email state
          otp: otp,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'OTP verification failed');
      }

      message.success('OTP verified successfully! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center pt-10">
      <img src={photo} alt="verify" loading="lazy" className="w-3/4 absolute" />
      <form
        onSubmit={handleSubmit}
        className="form z-10 p-16 bg-lightblue flex flex-col items-start justify-center gap-5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] bg-[#f1e9dc]"
      >
        <span className="block text-[#666] font-semibold text-2xl ">
          Hey User,
        </span>
        <div className="title text-[#323232] font-black text-7xl mb-6">
          Verify Your OTP
          <br />
        </div>

        {error && (
          <div className="w-full p-2 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="email"
          placeholder="Enter Your Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          aria-required="true"
          autoComplete="email"
        />

        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="otp"
          placeholder="Enter OTP"
          type="text"
          value={otp}
          onChange={handleOtpChange}
          required
          aria-required="true"
          autoComplete="one-time-code"
        />

        <h3 className="flex items-center justify-between w-full">
          <span className="block text-[#666] font-semibold text-xl transform hover:scale-110 hover:-translate-y-1 hover:text-green-500 transition">
            <Link to={'/login'}>Go Back To Login Page</Link>
          </span>
        </h3>

        <button
          type="submit"
          className="button-confirm mx-auto mt-12 px-4 w-30 h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] cursor-pointer active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Verify OTP →'}
        </button>
      </form>
    </div>
  );
};

export default OtpRegisterVerify;
