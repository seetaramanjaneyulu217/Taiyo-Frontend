import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const styles = `bg-blue-200 border py-2 rounded-xl text-white font-bold text-center font-roboto`;

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <div className="w-1/5 px-5 py-20 bg-gray-100 h-screen md:flex flex-col gap-y-20 sticky top-0 hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles : "text-center font-roboto"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? styles : "text-center font-roboto"
          }
        >
          Contacts
        </NavLink>
        <NavLink
          to="/charts-and-maps"
          className={({ isActive }) =>
            isActive ? styles : "text-center font-roboto"
          }
        >
          Charts and Maps
        </NavLink>
      </div>

      {/* for smaller devices */}
      <div className="md:hidden">
        {!openMenu && (
          <div className="p-4">
            <RxHamburgerMenu size={24} onClick={() => setOpenMenu(true)} />
          </div>
        )}
        {openMenu && (
          <div
            className={`h-screen w-1/3 fixed bg-gray-100 ${
              openMenu ? "translate-x-0" : "-translate-x-full"
            } transition-all duration-500 transform flex flex-col gap-5 text-xl`}
          >
            <div className="flex justify-start p-5">
              <RxCross1
                className="cursor-pointer"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <div className="flex flex-col gap-y-20">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles : "text-center font-roboto"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? styles : "text-center font-roboto"
                }
              >
                Contacts
              </NavLink>
              <NavLink
                to="/charts-and-maps"
                className={({ isActive }) =>
                  isActive ? styles : "text-center font-roboto"
                }
              >
                Charts and Maps
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
