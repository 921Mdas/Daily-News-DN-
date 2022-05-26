import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";

// importing components
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Hoc/Layout";
import Auth from "./Components/auth/index.auth";
import Article from "./Components/Dashboard/articles/dashboard.article";
import Dashboard from "./Components/Dashboard/index.dashboard";
import Footer from "./Components/Navbar/Footer";
import AddArticle from "./Components/Dashboard/articles/dashboard.articles";
import { AuthguardAdmin, AuthguardUser } from "./Hoc/Authguard";

import { getAuthHeader } from "./Components/UtilComp/Tools";
import { AUTOSIGN } from "./context/ApiUtil";
import { MyContext } from "./context/context";
import { AUTO_SIGN_URL } from "./context/type";
import Loader from "./Components/UtilComp/Loader";

function RouterComponent() {
  const [Loading, setLoading] = useState(false);
  const { dispatch, state } = useContext(MyContext);
  // url, header,dispatch

  // useEffect(() => {
  //   AUTOSIGN(AUTO_SIGN_URL, getAuthHeader, dispatch);
  // }, [dispatch]);

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
              <Route path="/home" element={AuthguardAdmin(<Home />)} />
              <Route
                path="/dashboard"
                element={AuthguardAdmin(<Dashboard state={state} />)}
              />
              <Route
                path="/dashboard/articles"
                element={AuthguardAdmin(<AddArticle />)}
              />
              <Route path="/article/:id" element={<Article state={state} />} />
              <Route
                path="/dashboard/profile"
                element={AuthguardAdmin(<Dashboard />)}
              />
              <Route path="/" element={<Auth />} />
            </Routes>
          </Layout>
        )}

        <GoogleFontLoader
          fonts={[
            { font: "Roboto", weights: [300, 400, 900] },
            { font: "Roboto" },
          ]}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default RouterComponent;
