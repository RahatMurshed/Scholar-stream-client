// ScholarStreamNavbarButton.jsx
import React from "react";

const ScholarStreamNavbarButton = ({ label = "Register", variant = "primary", className = "" }) => {
  const base =
    "inline-flex items-center justify-center px-4 py-1.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-300";

  const variants = {
    primary:
   
      " text-white bg-gradient-to-r from-[#102347] to-[#23365c] " +
      "shadow-[0_6px_20px_rgba(16,35,71,0.25)] hover:shadow-[0_8px_28px_rgba(16,35,71,0.35)] hover:scale-[1.03]",
    outline:
     
     
      " text-[#102347] text-[15px] font-bold " 
      ,
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </button>
  );
};

export default ScholarStreamNavbarButton;