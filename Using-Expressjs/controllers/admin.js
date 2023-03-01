import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";
import { Product } from "../models/product.js";

const p = path.join(__dirname, "..", "data", "products.json");

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

const getRemoveProduct = (reg, res, next) => {
  res.render("admin/remove-product", {
    pageTitle: "Remove Product",
    path: "/admin/remove-product",
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/products-list");
};

const postRemoveProduct = (req, res, next) => {
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

  res.redirect("/products-list");
};

export {
  getAddProduct,
  getAdminProducts,
  getRemoveProduct,
  postAddProduct,
  postRemoveProduct,
};
