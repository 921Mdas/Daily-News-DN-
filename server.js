var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
var userRoute = require("./routes/api/users");
var homeRoute = require("./routes/home");
var articleRoute = require("./routes/api/articles");
var { verifyToken } = require("./middleware/auth");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
app.use(express.json());
var io = require("socket.io")();
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
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.use(express.static(path.join(__dirname, "build")));

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

io.attach(server);

io.on("connection", socket => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

// connect to the db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});
