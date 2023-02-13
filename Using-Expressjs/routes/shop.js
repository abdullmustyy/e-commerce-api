import { Router } from "express";
import path from "path";
import { __dirname } from "../utils/path.js";

export const shopRoutes = Router();

shopRoutes.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});
