import { Router } from "express";
import {
  getAddProduct,
  getRemoveProduct,
  postRemoveProduct,
  postAddProduct,
} from "../controllers/products.js";

export const adminRoutes = Router();

adminRoutes.get("/admin/add-product", getAddProduct);

adminRoutes.get("/admin/remove-product", getRemoveProduct);

adminRoutes.post("/admin/product", postAddProduct);

adminRoutes.post("/admin/remove-product", postRemoveProduct);
