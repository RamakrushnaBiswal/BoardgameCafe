import { Link, useNavigate, useParams } from 'react-router-dom';
import photo from '../../assets/login.png';
import React, { useState } from 'react';
import { message } from 'antd';

const VerifyOtp = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [otp, setOtp] = useState('');

  const { id } = useParams();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/forgot/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp,
          id: id,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Reset password failed');
      }

      // Display success message and navigate to login
      message.success('Otp verified, kingly set new password');
      navigate(`/reset-password/${id}`);
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
          Verify your<br></br>OTP
          <br />
        </div>

        {error && (
          <div className="w-full p-2 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="otp"
          placeholder="OTP"
          type="text"
          aria-required="true"
          onChange={(e) => handleChange(e)}
        />

        <button
          type="submit"
          className="button-confirm mx-auto mt-12 px-4 w-30 h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] cursor-pointer active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Verify →'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
