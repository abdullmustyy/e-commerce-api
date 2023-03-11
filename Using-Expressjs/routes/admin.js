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

adminRoutes.get("/admin/add-product", getAddProduct);

adminRoutes.get("/admin/products", getAdminProducts);

adminRoutes.get("/admin/edit-product/:productId", getEditProduct);

adminRoutes.post("/admin/add-product", postAddProduct);

adminRoutes.post("/admin/edit-product", postEditProduct);

adminRoutes.post("/admin/delete-product", postDeleteProduct);
