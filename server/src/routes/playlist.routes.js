import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getPlayListDetails,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.route("/").get(verifyJWT, getAllListDetails);

router.route("/:playlistId").get(verifyJWT, getPlayListDetails);

router.route("/create-playlist").post(verifyJWT, createPlaylist);

router.route("/:playlistId/add-problem").post(verifyJWT, addProblemToPlaylist);

router.route("/:playlistId").delete(verifyJWT, deletePlaylist);

router
  .route("/:playlistId/remove-problem")
  .get(verifyJWT, removeProblemFromPlaylist);

export default router;
