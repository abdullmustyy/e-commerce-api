import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";
import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";

const p = path.join(__dirname, "..", "data", "products.json");

const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

const getProductsList = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Product List",
      path: "/products-list",
    });
  });
};

const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: `Product ${productId}`,
      path: null,
    });
  });
};

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

export {
  getIndex,
  getProductsList,
  getProduct,
  getCart,
  postCart,
  getCheckout,
  getOrders,
};
