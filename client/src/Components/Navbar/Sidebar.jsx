import React, { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/context";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";

import DehazeIcon from "@material-ui/icons/Dehaze";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DashboardIcon from "@material-ui/icons/Dashboard";

// signout
import { USER_SIGN_OUT } from "../../context/apiUtil";
import { SIGN_OUT } from "../../context/type";

const Sidebar = () => {
  const [state, setState] = useState(false);
  const { dispatch, state: appState } = useContext(MyContext);
  const { isAuth } = appState;

  const SigninOut = () => {
    setState(false);
    USER_SIGN_OUT();
    dispatch({ type: SIGN_OUT });
  };

  return (
    <>
      <DehazeIcon className="drawer_btn" onClick={() => setState(true)} />
      <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
        <form>
          <TextField
            id="outlined-basic"
            label="Search articles"
            variant="outlined"
            style={{ margin: "20px" }}
          />
        </form>
        <Divider />
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/"
            onClick={() => setState(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/contact"
            onClick={() => setState(false)}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          {isAuth ? (
            <ListItem
              button
              component={RouterLink}
              to="/"
              onClick={() => SigninOut()}
            >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          ) : (
            <ListItem
              button
              component={RouterLink}
              to="/"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {isAuth ? (
            <ListItem
              button
              component={RouterLink}
              to="/dashboard"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
