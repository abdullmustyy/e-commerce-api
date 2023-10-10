import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

const p = path.join(__dirname, "..", "data", "products.json");

const getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        isAuthenticated: req.cookies.loggedIn,
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProductsList = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        isAuthenticated: req.cookies.loggedIn,
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
        isAuthenticated: req.cookies.loggedIn,
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
    .populate("cart.items.productId")
    .then((user) => {
      const cartProducts = user.cart.items;
      res.render("shop/cart", {
        isAuthenticated: req.cookies.loggedIn,
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

  req.user
    .removeFromCart(productId)
    .then((result) => {
      console.log(`${result} removed from cart!`);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        isAuthenticated: req.cookies.loggedIn,
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
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => ({
        product: { ...item.productId._doc },
        quantity: item.quantity,
      }));
      const order = new Order({
        products: products,
        user: {
          name: req.user.name,
          userId: req.user,
        },
      });
      return order.save();
    })
    .then(() => {
      req.user.clearCart();
    })
    .then(() => {
      console.log("Order added!");
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDeleteOrder = (req, res, next) => {
  const { orderId } = req.body;
  Order.findByIdAndDelete(orderId)
    .then(() => {
      console.log(`Order ${orderId} deleted!`);
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    isAuthenticated: req.cookies.loggedIn,
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
  postDeleteOrder,
};
