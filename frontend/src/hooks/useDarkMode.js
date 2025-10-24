import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

export default useDarkMode;
