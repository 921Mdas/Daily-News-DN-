import React, { useState, useContext } from "react";
import axios from "axios";
import { showToast, NOTIFTYPE } from "../Components/UtilComp/Tools";
import { MyContext } from "./context";
import { GET_CURRENT_USER } from "./type";
// articles post request
axios.defaults.headers.post["Content-Type"] = "application/json";

export const AXIOSPOST = async (url, sort) => {
  try {
    const response = await axios.post(url, {
      params: { num: sort },
    });
    const data = await response.data;
    showToast(NOTIFTYPE.success, "successful API request");
    return data;
  } catch (error) {
    // link between front and back is where to show notifs
    showToast(NOTIFTYPE.error, "oops something went wrong");
    console.log("error happening here", error);
    if (error) throw error;
  }
};
const REGISTER_USER = async (url, values, dispatch) => {
  try {
    const user = await axios.post(
      url,
      { withCredentials: true },
      {
        email: values.email,
        password: values.password,
      }
    );
    await showToast(NOTIFTYPE.success, `welcome ${user.data.email}`);
    // dispatch
    await dispatch({ type: GET_CURRENT_USER, payload: user.data });
    // update current user
  } catch (error) {
    console.log(error);
    showToast(NOTIFTYPE.error, "oops couldnt register");
    if (error) throw error;
  }
};

export { REGISTER_USER };

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
