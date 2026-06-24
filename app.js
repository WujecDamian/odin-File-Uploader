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

//Passport
import expressSession from "express-session";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg"; // For other db adapters, see Prisma docs
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

// DATABASE_URL defined in env file included in prisma.config.js; see Prisma docs
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

// Routers
import indexRouter from "./routes/indexRouter.js";
import logInRouter from "./routes/logInRouter.js";

app.use("/", indexRouter);
app.use("/log-in", logInRouter);

app.listen(3000, () => {
  console.log("App listens on http://localhost:3000/");
});
