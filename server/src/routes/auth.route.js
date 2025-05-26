import express from "express";
import {
  getme,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/me").get(verifyJWT, getme);

export default router;
