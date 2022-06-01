import React, { useState, useEffect, useContext } from "react";
import {
  useNavigate,
  Redirect,
  Navigate,
  NavigationType,
} from "react-router-dom";
import { MyContext } from "../context/context";
import Auth from "../Components/auth/index.auth";

const AuthguardAdmin = composedComponent => {
  const {
    state: { isAuth, currentUser },
  } = useContext(MyContext);

  if (isAuth) {
    return <div>{composedComponent}</div>;
  } else if (!isAuth) {
    return <Auth />;
  } else {
    return <Auth />;
  }
};

export { AuthguardAdmin };
