import { Router } from "express";
import { getLogin, getLogout, postLogin } from "../controllers/auth.js";

export const authRoutes = Router();

authRoutes.get("/login", getLogin);

authRoutes.post("/login", postLogin);

authRoutes.get("/logout", getLogout);
