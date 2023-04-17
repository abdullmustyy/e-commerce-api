import express from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin.js";
import { shopRoutes } from "./routes/shop.js";
import { show404Page } from "./controllers/404.js";
import path from "path";
import { __dirname } from "./utils/path.js";
import mongoose from "mongoose";
import { User } from "./models/user.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  User.findById("642aebaf04483b8ba385dc2d")
    .then((user) => {
      req.user = new User(user.userName, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(show404Page);

mongoose
  .connect(
    "mongodb+srv://abdul:xLoR9GREjpZlXNA4@cluster0.rtdzvud.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
