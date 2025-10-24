import { useState, useEffect } from 'react';
import Logo from '../../assets/Logo/playcafe.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Google from './footer/Google';
import ThemeToggle from '../../components/ThemeToggle';
import { FiMenu, FiX, FiUser, FiLogOut, FiLogIn } from 'react-icons/fi';

const Navbar = () => {
  const [isloggedIn, setisloggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get('authToken'));
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'EVENTS', path: '/events' },
    { name: 'MENU', path: '/menu' },
    { name: 'RESERVATION', path: '/reservation' },
    { name: 'BOARDGAMES', path: '/boardgame' },
    { name: 'MEMBERSHIP', path: '/membership' },
    { name: 'PROFILE', path: '/dashboard' },
    { name: 'CONTRIBUTORS', path: '/contributors' },
  ];

  useEffect(() => {
    setToken(Cookies.get('authToken'));
  });
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    // setisloggedIn(false); // Set isLoggedIn to false on confirmation
    //managing log in , logout using jwt tokens
    const response = await fetch(`${API_URL}/api/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    Cookies.remove('authToken');
    Cookies.remove('authenticatedUser');
    setToken(null);
    setIsModalOpen(false); // Close the modal
    setIsMenuOpen(false); // after getting logged out close the menu if it is open
    navigate('/login'); //navigate to login after get logged out
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="w-full fixed top-0 z-50 transition-all duration-500">
      {/* Glassmorphism Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50 shadow-2xl'
            : 'bg-transparent'
        }`}
      ></div>

      {/* Animated gradient line */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-500 ${
          isScrolled ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
      ></div>

      <div className="relative z-10 mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
                <img
                  className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-xl border-2 border-white/50 dark:border-gray-700/50 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  alt="PlayCafe Logo"
                  src={Logo}
                  loading="lazy"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  PlayCafe
                </h1>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-1">
              {menuItems.map((item) => (
                <li key={item.name} className="group">
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg overflow-hidden group ${
                      location.pathname === item.path
                        ? 'text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg'
                        : 'text-gray-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {location.pathname !== item.path && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <ThemeToggle />
            </div>

            {token ? (
              <button
                className="group relative px-6 py-2.5 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex items-center space-x-2">
                  <FiLogOut className="w-4 h-4" />
                  <span>LOGOUT</span>
                </div>
              </button>
            ) : (
              <button
                className="group relative px-6 py-2.5 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                onClick={() => navigate('/login')}
              >
                <div className="flex items-center space-x-2">
                  <FiLogIn className="w-4 h-4" />
                  <span>LOGIN</span>
                </div>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 transform ${
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50 shadow-2xl">
          <div className="px-6 py-6 space-y-3">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? 'text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {token ? (
                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>Log In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Logout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-4 shadow-xl">
                  <FiLogOut className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Confirm Logout
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to log out of your account?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
