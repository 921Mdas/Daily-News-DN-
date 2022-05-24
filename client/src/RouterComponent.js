import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";

// importing components
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Hoc/Layout";
import Auth from "./Components/auth/index.auth";
import Dashboard from "./Components/Dashboard/index.dashboard";

import { getAuthHeader } from "./Components/UtilComp/Tools";
import { AUTOSIGN } from "./context/ApiUtil";
import { MyContext } from "./context/context";
import { AUTO_SIGN_URL } from "./context/type";
import Loader from "./Components/UtilComp/Loader";

function RouterComponent() {
  const [Loading, setLoading] = useState(false);
  const {
    dispatch,
    state: { isAuth },
  } = useContext(MyContext);
  // url, header,dispatch

  useEffect(() => {
    AUTOSIGN(AUTO_SIGN_URL, getAuthHeader, dispatch);
    console.log("request sent");
  }, [dispatch]);

  // home page loading...create one
  // useEffect(() => {
  //   if (isAuth === null) {
  //     setLoading(true);
  //   }
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        {Loading ? (
          <Loader />
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Layout>
        )}

        <GoogleFontLoader
          fonts={[
            { font: "Roboto", weights: [300, 400, 900] },
            { font: "Fredoka One" },
          ]}
        />
      </BrowserRouter>
    </>
  );
}

export default RouterComponent;
