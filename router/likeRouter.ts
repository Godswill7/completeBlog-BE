import express from "express";
import { like, unLike, viewLikes } from "../controller/likeController";

const router = express.Router();

router.route("/:authorID/:likeID/like").post(like);
router.route("/:authorID/:likeID/unlike").post(unLike);
router.route("/:authorID/view-likes").get(viewLikes);

export default router;
