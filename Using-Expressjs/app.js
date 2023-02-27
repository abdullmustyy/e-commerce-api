import express from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin.js";
import { shopRoutes } from "./routes/shop.js";
import path from "path";
import { __dirname } from "./utils/path.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(3000);
