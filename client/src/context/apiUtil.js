import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import { showToast, NOTIFTYPE } from "../Components/UtilComp/Tools";
import { MyContext } from "./context";
import { getAuthHeader } from "../Components/UtilComp/Tools";
import { setDataLocalStorage } from "../Components/UtilComp/Tools";
import {
  GET_CURRENT_USER,
  SIGN_IN_OK,
  AUTH_OK,
  AUTH_NOT_OK,
  SIGN_OUT,
  DELETE_ARTICLE_URL,
} from "./type";

import { userDefault } from "./context";
// articles post request
axios.defaults.headers.post["Content-Type"] = "application/json";

export const AXIOSPOST = async (url, sort) => {
  try {
    const response = await axios.post(url, {
      params: { num: sort },
    });
    const data = await response.data;
    // console.log("articles received", data);
    showToast(NOTIFTYPE.success, "api success!");
    // setDataLocalStorage("articles", data);
    return data;
  } catch (error) {
    // link between front and back is where to show notifs
    showToast(NOTIFTYPE.error, "Connection failed");
    console.log("Api request", error);
    if (error) throw error;
  }
};
const REGISTER_USER = async (url, values, dispatch) => {
  try {
    const user = await axios.post(url, {
      email: values.email,
      password: values.password,
    });

    // express error feedback is stored on error.response.data.message
    // expected token
    const {
      data: { createdUser, token },
    } = user;

    // store token in localstorage and use it in header for next request or signin to see if user exists
    // console.log("yey we got the token", token);

    await showToast(NOTIFTYPE.success, `account created ${createdUser.email} `);
    // dispatch
    await dispatch({ type: GET_CURRENT_USER, payload: createdUser });
    // update current user
  } catch (error) {
    console.log("registration error", error);
    showToast(NOTIFTYPE.error, error.response.data.message);
    if (error) throw error;
  }
};
const USER_SIGN_IN = async (url, values, dispatch) => {
  try {
    const user = await axios.post(url, {
      email: values.email,
      password: values.password,
    });

    // get token on sign in
    const userData = user.data.AuthUser;
    const receivedToken = await user.data.token;

    if (receivedToken) {
      await localStorage.setItem("tokenAuth", receivedToken);
    }

    await showToast(NOTIFTYPE.success, `welcome ${userData.email} `);
    // dispatch
    await dispatch({ type: SIGN_IN_OK, payload: userData });
    // authenticate client

    // update current user in state
  } catch (error) {
    console.log(error);
    showToast(NOTIFTYPE.error, error.response.data.message);
    if (error) throw error;
  }
};

const USER_SIGN_OUT = () => {
  localStorage.clear();
};

// const AUTOSIGN = async (url, headers, dispatch) => {
//   try {
//     // this is how you add a header
//     const AuthUser = await axios.get(url, headers);
//     const currentUser = AuthUser.data;
//     dispatch({ type: AUTH_OK, payload: currentUser });
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: SIGN_OUT });
//     // notification
//   }
// };

const CREATE_ARTICLE = async (url, formdata, headers) => {
  // verify token on every activity
  try {
    const response = await axios.post(url, formdata, { headers });
    const data = await response.data;
    showToast(NOTIFTYPE.success, "Success!");
    return data;
  } catch (error) {
    // link between front and back is where to show notifs
    showToast(NOTIFTYPE.error, error.response.data.message);
    console.log("error happening here", error);
    if (error) throw error;
  }
};

const DELETE_ARTICLE = async id => {
  try {
    await axios.post(`${DELETE_ARTICLE_URL}${id}`);
    showToast(NOTIFTYPE.success, "Success!");
  } catch (error) {
    showToast(NOTIFTYPE.error, error.response.data.message);
    console.log("delete error", error);
  }
};

export {
  REGISTER_USER,
  USER_SIGN_IN,
  // AUTOSIGN,
  USER_SIGN_OUT,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< go back
// export const AXIOSPOST = async (url) => {
//   try {
//     const response = await axios.get(url);
//     const data = await response.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//     if (error) throw error;
//   }
// };
