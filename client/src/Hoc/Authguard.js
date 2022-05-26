import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Redirect, Navigate } from "react-router-dom";
import { MyContext } from "../context/context";
import Auth from "../Components/auth/index.auth";

const AuthguardAdmin = composedComponent => {
  const {
    state: { isAuth, currentUser },
  } = useContext(MyContext);

  if (isAuth !== null) {
    return <div>{composedComponent}</div>;
  } else {
    return <div>{composedComponent}</div>;
    // return <Auth />;
  }
};

export { AuthguardAdmin };
