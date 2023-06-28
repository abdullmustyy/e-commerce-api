import { Router } from "express";
import {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin.js";

export const adminRoutes = Router();

adminRoutes.get("/add-product", getAddProduct);

adminRoutes.get("/products", getAdminProducts);

adminRoutes.get("/edit-product/:productId", getEditProduct);

adminRoutes.post("/add-product", postAddProduct);

adminRoutes.post("/edit-product", postEditProduct);

adminRoutes.post("/delete-product", postDeleteProduct);
