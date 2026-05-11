import {
  FaChartLine,
  FaDesktop,
  FaCog,
  FaShieldAlt,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaChartLine />,
    path: "/dashboard",
  },
  {
    name: "Devices",
    icon: <FaDesktop />,
    path: "/devices",
  },
  {
    name: "Analytics",
    icon: <FaShieldAlt />,
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

export default function Sidebar() {

  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);

  const role =
    localStorage.getItem("role") || "viewer";

  const email =
    localStorage.getItem("email") ||
    "admin@test.com";

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("user");

    localStorage.removeItem("email");

    window.location.href = "/login";

  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#020817] border-r border-slate-800 flex flex-col transition-all duration-300 ${
        collapsed
          ? "w-20"
          : "w-64"
      }`}
    >

      {/* TOP */}
      <div className="flex-1 overflow-y-auto">

        {/* Logo */}
        <div className="h-24 flex items-center px-6 border-b border-slate-800">

          {!collapsed ? (

            <h1 className="text-3xl font-bold text-white">

              Monitor
              <span className="text-blue-500">
                X
              </span>

            </h1>

          ) : (

            <h1 className="text-3xl font-bold text-white">

              M
              <span className="text-blue-500">
                X
              </span>

            </h1>

          )}

        </div>

        {/* MENU */}
        <div className="p-3 space-y-2">

          {menuItems.map((item) => {

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center ${
                  collapsed
                    ? "justify-center"
                    : "gap-4"
                } px-4 py-4 rounded-xl transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >

                <div className="text-lg">
                  {item.icon}
                </div>

                {!collapsed && (

                  <span className="font-medium">
                    {item.name}
                  </span>

                )}

              </Link>
            );
          })}

        </div>

      </div>

      {/* BOTTOM */}
      <div className="p-3 border-t border-slate-800">

        {/* User Card */}
        {!collapsed && (

          <div className="relative mb-3">

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="w-full bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-slate-700 transition"
            >

              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">

                  {role
                    ?.slice(0, 2)
                    .toUpperCase()}

                </div>

                {/* Info */}
                <div className="text-left">

                  <h3 className="text-white font-semibold leading-none">

                    {role
                      ?.charAt(0)
                      .toUpperCase() +
                      role?.slice(1)}

                  </h3>

                  <p className="text-slate-400 text-sm mt-1 truncate max-w-[140px]">

                    {email}

                  </p>

                </div>

              </div>

              <FaChevronDown
                className={`text-slate-400 transition ${
                  menuOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {/* Dropdown */}
            {menuOpen && (

              <div className="absolute bottom-24 left-0 w-full bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl z-50">

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-500/10 text-red-400 transition"
                >

                  <FaSignOutAlt />

                  Logout

                </button>

              </div>

            )}

          </div>

        )}

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="w-full bg-[#0F172A] border border-slate-800 rounded-xl py-3 flex items-center justify-center gap-3 text-slate-400 hover:text-white hover:border-slate-700 transition"
        >

          {collapsed ? (
            <FaAnglesRight />
          ) : (
            <>
              <FaAnglesLeft />
              <span>
                Collapse
              </span>
            </>
          )}

        </button>

      </div>

    </div>
  );
}