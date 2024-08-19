import { IReply, Reply } from "../models/replies.schema";

const replyRepository = {
  // create reply
  createReply: async (reply: IReply) => {
    try {
      const newReply = await Reply.create(reply);
      return newReply;
    } catch (error) {
      throw error;
    }
  },

  // mendapatkan semua reply
  getAllReplies: async () => {
    try {
      const replies = await Reply.find();
      return replies;
    } catch (error) {
      throw error;
    }
  },

  //   mendapatkan reply berdasarkan id
  getReplyById: async (replyId: string) => {
    try {
      const reply = await Reply.findById(replyId);
      // jika reply tidak ditemukan
      if (!reply) {
        throw new Error("Reply not found");
      }
      return reply;
    } catch (error) {
      throw error;
    }
  },

  //   menghapus reply
  deleteReply: async (replyId: string) => {
    try {
      const deletedReply = await Reply.findByIdAndDelete(replyId);
      // jika reply tidak ditemukan
      if (!deletedReply) {
        throw new Error("Reply not found");
      }
      return deletedReply;
    } catch (error) {
      throw error;
    }
  },
};

export default replyRepository;
