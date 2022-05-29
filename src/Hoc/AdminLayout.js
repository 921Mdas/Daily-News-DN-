import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./adminlayout.scss";
import { MyContext } from "../context/context";
import { BsFillPenFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import HomeIcon from "@material-ui/icons/Home";

import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

const AdminLayout = props => {
  const {
    state: { layout },
  } = useContext(MyContext);

  return (
    <>
      <div className={`row adminLayout ${layout}`}>
        <nav className="col-md-2 d-none d-md-block sidebar sidebar_dashboard">
          <div className="UL-dashboard">
            <RouterLink to="/dashboard">
              <h3 className="dash_options dash_title"> DASHBOARD</h3>
            </RouterLink>
            <Divider />
            <RouterLink className="dash_options" to="/home">
              <HomeIcon className="dash_nav_icon dash_home_link" /> <p>Home</p>
            </RouterLink>
            <RouterLink className="dash_options" to="/dashboard/articles">
              <BsFillPenFill className="dash_nav_icon" /> <p>Add article</p>
            </RouterLink>
            {/* <RouterLink className="dash_options" to="/dashboard/profile">
              <CgProfile className="dash_nav_icon" /> <p>Profile</p>
            </RouterLink> */}
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">{props.section}</h1>
          </div>
          {props.children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
