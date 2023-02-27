import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";
import { Product } from "../models/product.js";

const p = path.join(__dirname, "..", "data", "products.json");

export const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const getRemoveProduct = (reg, res, next) => {
  res.render("remove-product", {
    pageTitle: "Remove Product",
    path: "/admin/remove-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const postRemoveProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    products.forEach((product, index) => {
      if (product.title === req.body.title) {
        products.splice(index, 1);
      }
    });
    fs.writeFile(p, JSON.stringify(products), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
