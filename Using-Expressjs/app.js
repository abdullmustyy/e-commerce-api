import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { __dirname } from "./utils/path.js";
import mongoose from "mongoose";
import User from "./models/user.js";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import Tokens from "csrf";
// Routes, Cntrollers & Middleware
import { adminRoutes } from "./routes/admin.js";
import { shopRoutes } from "./routes/shop.js";
import { authRoutes } from "./routes/auth.js";
import { show404Page } from "./controllers/404.js";
import { isAuth } from "./middleware/is-auth.js";

const MONGODB_URI = process.env.MONGODB_URI;
const csrf = new Tokens();

const app = express();

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      ttl: 24 * 60 * 60,
    }),
  })
);
// CSRF Protection
app.use((req, res, next) => {
  const csrfToken = csrf.create("my secret");
  res.locals.csrfToken = csrfToken;
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.loggedIn;
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) return next();

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("Error while finding user: \n", err);
    });
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cookieParser());

app.use("/admin", isAuth, adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(show404Page);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log(chalk.white("MongoDB Connected"));
      console.log(chalk.yellow.underline("Server started on port 5000"));
    });
  })
  .catch((err) => {
    console.log(err);
  });
