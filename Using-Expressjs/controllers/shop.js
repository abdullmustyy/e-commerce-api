import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";
import { Product } from "../models/product.js";

const p = path.join(__dirname, "..", "data", "products.json");

const getIndex = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    path: "/",
  });
};

const getProductsList = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Product List",
        path: "/products-list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: `Product ${productId}`,
        path: null,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cartProducts) => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        cartProducts: cartProducts,
        // totalPrice: cart.totalPrice,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(`${result} added to cart`);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postCartDeleteItem = (req, res, net) => {
  const { productId, productPrice } = req.body;

  Product.findById(productId)
    .then((product) => {
      req.user.removeFromCart(product);
    })
    .then(() => {
      console.log("Product removed from cart!");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postOrders = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      console.log("Order added!");
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
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
  postCartDeleteItem,
  getCheckout,
  getOrders,
  postOrders,
};
