import { useState, useEffect } from 'react';
import photo from '../../assets/login-opt.png';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Cookies from 'js-cookie';
import apiClient from '../../lib/apiClient';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // New state for Remember Me
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // use toast messages for errors instead of inline error state

    try {
      const result = await apiClient.post('/api/user/login', {
        ...data,
        rememberMe,
      });

      if (!result || !result.user || !result.token) {
        const errMsg = 'Login failed: invalid server response';
        message.error(errMsg);
        return;
      }

      const res = JSON.stringify(result.user);

      Cookies.set('authenticatedUser', res, {
        expires: 1,
        secure: import.meta.env.MODE === 'production',
        sameSite: 'strict',
      });

      Cookies.set('authToken', result.token, {
        expires: rememberMe ? 7 : 1 / 24,
        secure: import.meta.env.MODE === 'production',
        sameSite: 'strict',
      });

      message.success('Login successful');
      navigate('/');
    } catch (err) {
      console.log(err);
      const msg = err?.message || String(err);
      message.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen h-screen pt-10 flex flex-col lg:flex-row items-center justify-center lg:space-x-10 px-4 dark:bg-black">
      {/* Background Image */}
      <img
        src={photo}
        alt="login"
        loading="lazy"
        className="w-3/4 max-w-xs lg:max-w-2xl lg:w-1/2 object-contain mb-6 lg:mb-0"
      />

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="z-10 p-8 lg:p-16 bg-[#f1e9dc] dark:bg-amber-800 dark:text-white flex flex-col gap-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] w-full max-w-md lg:max-w-lg"
      >
        <div className="text-[#323232] dark:text-white font-black text-3xl lg:text-5xl mb-2">
          Welcome,
          <span className="block text-[#666] dark:text-gray-400 font-semibold text-lg lg:text-2xl mt-1">
            Log in to continue
          </span>
        </div>

        <input
          className="w-full h-12 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_grey] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] dark:bg-slate-800 dark:placeholder-white"
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />

        <div className="relative w-full">
          <input
            className="w-full h-12 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_grey] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] dark:bg-slate-800 dark:placeholder-white"
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

        <label className="flex items-center gap-2 text-sm lg:text-base">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>

        <Link
          to="/email-verify"
          className="text-sm lg:text-base text-gray-500 dark:text-gray-200 hover:text-red-500 transition"
        >
          Forgot Password?
        </Link>

        <h3 className="flex justify-between items-center w-full text-sm lg:text-base">
          Don’t have an account?
          <Link
            to="/signup"
            className="text-green-500 font-semibold hover:scale-110 transition"
          >
            Register Here
          </Link>
        </h3>

        <a href={`${BACKEND_URL}/api/user/auth/google`} className="w-full">
          <button
            type="button"
            className="w-full h-12 rounded-md border-2 dark:text-white border-black bg-beige shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_grey] text-[17px] font-semibold text-[#323232] transition active:translate-x-[3px] active:translate-y-[3px]"
          >
            Sign in with Google
          </button>
        </a>

        <button
          type="submit"
          className="w-full h-12 rounded-md dark:text-white border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_grey] text-[17px] font-semibold text-[#323232] transition active:translate-x-[3px] active:translate-y-[3px]"
        >
          {isLoading ? 'Loading...' : 'Let’s Log you in →'}
        </button>
      </form>
    </div>
  );
};

export default Login;
