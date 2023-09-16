import { Router } from "express";
import { getLogin } from "../controllers/auth.js";

export const authRoutes = Router();

authRoutes.get("/login", getLogin);
