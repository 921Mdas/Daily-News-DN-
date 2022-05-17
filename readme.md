<!-- packages to install instructions -->

@\*\* 1- Server install
npm install accesscontrol@2.2.1 bcrypt@5.0.0 body-parser@1.19.0 dotenv@8.2.0 express@4.17.1 jsonwebtoken@8.5.1 mailgen@2.0.14 mongodb@3.6.3 mongoose@5.11.8 mongoose-aggregate-paginate-v2@1.0.42 nodemailer@6.4.17 validator@13.5.2

@\*\* 2- client install
npm install --force axios@0.21.0 bootstrap@4.5.3 draft-js@0.11.7 draft-js-export-html@1.4.1 formik@2.2.6 html-to-draftjs@1.5.0 moment@2.29.1 react-bootstrap@1.4.0 react-cookies@0.1.1 react-draft-wysiwyg@1.14.5 react-google-font-loader@1.1.0 react-moment@1.1.1 react-redux@7.2.2 react-router-bootstrap@0.25.0 react-router-dom@5.2.0 react-toastify@6.2.0 redux@4.0.5 redux-thunk@2.3.0 yup@0.32.8

@\*\* 3 - Admin layout

<!-- <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2"></h1>
</div>

</main> -->

@\*\* 4 - ADD ARTICLE

<!-- import {
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
    FormHelperText
} from '@material-ui/core'; -->
<!-- import AddIcon from '@material-ui/icons/Add'; -->

---

## STEP 1: CONFIG AND INSTALLATION

- info: first npm init && install all dependencies
- info: sever first then client right after client is in a folder
- info: if we know what to do on the backend you can start with client, however if you are not sure, start server
- next: install scripts to concurrently run server and client in the server package.json / 1 script for server / 1 for client / 1 for dev with concurrently
- nodemon is restarting all the time? create a nodemon.json file to watch specific things (server, client, etc.)
- if your project is going on github you need a gitignore

## STEP 2: CREATE SERVER

- seems ideal to create your own server rather than user express-generator / looks like it avoids buggs
- environmental variables dotenv / config and add the database with mongouri
- first start with authentication because it will be the middleware applied to all routes.
- create a model / controller / config / routes etc.

## STEP 3: USER REGISTRATION

- user model will contain (isEmailtaken statics, Schema.pre save password hashing if is.Modified(password), generate token schema.methods)
- those functions will be used in the registration route/controller for new users
- the model has access to the user via this (user = this)
