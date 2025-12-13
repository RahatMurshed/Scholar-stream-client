import React from "react";
import { Link } from "react-router";
import logo from '../../assets/smallDarkLogo.png'

const Footer = () => {
  return (
    <footer className="bg-[#102347] text-white  mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + About */}
        <div>
          <div className="flex items-center  mb-4">
            <img
              src={logo}
              alt="ScholarStream Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold">ScholarStream</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            ScholarStream helps students discover and apply for scholarships with ease, 
            offering a premium, recruiter-ready experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
            <li><Link to="/scholarships" className="hover:text-emerald-400">All Scholarships</Link></li>
            <li><Link to="/dashboard" className="hover:text-emerald-400">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-emerald-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-emerald-400">Register</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <p className="text-gray-300 text-sm mb-4">
            Email: support@scholarstream.com
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-400">Facebook</a>
            <a href="#" className="hover:text-emerald-400">Twitter</a>
            <a href="#" className="hover:text-emerald-400">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6">
        <p className="text-center text-gray-400 text-sm py-4">
          © {new Date().getFullYear()} ScholarStream. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;