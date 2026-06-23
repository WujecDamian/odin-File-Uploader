const express = require("express");
const path = require("path");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Routers
const indexRouter = require("./routes/indexRouter");

app.get("/", indexRouter);

app.listen(3000, () => {
  console.log("App listens on http://localhost:3000/");
});
