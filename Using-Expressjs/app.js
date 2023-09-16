import express from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin.js";
import { shopRoutes } from "./routes/shop.js";
import { authRoutes } from "./routes/auth.js";
import { show404Page } from "./controllers/404.js";
import path from "path";
import { __dirname } from "./utils/path.js";
import mongoose from "mongoose";
import User from "./models/user.js";
import chalk from "chalk";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  User.findById("645149c940989cb744d4649a")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(show404Page);

mongoose
  .connect(
    "mongodb+srv://abdul:xLoR9GREjpZlXNA4@cluster0.rtdzvud.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(chalk.white("MongoDB Connected"));

    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Abdul",
          email: "abdul@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(5000, () => {
      console.log(chalk.yellow.underline("Server started on port 5000"));
    });
  })
  .catch((err) => {
    console.log(err);
  });
