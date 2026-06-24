const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Routers
const indexRouter = require("./routes/indexRouter");
const logInRouter = require("./routes/logInRouter");

app.use("/", indexRouter);
app.use("/log-in", logInRouter);

app.listen(3000, () => {
  console.log("App listens on http://localhost:3000/");
});
