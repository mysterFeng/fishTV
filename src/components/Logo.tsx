import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <circle cx="12" cy="12" r="12" fill="#c63232" />
        <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-xl font-bold freeok-logo">FREEOK</span>
    </div>
  );
};

export default Logo;
