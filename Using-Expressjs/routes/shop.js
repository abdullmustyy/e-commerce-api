import { Router } from "express";
import { getProducts } from "../controllers/products.js";

export const shopRoutes = Router();

shopRoutes.get("/", getProducts);
