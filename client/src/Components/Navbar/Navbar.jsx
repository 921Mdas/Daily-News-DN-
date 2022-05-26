import React, { useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../context/context";
import { CHANGE_LAYOUT } from "../../context/type";
import { SiDesignernews } from "react-icons/si";
import { BsFillPersonFill } from "react-icons/bs";

// material ui
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//

import "./Navigation.scss";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    dispatch,
    state: { isAuth, currentUser },
  } = useContext(MyContext);
  const currentLocation = pathname.split("/")[1];

  // console.log(isAuth, currentUser);

  useEffect(() => {
    if (currentLocation === "dashboard") {
      dispatch({ type: CHANGE_LAYOUT, payload: currentLocation });
    }
  }, [pathname]);

  return (
    <div className="navbar navigation_bar">
      <Link to="/home" className="navbar-brand d-flex align-items-center">
        <SiDesignernews className="logo-icon" />
      </Link>

      {isAuth ? (
        <div className="nav_personalInfo">
          <p>
            Signed is as <strong>{currentUser.email}</strong>
          </p>
          <div className="nav_avatar">
            <BsFillPersonFill className="nav_personicon" />
          </div>
        </div>
      ) : null}

      <Sidebar />
    </div>
  );
};

export default Navbar;
