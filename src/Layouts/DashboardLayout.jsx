
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaUser, FaBars, FaUserEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from '../assets/darkLogo.png'
import { FaToggleOn } from "react-icons/fa";

import { BsToggleOff } from "react-icons/bs";
import { HiDocumentAdd } from "react-icons/hi";
import { SiGoogleanalytics } from "react-icons/si";
import useRoles from "../Hooks/useRoles";





const DashboardLayout = () => {
  const { role } = useRoles();
  // console.log(role)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // sidebar open/close

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:static top-0 left-0 h-full md:h-auto z-40 
        bg-gradient-to-b from-[#102347] to-[#23365c] text-white flex flex-col 
        transition-transform duration-300 ease-in-out 
        ${isCollapsed ? "w-15" : "w-60"}`}
      >
        {/* Logo / Collapse Button */}
        <div className="flex items-center justify-between h-20 border-b border-white/20 px-4">
          {!isCollapsed && (
            <Link to='/'>
              <img className="w-40" src={logo} alt="" />
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:text-emerald-400"
          >
            {isCollapsed ? <BsToggleOff className="w-6 h-6" /> : <FaToggleOn className="w-6 h-6" />}
          </button>
        </div>

        {/* NavLinks */}
        <nav className="flex-1 px-2 py-6 space-y-4">
          <NavLink
            to="/dashboard/dashboard-home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                ? "bg-white text-[#102347]"
                : "hover:bg-white/20 hover:text-indigo-200"
              }`
            }

          >
            <FaUser className="w-6 h-6" />
            {!isCollapsed && "My Profile"}
          </NavLink>

          {
            role === 'Student' && <>


              <NavLink
                to="/dashboard/my-applications"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <IoDocuments className="w-6 h-6" />
                {!isCollapsed && "My Applications"}
              </NavLink>

              <NavLink
                to="/dashboard/my-reviews"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <FaStar className="w-6 h-6" />
                {!isCollapsed && "My Reviews"}
              </NavLink>
            </>
          }

          {
            role === 'Moderator' && <>


              <NavLink
                to="/dashboard/manage-applications"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <IoDocuments className="w-6 h-6" />
                {!isCollapsed && "Manage Applications"}
              </NavLink>


              <NavLink
                to="/dashboard/all-reviews"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <FaStar className="w-6 h-6" />
                {!isCollapsed && "All Reviews"}
              </NavLink>
            </>
          }

          {
            role === 'Admin' && <>
            

              <NavLink
                to="/dashboard/add-scholarship"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <HiDocumentAdd className="w-6 h-6" />

                {!isCollapsed && "Add Scholarship"}
              </NavLink>

              <NavLink
                to="/dashboard/manage-scholarships"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <IoDocuments className="w-6 h-6" />
                {!isCollapsed && "Manage Scholarships"}
              </NavLink>
              <NavLink
                to="/dashboard/manage-user"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <FaUserEdit className="w-6 h-6" />
                {!isCollapsed && "Manage User"}
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${isActive
                    ? "bg-white text-[#102347]"
                    : "hover:bg-white/20 hover:text-indigo-200"
                  }`
                }

              >
                <SiGoogleanalytics className="w-6 h-6" />
                {!isCollapsed && "Analytics"}
              </NavLink>
            </>
          }
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar with Toggle Button */}
        <header className={`flex items-center justify-between lg:justify-center  bg-[#102347] text-white px-4 py-3 shadow`}>
          <div className={`lg:hidden ${isOpen ? "ml-15 md:ml-0" : "ml-0"}`}>
            <button onClick={() => setIsOpen(!isOpen)}>
              {
                isOpen ? <FaChevronRight /> : <FaChevronLeft />
              }
            </button>
          </div>
          <div className=""><h1 className="">ScholarStream Dashboard</h1></div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;