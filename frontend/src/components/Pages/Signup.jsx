import { useState, useEffect } from 'react';
import photo from '../../assets/login-opt.png';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import zxcvbn from 'zxcvbn'; // Password strength checker

const Signup = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [data, setData] = useState({ name: '', email: '', password: '', file: '' });
  const [hidden, setHidden] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      const result = zxcvbn(e.target.value);
      setPasswordStrength(result.score);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Input validation
    if (!data.email || !data.password || !data.name) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    if (data.name.length < 3) {
      setError('Name must be at least 3 characters long');
      setIsLoading(false);
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(data.name)) {
      setError('Name must contain only letters and spaces');
      setIsLoading(false);
      return;
    }
    if (!data.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(result.error);
        return;
      }
  

      alert('OTP sent to your email. Verify to complete registration.');
      navigate('/otp-verify');
  
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset after request
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPasswordStrengthColor = (score) => {
    const colors = ['#ff4d4d', '#ff944d', '#ffd24d', '#d2ff4d', '#4dff88'];
    return colors[score];
  };

  const getPasswordStrengthText = (score) => {
    const strengthLevels = ['Very Weak', 'Weak', 'Okay', 'Good', 'Strong'];
    return strengthLevels[score];
  };

  return (
    <div className="w-screen h-screen pt-10 flex items-center justify-center dark:text-white dark:bg-black overflow-hidden">
      <img 
      src={photo} 
      alt="login"
      loading="lazy"
      className="w-3/4 max-w-xs lg:max-w-2xl lg:w-1/2 object-contain mb-6 lg:mb-0" 
      />

      <form className="z-10 p-8 lg:p-16 bg-[#f1e9dc] dark:bg-amber-800 dark:text-white flex flex-col gap-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] dark:shadow-[4px_4px_0px_0px_grey] w-full max-w-md lg:max-w-lg">
        <div className="text-[#323232] dark:text-white font-black text-3xl lg:text-5xl mb-2">
          Play Cafe,
          <br />
          <span className="block text-[#666] dark:text-gray-400 font-semibold text-xl sm:text-2xl">
            Register to continue
          </span>
        </div>
        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige p-2.5 shadow-[4px_4px_0px_0px_black] focus:outline-none dark:bg-slate-800 dark:placeholder-white"
          name="name"
          placeholder="Name"
          type="text"
          onChange={handleChange}
        />
        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige p-2.5 shadow-[4px_4px_0px_0px_black] focus:outline-none dark:bg-slate-800 dark:placeholder-white"          
          name="file"
          placeholder="Upload Image"
          type="file"
          onChange={handleChange}
        />
        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige p-2.5 shadow-[4px_4px_0px_0px_black] focus:outline-none dark:bg-slate-800 dark:placeholder-white"
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <div className="relative w-full">
          <input
            className="input w-full h-10 rounded-md border-2 border-black bg-beige p-2.5 shadow-[4px_4px_0px_0px_black] focus:outline-none dark:bg-slate-800 dark:placeholder-white"
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
        <div className="w-full mt-2">
          <div 
          className="h-2 rounded-full" 
          style={{ backgroundColor: getPasswordStrengthColor(passwordStrength), 
          width: `${(passwordStrength + 1) * 20}%` 
          }}
          ></div>
          <p className="text-sm text-[#666] dark:text-gray-200 mt-1">
            Strength: {getPasswordStrengthText(passwordStrength)}
          </p>
        </div>
        {error && (
          <div className="w-full p-2 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {error}
          </div>
        )}
        <h3 className="flex justify-between w-full">
          Already have an account?
          <Link
            to="/login"
            className="text-[#666] dark:text-white font-semibold hover:text-green-500"
          >
            Login
          </Link>
        </h3>

        <a href={`${API_URL}/api/user/auth/google`} className="w-full">
          <button className="button-confirm w-full h-10 rounded-md border-2 border-black bg-beige text-[17px] font-semibold shadow-[4px_4px_0px_0px_black] hover:text-green-300">
            Sign up with Google
          </button>
        </a>
        <button
          className="button-confirm w-full h-10 rounded-md border-2 border-black bg-beige text-[17px] font-semibold shadow-[4px_4px_0px_0px_black] mb-2 hover:text-green-300"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : "Let's go →"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
