import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Routers
import indexRouter from "./routes/indexRouter.js";
import logInRouter from "./routes/logInRouter.js";

app.use("/", indexRouter);
app.use("/log-in", logInRouter);

app.listen(3000, () => {
  console.log("App listens on http://localhost:3000/");
});
