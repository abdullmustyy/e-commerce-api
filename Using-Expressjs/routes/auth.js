import { Router } from "express";
import {
  getLogin,
  postLogout,
  postLogin,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} from "../controllers/auth.js";

export const authRoutes = Router();

authRoutes.get("/signup", getSignup);

authRoutes.get("/login", getLogin);

authRoutes.get("/reset", getReset);

authRoutes.get("/reset/:token", getNewPassword);

authRoutes.post("/signup", postSignup);

authRoutes.post("/login", postLogin);

authRoutes.post("/reset", postReset);

authRoutes.post("/logout", postLogout);

authRoutes.post("/new-password", postNewPassword);
