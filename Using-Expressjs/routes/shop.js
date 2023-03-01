import { Router } from "express";
import {
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProductsList,
} from "../controllers/shop.js";

export const shopRoutes = Router();

shopRoutes.get("/", getIndex);

shopRoutes.get("/products-list", getProductsList);

shopRoutes.get("/cart", getCart);

shopRoutes.get("/orders", getOrders);

shopRoutes.get("/checkout", getCheckout);
