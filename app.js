import express from "express";
import passport from "passport";
import path from "path";
import LocalStrategy from "passport-local";
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
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg"; // For other db adapters, see Prisma docs
import { PrismaClient } from "./generated/prisma/client.js";
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
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
//end of session store -> beginning of config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user and compare with bcrypt
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Invalid credentials" });
      }
      done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
// Routers
import indexRouter from "./routes/indexRouter.js";
import logInRouter from "./routes/logInRouter.js";
import signUpRouter from "./routes/signUpRouter.js";

app.use("/", indexRouter);
app.use("/log-in", logInRouter);
app.use("/sign-up", signUpRouter);

app.listen(3000, () => {
  console.log("App listens on http://localhost:3000/");
});
