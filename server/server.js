const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/api/users");
const { verifyToken } = require("./middleware/auth");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(verifyToken);
// app.use(authMiddleware.verifyToken);
require("dotenv").config();

// connect routes to server
app.use("/api/users", userRoute);
// listening
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server running on port ⚙️" + port + "⚙️");
});

// connect to the db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
