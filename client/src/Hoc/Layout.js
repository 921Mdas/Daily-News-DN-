import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = props => {
  return (
    <Container>
      {props.children}
      <ToastContainer
        pauseOnFocusLoss
        draggable
        pauseOnHover
        autoClose={3000}
      />
    </Container>
  );
};

export default Layout;
