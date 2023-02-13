import express from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin.js";
import { shopRoutes } from "./routes/shop.js";
import path from "path";
import { __dirname } from "./utils/path.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

app.listen(3000);
