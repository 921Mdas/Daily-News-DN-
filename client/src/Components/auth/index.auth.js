import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyContext } from "../../context/context";
import "./auth.scss";
import { TextField, Button } from "@material-ui/core";

// urls
import { REGISTER_USER, USER_SIGN_IN } from "../../context/ApiUtil";
import { SIGN_UP_URL, SIGN_IN_URL, AUTH_OK } from "../../context/type";

// this will be a route that will redirect on success
const Auth = props => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const {
    state: { currentUser, isAuth },
    dispatch,
  } = useContext(MyContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email required").email("not a valid email"),
      password: Yup.string().required("password required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async values => {
    try {
      if (register) {
        await values;
        REGISTER_USER(SIGN_UP_URL, values, dispatch);
      } else {
        await USER_SIGN_IN(SIGN_IN_URL, values, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [handleSubmit]);

  return (
    <>
      <div className="auth_container">
        <h1>Authenticate</h1>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="email"
              label="Enter your email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />
            <TextField
              style={{ width: "100%" }}
              name="password"
              label="Enter password"
              type="password"
              variant="outlined"
              {...formik.getFieldProps("password")}
              {...errorHelper(formik, "password")}
            />
            <div className="auth_actions">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className="user_registration"
              >
                {register ? "Register" : "Login"}
              </Button>
              <Button
                className="mt-3"
                variant="outlined"
                color="secondary"
                size="small"
                className="reg_prompt"
                onClick={() => setRegister(!register)}
              >
                Want to{!register ? "Register" : "Login"}?
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
