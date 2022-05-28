import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyContext } from "../../context/context";
import "./auth.scss";
import { TextField, Button, Slide } from "@material-ui/core";

import { Divider } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { SiDesignernews } from "react-icons/si";

// images import
import im5 from "../../multimedia/img5.jpeg";
import im6 from "../../multimedia/img6.jpeg";
import im3 from "../../multimedia/img3.jpeg";
import im7 from "../../multimedia/img7.avif";
import doodle1 from "../../multimedia/doodle1.png";
import doodle2 from "../../multimedia/doodle2.png";
import doodle3 from "../../multimedia/doodle3.png";

// urls
import { REGISTER_USER, USER_SIGN_IN } from "../../context/apiUtil";
import { SIGN_UP_URL, SIGN_IN_URL, AUTH_OK } from "../../context/type";

const SliderData = [
  {
    id: "sdndmasda",
    image: im5,
    headline:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard",
    author: "Author",
    author_description: "welcome back",
  },
  {
    id: "jksndakdjasu2",
    image: im6,
    headline:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard",
    author: "Author",
    author_description: "welcome back",
  },
  {
    id: "8udas8udajkqi7b",
    image: im7,
    headline:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard",
    author: "Author",
    author_description: "welcome back",
  },
];

// this will be a route that will redirect on success
const Auth = props => {
  const [register, setRegister] = useState(true);
  const location = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  const {
    state: { currentUser, isAuth, registered },
    dispatch,
  } = useContext(MyContext);
  const [moveleft, setMoveLeft] = useState(false);
  let [counter, setUseCounter] = useState(1);

  const moveSlider = () => {
    setMoveLeft(true);
    if (counter === SliderData.length - 1) {
      setUseCounter(0);
    } else {
      setUseCounter((counter += 1));
    }
  };

  //  const handleLogin = async (googleData)=>{
  //  const res = await fetch('http://localhost:3001/user/google-login',{
  //    method:"POST",
  //    body:JSON.stringify({token:googleData.tokenId}),
  //     headers:{
  //    'Content-Type':'application/json',
  //  }
  //  })

  const handleLogin = () => {
    // console.log("hello");
  };

  const handleFailure = err => {
    console.log(err);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    // setLoginData(null);
  };

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
        setRegister(!register);
      } else {
        await USER_SIGN_IN(SIGN_IN_URL, values, dispatch);
        await dispatch({ type: AUTH_OK });
        localStorage.setItem("auth", isAuth);
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

  // loggin in okay
  useEffect(() => {
    if (isAuth && location === "") {
      navigate("/home");
    }
  }, [handleSubmit]);

  // slider

  return (
    <>
      <div className="auth_container">
        <div className="registration_slider_section">
          <div className="reg_action_btns">
            <button className="reg_slides_btn" onClick={() => moveSlider()}>
              →
            </button>
          </div>
          <div className="reg_images">
            {SliderData.map((info, idx) => {
              return (
                <div
                  className="reg_img_content3"
                  key={info.id}
                  style={{
                    transform: `translateX(${(idx - counter) * 100}%)`,
                  }}
                >
                  <h3 className="reg_content_headline">{info.headline}</h3>
                  <div className="overlay"></div>
                  <img className="reg_slider_img" src={info.image} alt="" />

                  <div className="reg_page_author">
                    <h5>{info.author}</h5>
                    <p>{info.author_description}</p>
                  </div>
                </div>
              );
            })}
            <div className="reg_dots-container">
              <SliderDots counter={counter} />
            </div>
          </div>
        </div>

        <div className="registration_section">
          <div className="login_page_content">
            <div>
              <SiDesignernews className="welcome_logo_show" />
            </div>
            <h3 className="login_title">
              {register ? `Welcome` : "Welcome Back"}
            </h3>
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
                    color="primary"
                    size="small"
                    className="reg_prompt"
                    onClick={() => setRegister(!register)}
                  >
                    {!register
                      ? "Don't have an account? SIGN UP"
                      : "Already have an account? SIGN IN"}
                  </Button>
                  <Divider />

                  <GoogleLogin
                    className="login-googleBtn"
                    clientId={
                      "772173664744-lr5pa17sih47aeb539m8svtht2v2oe1v.apps.googleusercontent.com"
                    }
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={"single_host_origin"}
                  ></GoogleLogin>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const SliderDots = ({ counter }) => {
  return SliderData.map((el, idx) => {
    return (
      <button
        key={idx}
        className={`reg_slider_dot ${counter === idx ? "active" : null} `}
      ></button>
    );
  });
};

export default Auth;
