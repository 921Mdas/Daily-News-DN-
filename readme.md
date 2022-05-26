@\*\* 1- Server install npm install accesscontrol@2.2.1 bcrypt@5.0.0 body-parser@1.19.0 dotenv@8.2.0 express@4.17.1 jsonwebtoken@8.5.1 mailgen@2.0.14 mongodb@3.6.3 mongoose@5.11.8 mongoose-aggregate-paginate-v2@1.0.42 nodemailer@6.4.17 validator@13.5.2

@\*\* 2- client install npm install --force axios@0.21.0 bootstrap@4.5.3 draft-js@0.11.7 draft-js-export-html@1.4.1 formik@2.2.6 html-to-draftjs@1.5.0 moment@2.29.1 react-bootstrap@1.4.0 react-cookies@0.1.1 react-draft-wysiwyg@1.14.5 react-google-font-loader@1.1.0 react-moment@1.1.1 react-redux@7.2.2 react-router-bootstrap@0.25.0 react-router-dom@5.2.0 react-toastify@6.2.0 redux@4.0.5 redux-thunk@2.3.0 yup@0.32.8

@\*\* 3 - Admin layout

@\*\* 4 - ADD ARTICLE

## STEP 1: CONFIG AND INSTALLATION

- info: first npm init && install all dependencies
- info: sever first then client right after client is in a folder
  info: if we know what to do on the backend you can start with client, however if you are not sure, start server
  next: install scripts to concurrently run server and client in the server package.json / 1 script for server / 1 for client / 1 for dev with concurrently
  nodemon is restarting all the time? create a nodemon.json file to watch specific things (server, client, etc.)
  if your project is going on github you need a gitignore
  STEP 2: CREATE SERVER
  seems ideal to create your own server rather than user express-generator / looks like it avoids buggs
  environmental variables dotenv / config and add the database with mongouri
  first start with authentication because it will be the middleware applied to all routes.
  create a model / controller / config / routes etc.
  STEP 3: USER REGISTRATION / SIGN IN & VALIDATE TOKENS
  user model will contain (isEmailtaken statics, Schema.pre save password hashing if is.Modified(password), generate token schema.methods)

those functions will be used in the registration route/controller for new users

the model has access to the user via this (user = this)

the methods responsible for tokens,passwords comparison, are all stored in model and referenced in the controller (good structure)

if you have multiple res.send and get error: ERR HTTP HEADERS SENT just add return in front of the res

validating token needs a middleware we can apply to multiple routes

validating with jwt.verify

res.locals.whatever can help us store decoded value of a token and use it elsewhere

## STEP 5: NORMAL ARTICLE SCHEMA & RENDER CONTENT BY STATUS

-done

## STEP 6: LOAD MORE CONTENT

- without someone having logged into the system, they should be able to see the top or 10 article(artists, etc) depending on the project
- // {sortBy:"\_id",order:"asc", limit:10, skip:0}
- on the client we will send this information to the backend
- a post request with some of the information on line 2
- we can set this for the common users but the admin should be able to see the whole database so for him let' sset up pagination
- there is a better method - pagination (look into aggregate paginate option)

**\*\*\*\***\*\*\***\*\*\*\***PAGINATION**\*\***\*\***\*\***\***\*\***\*\***\*\***

## FRONT END

- react toastify needs to be put on a higher component, preferably layout
  -notifications are showed where the APIs are made between back and front (run toast there)

- create an authentication form login signup as a component (on initial load), next use that component on sign in to redirect to home page
- create API UTIL that can include all reusable functions
- create component util for reusable components
- router component file rendered in index is better

## AUTO SIGN IN

- use the token to auto login the user
- need to set a header that will be received by the backend signin route, verified, decoded, extract user info, find user in the database and send user info back.
- create a common place to send the token in header over and over each time you want to verify, dont pass it manually
- use isAuth to render loader or routes on application start

**dynamic Layout**

- useLocation to understand where you are in the app and render specific layouts based on the path

## GUARDING ROUTES

- even when we are not signed in, we can face issues such as changing the url and still accessing the application; solution is authentication HOC page

- state persistence can be a real issue when changing pages
- that's where redux comes in i guess localstorage in the meantime

## ARTICLES CRUD

## Additional features

- languages translation (i18n - internationalization (translation))

\*\* learn to make API calls in the context file

## PORT ISSUES

force port to end run: npx kill-port 3001
