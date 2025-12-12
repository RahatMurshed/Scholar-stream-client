import React from 'react';
import Button from './Button';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router';
const Navbar = () => {

    const links = <>
     <li><NavLink>Home</NavLink></li>
     <li><NavLink>All Scholarships</NavLink></li>
    </>

    return (
       <div className="navbar ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content   bg-base-100 rounded-box z-1 mt-3 w-52 p-2 font-semibold shadow font-serif">
        {links}
      </ul>
    </div>
   <div >
    <Link><img className='w-45 md:w-50 h-28 -ml-7 ' src={logo} alt="logo" /></Link>
   </div>
  </div>

  <div className="navbar-center  hidden lg:flex items-center">
    <ul className="flex px-5 space-x-8 flex-wrap font-semibold text-[15px]  text-[#102347] hover:scale-105 transition-all duration-300 ease-in-out">
     {links}
    </ul>
  </div>
  
  <div className="navbar-end ">
    
    <Button className='hover:scale-110 hover:underline' label="Login" variant="outline"></Button>
    <Button label="Register" variant="primary"></Button>
  </div>
</div>
    );
};

export default Navbar;