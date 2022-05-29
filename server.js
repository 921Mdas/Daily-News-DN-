const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const userRoute = require("./routes/api/users");
const homeRoute = require("./routes/home");
const articleRoute = require("./routes/api/articles");
const { verifyToken } = require("./middleware/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
const io = require("socket.io")();
// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(verifyToken);
app.use(cors({ credentials: true }));
app.use(cookieParser());
require("dotenv").config();

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// connect routes to server
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/", homeRoute);

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
