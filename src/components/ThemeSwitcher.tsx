"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaRegSun, FaRegMoon } from "react-icons/fa";

function ThemeSwitcher() {
  const [storedTheme, setStoredTheme] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(true); // default to light theme
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  // Fetch theme from localStorage and set initial theme
  useEffect(() => {
    const theme = window.localStorage.getItem('prefered-theme');
    if (theme) {
      setStoredTheme(theme);
      setIsLight(theme === 'lightTheme');
    }
  }, []);

  // Function to switch to light theme
  const setLightTheme = () => {
    setIsLight(true);
    window.localStorage.setItem('prefered-theme', 'lightTheme');
    document.documentElement.classList.remove('dark');
  };

  // Function to switch to dark theme
  const setDarkTheme = () => {
    setIsLight(false);
    window.localStorage.setItem('prefered-theme', 'darkTheme');
    document.documentElement.classList.add('dark');
  };

  // Update the theme class on the document when storedTheme changes
  useEffect(() => {
    if (storedTheme === 'darkTheme') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [storedTheme]);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate half of the container's width, assuming buttons are evenly spaced
      const containerWidth = containerRef.current.offsetWidth;
      setTranslateX((containerWidth / 2.30)); // Adjust this to center the highlight as desired
    }
  }, [containerRef]);

  return (
    <div
      className=' theme-switcher text-info border-4 border-border rounded-full m-auto relative'
      ref={containerRef}
    >
      <div
        className={`absolute w-[50%] h-full bg-border/50 border-2 border-border rounded-full transition-all duration-300 ease-in-out m-auto z-10`}
        style={{
          transform: `translateX(${isLight ? translateX : 0}px)`,
        }}
      />
      <button
        type='button'
        className={`dark-mode-switch border-none cursor-pointer 
          text-border z-20  p-1`}
        onClick={setDarkTheme}
      >
        <FaRegMoon color='blue' size={20} />
      </button>
      <button
        type='button'
        className={`light-mode-switch cursor-pointer 
          text-border border-none z-20 p-1`}
        onClick={setLightTheme}
      >
        <FaRegSun color='goldenrod' size={20} />
      </button>
    </div>
  );
}
export default ThemeSwitcher;