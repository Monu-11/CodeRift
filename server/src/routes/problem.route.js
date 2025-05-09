import express from "express";
import { verifyAdmin, verifyJWT } from "../middleware/auth.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblem,
} from "../controllers/problem.controller.js";

const router = express.Router();

router.route("/create-problem").post(verifyJWT, verifyAdmin, createProblem);
router.route("/get-all-problems").get(verifyJWT, getAllProblems);
router.route("/get-problem/:id").get(verifyJWT, getProblemById);
router.route("/update-problem/:id").get(verifyJWT, verifyAdmin, updateProblem);
router.route("/delete-problem/:id").get(verifyJWT, verifyAdmin, deleteProblem);
router.route("/get-solved-problems").get(verifyJWT, getAllProblemsSolvedByUser);

export default router;
