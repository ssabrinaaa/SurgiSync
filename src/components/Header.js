import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-teal-700 font-semibold" : "text-gray-800";

  return (
    <header className="flex flex-col items-center gap-4 py-6 bg-blue-100 font-manrope">
      <h1 className="text-4xl font-bold">SurgiSync</h1>
      <nav className="flex gap-6 text-lg">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/registerpatient" className={navLinkClass}>
          Register Patient
        </NavLink>
        <NavLink to="/surgicalcases" className={navLinkClass}>
          Surgical Cases
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
