import { Router } from "express";
import {
  getLogin,
  postLogout,
  postLogin,
  getSignup,
  postSignup,
} from "../controllers/auth.js";

export const authRoutes = Router();

authRoutes.get("/signup", getSignup);

authRoutes.get("/login", getLogin);

authRoutes.post("/signup", postSignup);

authRoutes.post("/login", postLogin);

authRoutes.post("/logout", postLogout);
