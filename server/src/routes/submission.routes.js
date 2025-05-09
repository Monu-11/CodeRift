import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getAllSubmission,
  getAllTheSubmissionsForProblem,
  getSubmissionsForProblem,
} from "../controllers/submission.controller.js";

const router = express.Router();

router.route("/get-all-submissions").get(verifyJWT, getAllSubmission);
router
  .route("/get-submission/:problemId")
  .get(verifyJWT, getSubmissionsForProblem);

router
  .route("/get-submissions-count/:problemId")
  .get(verifyJWT, getAllTheSubmissionsForProblem);

export default router;
