import React from "react";
import { Link, useLocation } from "react-router-dom";

const styles = `bg-blue-200 border py-2 rounded-xl text-white font-bold`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-1/5 px-5 py-20 bg-gray-100 h-screen flex flex-col gap-y-20 sticky top-0">
      <Link
        to="/"
        className={`${
          location.pathname === "/" ? styles : ""
        } text-center font-roboto`}
      >
        Home
      </Link>
      <Link
        to="/contacts"
        className={`${
          location.pathname === "/contacts" ? styles : ""
        } text-center font-roboto`}
      >
        Contacts
      </Link>
      <Link
        to="/charts-and-maps"
        className={`${
          location.pathname === "/charts-and-maps" ? styles : ""
        } text-center font-roboto`}
      >
        Charts and Maps
      </Link>
    </div>
  );
};

export default Sidebar;
