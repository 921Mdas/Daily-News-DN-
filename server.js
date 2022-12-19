var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var userRoute = require("./routes/api/users");
var homeRoute = require("./routes/home");
var articleRoute = require("./routes/api/articles");
var { verifyToken } = require("./middleware/auth");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("cookie-session");
app.use(express.json());
// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(verifyToken);
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "Dashnews",
    resave: false,
    saveUninitialized: true,
  })
);
require("dotenv").config();
require("./config/passport");

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

// connect routes to server
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/", homeRoute);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// listening
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log("server running on port ⚙️" + port + "⚙️");
});

// connect to the db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
