import React from "react";
import {
  TextField,
  Button,
  Divider,
  Chip,
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Contact.scss";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      message: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("please enter name"),
      surname: Yup.string().required("please enter surname"),
      message: Yup.string().required("message required"),
      email: Yup.string().required("please enter email"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  return (
    <div className="Contact_us">
      <h3>Contact Us:</h3>
      <form action="" onSubmit={() => formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="name"
            label="Enter a name"
            variant="outlined"
            {...formik.getFieldProps("name")}
            {...errorHelper(formik, "name")}
          />
          <TextField
            style={{ width: "100%" }}
            name="surname"
            label="Enter a surname"
            variant="outlined"
            {...formik.getFieldProps("surname")}
            {...errorHelper(formik, "surname")}
          />
          <TextField
            style={{ width: "100%" }}
            name="message"
            label="Enter message"
            variant="outlined"
            {...formik.getFieldProps("message")}
            {...errorHelper(formik, "message")}
          />
          <TextField
            style={{ width: "100%" }}
            name="email"
            label="Enter email"
            variant="outlined"
            {...formik.getFieldProps("email")}
            {...errorHelper(formik, "email")}
          />
          <Button variant="contained" className="contact_btn">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
