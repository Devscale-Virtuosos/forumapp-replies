import { Request, Response } from "express";
import replyServices from "../services/reply.services";

const replyController = {
  // mendapatkan semua reply
  getAllRepliesController: async (req: Request, res: Response) => {
    try {
      const replies = await replyServices.getAllReplies();
      res.status(200).json(replies);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },

  // mendapatkan reply berdasarkan id
  getReplyByIdController: async (req: Request, res: Response) => {
    try {
      const reply = await replyServices.getReplyById(req.params.id);
      res.status(200).json(reply);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },

  // membuat reply
  createReplyController: async (req: Request, res: Response) => {
    try {
      const replyData = req.body;
      const newReply = await replyServices.createReply(replyData);
      res.status(201).json(newReply);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },

  //   menghapus reply
  deleteReplyController: async (req: Request, res: Response) => {
    try {
      const replyId = req.params.id;
      const deletedReply = await replyServices.deleteReply(replyId);
      if (!deletedReply) {
        res.status(404).json({ message: "Reply not found" });
      } else {
        res.status(200).json(deletedReply);
      }
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },
};
export default replyController;
