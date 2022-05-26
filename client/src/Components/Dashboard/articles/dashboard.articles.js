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

import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { CREATE_ARTICLE_URL } from "../../../context/type";
import { CREATE_ARTICLE } from "../../../context/ApiUtil";
import { getAuthHeader } from "../../UtilComp/Tools";
import WYSIWYG from "./WYSWYG";

import * as Yup from "yup";
import AddIcon from "@material-ui/icons/Add";

const AddArticle = props => {
  return (
    <AdminLayout section="Add article">
      add article
      <ArticleForm />
    </AdminLayout>
  );
};

const ArticleForm = () => {
  const validation = () => {
    return Yup.object({
      title: Yup.string().required("Sorry the title is required"),
      content: Yup.string()
        .min(0, "That is it ? ...write some more")
        .required("Sorry the content is required"),
      excerpt: Yup.string()
        .required("Sorry the excerpt is required")
        .max(500, "Sorry its 500 max"),
      score: Yup.number()
        .required("Sorry the score is required")
        .min(0, "0 is the minimum")
        .max(100, "100 is the max"),
      director: Yup.string().required("Sorry the director is required"),
      actors: Yup.array().required("Must have actors").min(3, "Minimum is 3"),
      status: Yup.string().required("Sorry the status is required"),
    });
  };
  const handleEditorState = state => {
    formik.setFieldValue("content", state, true);
  };

  const handleEditorBlur = blur => {
    setEditorBlur(true);
  };

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  const formValues = {
    title:
      "Ottawa Storm 2022: Storm cleanup will last weeks Watson says; 74,000 still without power",
    content: "",
    excerpt:
      "Ottawa. May 24, 2022: Workers began chopping down branches and clearing up debris Tuesday after A massive tree split apart in Saturday?s storm on Belmont Avenue in Old Ottawa South.Photo by Jacquie Miller jpg",
    score: "4",
    director: "Jacquie Miller",
    actors: ["June", "May", "August"],
    status: "draft",
  };
  const actorsValue = useRef("");
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      CreateArticle(values);
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorBlur, setEditorBlur] = useState(false);

  // pass token here
  const CreateArticle = values => {
    CREATE_ARTICLE(CREATE_ARTICLE_URL, values, getAuthHeader);
  };

  return (
    <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="title"
          label="Enter a title"
          variant="outlined"
          {...formik.getFieldProps("title")}
          {...errorHelper(formik, "title")}
        />
      </div>

      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="excerpt"
          label="Enter an excerpt"
          variant="outlined"
          {...formik.getFieldProps("excerpt")}
          {...errorHelper(formik, "excerpt")}
          multiline
          rows={4}
        />
      </div>
      {/* <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="content"
          label="Enter content"
          variant="outlined"
          {...formik.getFieldProps("content")}
          {...errorHelper(formik, "content")}
          multiline
          rows={5}
        />
      </div> */}
      <div className="form-group">
        <WYSIWYG
          setEditorState={state => handleEditorState(state)}
          setEditorBlur={blur => handleEditorBlur(blur)}
        />

        {formik.errors.content && editorBlur ? (
          <FormHelperText error={true}>{formik.errors.content}</FormHelperText>
        ) : null}

        <TextField
          type="hidden"
          name="content"
          {...formik.getFieldProps("content")}
        />
      </div>

      <Divider className="mt-3 mb-3" />
      <h5>Movie data and score</h5>
      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="score"
          label="Enter a score"
          variant="outlined"
          {...formik.getFieldProps("score")}
          {...errorHelper(formik, "score")}
        />
      </div>

      <FormikProvider value={formik}>
        <h5>Add the actors:</h5>
        <FieldArray
          name="actors"
          render={arrayhelpers => (
            <div>
              <Paper className="actors_form">
                <InputBase
                  inputRef={actorsValue}
                  className="input"
                  placeholder="Add actor name here"
                />
                <IconButton
                  onClick={() => {
                    arrayhelpers.push(actorsValue.current.value);
                    actorsValue.current.value = "";
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Paper>
              {formik.errors.actors && formik.touched.actors ? (
                <FormHelperText error={true}>
                  {formik.errors.actors}
                </FormHelperText>
              ) : null}

              <div className="chip_container">
                {formik.values.actors.map((actor, index) => (
                  <div key={actor}>
                    <Chip
                      label={`${actor}`}
                      color="primary"
                      onDelete={() => arrayhelpers.remove(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        />
      </FormikProvider>

      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="director"
          label="Enter a director"
          variant="outlined"
          {...formik.getFieldProps("director")}
          {...errorHelper(formik, "director")}
        />
      </div>

      <FormControl variant="outlined">
        <h5>Select a status</h5>
        <Select
          name="status"
          {...formik.getFieldProps("status")}
          error={formik.errors.status && formik.touched.status ? true : false}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="public">Public</MenuItem>
        </Select>
        {formik.errors.status && formik.touched.status ? (
          <FormHelperText error={true}>{formik.errors.status}</FormHelperText>
        ) : null}
      </FormControl>

      <Divider className="mt-3 mb-3" />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        // disabled={false}
      >
        Add article
      </Button>
    </form>
  );
};

export default AddArticle;
