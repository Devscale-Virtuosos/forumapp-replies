import { Router } from "express";
import replyController from "../controllers/reply.controller";

const router = Router();

router.get("/", replyController.getAllRepliesController);
router.post("/", replyController.createReplyController);
router.get("/:id", replyController.getReplyByIdController);
router.delete("/:id", replyController.deleteReplyController);

export default router;
