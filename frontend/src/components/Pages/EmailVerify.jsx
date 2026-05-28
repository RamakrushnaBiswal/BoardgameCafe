import { Link, useNavigate } from 'react-router-dom';
import photo from '../../assets/login-opt.png';
import React, { useState } from 'react';
import { message } from 'antd';

const EmailVerify = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function for email validation
  const isValidEmail = (email) => {
    // Basic email regex, consider using a more robust solution in production
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Add input validation // Basic validation examples
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/forgot/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Reset password failed');
      }
      

      // Display success message and navigate to login
      message.success('Password reset successfully! Please log in.');
      navigate(`/verifyotp/${result.id}`);
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
          Reset Your<br></br> Password
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
          placeholder="Email"
          type="email"
          aria-required="true"
          autoComplete="email"
          onChange={(e) => handleChange(e)}
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
          {isLoading ? 'Submitting...' : 'Let’s go →'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
