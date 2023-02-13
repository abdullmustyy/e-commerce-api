import { Router } from "express";
import path from "path";
import { __dirname } from "../utils/path.js";

export const adminRoutes = Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
});

adminRoutes.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
