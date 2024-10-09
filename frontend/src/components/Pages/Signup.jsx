import { useState , useEffect } from "react";
import photo from "../../assets/login.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add input validation
    if (!data.email || !data.password || !data.name) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (data.name.length < 3) {
      setError("Name must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    if (!data.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(result.error);
        return;
      }

      // Handle successful registration
      alert("Registered successfully! Please log in.");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center pt-10">
      <img src={photo} alt="login" className=" w-3/4 absolute" />
      <form className="form z-10 p-16 bg-lightblue flex flex-col items-start justify-center gap-5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] bg-[#f1e9dc]">
        <div className="title text-[#323232] font-black text-7xl mb-6">
          Play Cafe,
          <br />
          <span className="block text-[#666] font-semibold text-2xl ">
            Register to continue
          </span>
        </div>
        <label htmlFor="name" className="sr-only"></label>
        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="name"
          placeholder="Name"
          type="name"
          autoComplete="name"
          aria-required="true"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="email" className="sr-only"></label>
        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="email"
          placeholder="Email"
          autoComplete="email"
          type="email"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password" className="sr-only"></label>
        <input
          className="input w-full h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[15px] font-semibold text-[#323232] p-2.5 focus:outline-none focus:border-[#2d8cf0] placeholder-[#666] placeholder-opacity-80"
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => handleChange(e)}
        />
        {error && (
          <div className="w-full p-2 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {error}
          </div>
        )}
        <button
          className="button-confirm mx-auto mt-12 px-4 w-30 h-10 rounded-md border-2 border-black bg-beige shadow-[4px_4px_0px_0px_black] text-[17px] font-semibold text-[#323232] cursor-pointer active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          onClick={(e) => handleSubmit(e)}
        >
          {isLoading ? "Loading..." : "Let's go →"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
