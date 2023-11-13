import { Router } from "express";
import { getLogin, postLogout, postLogin } from "../controllers/auth.js";

export const authRoutes = Router();

authRoutes.get("/login", getLogin);

authRoutes.post("/login", postLogin);

authRoutes.post("/logout", postLogout);
