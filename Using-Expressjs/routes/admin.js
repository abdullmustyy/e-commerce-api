import { Router } from "express";
import {
  getAddProduct,
  getAdminProducts,
  getRemoveProduct,
  postRemoveProduct,
  postAddProduct,
} from "../controllers/admin.js";

export const adminRoutes = Router();

adminRoutes.get("/admin/add-product", getAddProduct);

adminRoutes.get("/admin/products", getAdminProducts);

adminRoutes.get("/admin/remove-product", getRemoveProduct);

adminRoutes.post("/admin/product", postAddProduct);

adminRoutes.post("/admin/remove-product", postRemoveProduct);
