import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";
import Product from "../models/product.js";

const p = path.join(__dirname, "..", "data", "products.json");

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
            prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
            pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: req.user,
  });

  product
    .save()
    .then(() => {
      console.log("Added product!");
      res.redirect("/products-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;

  Product.updateOne(
    { _id: productId },
    { title: title, imageUrl: imageUrl, price: price, description: description }
  )
    .then(() => {
      console.log("Updated product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteOne({ _id: productId })
    .then(() => {
      console.log("Product deleted!");
      res.redirect("/products-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  getAddProduct,
  getAdminProducts,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
};
