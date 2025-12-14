import React from 'react';

const CardBtn = ({ label = "View Details", className = "" }) => {

    const base = "w-full bg-gradient-to-r from-[#102347] to-[#23365c] text-white py-2 rounded-full font-semibold shadow hover:scale-105 transition";

    return (
        <button className={` ${base} ${className}`}>
            {label}
        </button>
    );

};

export default CardBtn;