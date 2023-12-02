import { Router } from "express";
import {
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProduct,
  getProductsList,
  postCart,
  postCartDeleteItem,
  postDeleteOrder,
  postOrders,
} from "../controllers/shop.js";
import { isAuth } from "../middleware/is-auth.js";

export const shopRoutes = Router();

shopRoutes.get("/", getIndex);

shopRoutes.get("/products-list", getProductsList);

shopRoutes.get("/product/:productId", getProduct);

shopRoutes.get("/cart", isAuth, getCart);

shopRoutes.post("/cart", isAuth, postCart);

shopRoutes.post("/cart-delete-item", isAuth, postCartDeleteItem);

shopRoutes.get("/orders", isAuth, getOrders);

shopRoutes.post("/create-order", isAuth, postOrders);

shopRoutes.post("/order-delete-item", isAuth, postDeleteOrder);

// shopRoutes.get("/checkout", getCheckout);
