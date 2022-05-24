import React, { useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../context/context";
import { CHANGE_LAYOUT } from "../../context/type";

const Navbar = () => {
  const { pathname } = useLocation();
  const { dispatch } = useContext(MyContext);
  const currentLocation = pathname.split("/")[1];

  useEffect(() => {
    if (currentLocation === "dashboard") {
      dispatch({ type: CHANGE_LAYOUT, payload: currentLocation });
    }
  }, [pathname]);

  return (
    <div className="navbar">
      <Link to="/home" className="navbar-brand d-flex align-items-center">
        DashNews
      </Link>
      <Sidebar />
    </div>
  );
};

export default Navbar;
