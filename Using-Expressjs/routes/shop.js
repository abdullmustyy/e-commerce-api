import { Router } from "express";
import path from "path";
import { __dirname } from "../utils/path.js";
import { products } from "./admin.js";

export const shopRoutes = Router();

shopRoutes.get("/", (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});
