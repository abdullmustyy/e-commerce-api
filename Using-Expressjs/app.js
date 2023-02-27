import express from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin.js";
import { shopRoutes } from "./routes/shop.js";
import { show404Page } from "./controllers/404.js";
import path from "path";
import { __dirname } from "./utils/path.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(adminRoutes);
app.use(shopRoutes);

app.use(show404Page);

app.listen(3000);
