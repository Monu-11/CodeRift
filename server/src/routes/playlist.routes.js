import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addProblemToPlaylist,
  createPlayList,
  deletePlayList,
  getPlayAllListDetails,
  getPlayListDetails,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.route("/").get(verifyJWT, getPlayAllListDetails);

router.route("/:playlistId").get(verifyJWT, getPlayListDetails);

router.route("/create-playlist").post(verifyJWT, createPlayList);

router.route("/:playlistId/add-problem").post(verifyJWT, addProblemToPlaylist);

router.route("/:playlistId").delete(verifyJWT, deletePlayList);

router
  .route("/:playlistId/remove-problem")
  .delete(verifyJWT, removeProblemFromPlaylist);

export default router;
