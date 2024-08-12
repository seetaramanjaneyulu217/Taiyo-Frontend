import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="w-1/5 py-20 bg-gray-100 h-screen flex flex-col gap-y-20">
        <Link to="/" className={`${location.pathname === '/' ? 'bg-blue-200 border py-2 rounded-xl text-white font-bold' : ''} text-center font-semibold`}>
          Home
        </Link>
        <Link to="/contacts" className={`${location.pathname === '/contacts' ? 'bg-blue-200 border py-2 rounded-xl text-white font-bold' : ''} text-center font-semibold`}>
          Contacts
        </Link>
        <Link to="/charts-and-maps" className={`${location.pathname === '/charts-and-maps' ? 'bg-blue-200 border py-2 rounded-xl text-white font-bold' : ''} text-center font-semibold`}>
          Charts and Maps
        </Link>
    </div>
  );
};

export default Sidebar;
