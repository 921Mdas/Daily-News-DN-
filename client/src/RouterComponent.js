import React from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";

// importing components
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Hoc/Layout";
import Auth from "./Components/auth/index.auth";

function RouterComponent() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
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
