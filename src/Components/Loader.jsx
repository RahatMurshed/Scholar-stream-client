import React from "react";
import { motion } from "framer-motion";
import logo from '../assets/smallLightLogo.png'


const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative flex flex-col items-center">
        {/* Animated concentric rings */}
        <motion.div
          className="w-28 h-28 rounded-full border-4 border-[#102347] absolute"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-[#23365c] absolute"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />

        {/* ScholarStream Icon (stylized book) */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          
        >
          <img className="relative w-20 text-white font-serif" src={logo} alt="" />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-15 text-[#102347] font-serif text-lg tracking-wide"
        >
          ScholarStream is preparing your experience...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;