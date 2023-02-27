import { Router } from "express";
import path from "path";
import { __dirname } from "../utils/path.js";

export const adminRoutes = Router();
export const products = [];

adminRoutes.get("/admin/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

adminRoutes.get("/admin/remove-product", (reg, res, next) => {
  res.render("remove-product", {
    pageTitle: "Remove Product",
    path: "/admin/remove-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

adminRoutes.post("/admin/remove-product", (req, res, next) => {
  for (let product of products) {
    if (product.title === req.body.title) {
      products.splice(products.indexOf(product), 1);
    }
  }
  res.redirect("/");
});

adminRoutes.post("/admin/product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});
