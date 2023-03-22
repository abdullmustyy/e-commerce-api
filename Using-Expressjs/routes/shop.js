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
  postOrders,
} from "../controllers/shop.js";

export const shopRoutes = Router();

shopRoutes.get("/", getIndex);

shopRoutes.get("/products-list", getProductsList);

shopRoutes.get("/product/:productId", getProduct);

shopRoutes.get("/cart", getCart);

shopRoutes.post("/cart", postCart);

shopRoutes.post("/cart-delete-item", postCartDeleteItem);

shopRoutes.get("/orders", getOrders);

shopRoutes.post("/create-order", postOrders);

shopRoutes.get("/checkout", getCheckout);
