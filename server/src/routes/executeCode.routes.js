import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";

const router = express.Router();

router.route("/").post(verifyJWT, executeCode);

export default router;
