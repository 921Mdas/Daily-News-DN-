import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        DashNews
      </Link>
      <Sidebar />
    </div>
  );
};

export default Navbar;
