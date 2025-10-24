import { FaSun, FaMoon } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';
import '../../src/index.css';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useDarkMode();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex justify-center items-center mt-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isDarkMode}
          onChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
        />

        {/* Track */}
        <span
          className={`block w-16 h-8 bg-gray-300 rounded-full shadow-inner transition duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
        ></span>

        {/* Moon Icon for Light Mode */}
        <FaMoon
          className={`absolute left-1 w-5 h-5 text-gray-700 transform transition-all duration-300 ${
            isDarkMode ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        />

        {/* Sun Icon for Dark Mode */}
        <FaSun
          className={`absolute right-1 w-5 h-5 text-gray-100 transform transition-all duration-300 ${
            isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        />

        {/* Slider (Knob) */}
        <span
          className={`absolute w-7 h-7 bg-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}
        ></span>

        {/* Font Awesome Icon as Logo inside a rounded circle */}
        <div
          className={`absolute w-8 h-8 bg-white rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ease-in-out transform ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}
        >
          {isDarkMode ? (
            <FaMoon className="w-5 h-5 text-gray-800" />
          ) : (
            <FaSun className="w-5 h-5 text-gray-800" />
          )}
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
