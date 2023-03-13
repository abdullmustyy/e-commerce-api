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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const productsInCart = cart.products.map((cartProduct) => {
        const product = products.find(
          (product) => product.id === cartProduct.id
        );
        return { ...product, qty: cartProduct.qty };
      });

      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        cartProducts: productsInCart,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

const postCartDeleteItem = (req, res, net) => {
  const { productId, productPrice } = req.body;
  Cart.deleteById(productId, productPrice);
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
  postCartDeleteItem,
  getCheckout,
  getOrders,
};
