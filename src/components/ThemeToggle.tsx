import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
      aria-label={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
    >
      <div className="icon-container" style={{ 
        transform: isDarkMode ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s ease-in-out'
      }}>
        {isDarkMode ? '☀️' : '🌙'}
      </div>
    </button>
  );
};

export default ThemeToggle; 