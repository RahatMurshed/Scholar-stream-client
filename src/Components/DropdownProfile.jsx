import React from 'react';
import useAuth from '../Contexts/useAuth';

const DropdownProfile = () => {

    const {user} = useAuth();

    return (
       <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border-3 border-emerald-500 shadow-sm shadow-emerald-400">
          <img
            alt="User photo"
            src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
       
      </ul>
    </div>
    );
};

export default DropdownProfile;