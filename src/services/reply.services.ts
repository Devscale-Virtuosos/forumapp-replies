import { IReply } from "../models/replies.schema";
import replyRepository from "../repositories/reply.repositories";
import { env } from "../utils/env";
import { rabbitmq } from "../utils/rabbitmq";

const MAX_CONTENT_LENGTH = 250;

const replyServices = {
  // mendapatkan semua reply
  getAllReplies: async () => {
    try {
      const replies = await replyRepository.getAllReplies();
      return replies;
    } catch (error) {
      throw new Error("Terjadi kesalahan pada server");
    }
  },

  // membuat reply
  createReply: async (replyData: IReply) => {
    try {
      const newReply = await replyRepository.createReply(replyData);
      if (newReply.content.length > MAX_CONTENT_LENGTH) {
        throw new Error("Content is too long");
      }

      // send event/message to rabbitmq
      const queue = env.ADD_REPLY_RABBITMQ_QUEUE;
      const connection = await rabbitmq(queue);
      connection.sendToQueue(queue, Buffer.from(JSON.stringify(newReply)));

      return { message: "Reply berhasil dibuat", data: newReply };
    } catch (error) {
      throw new Error("Terjadi kesalahan pada server");
    }
  },

  // mendapatkan reply berdasarkan id
  getReplyById: async (replyId: string) => {
    try {
      const reply = await replyRepository.getReplyById(replyId);
      if (!reply) {
        throw new Error("Reply not found");
      }
      return reply;
    } catch (error) {
      throw new Error("Terjadi kesalahan pada server");
    }
  },

  // menghapus reply
  deleteReply: async (replyId: string) => {
    try {
      const deletedReply = await replyRepository.deleteReply(replyId);

      if (!deletedReply) {
        throw new Error("Reply not found");
      }

      // send event/message to rabbitmq
      const queue = env.DELETE_REPLY_RABBITMQ_QUEUE;
      const connection = await rabbitmq(queue);
      connection.sendToQueue(queue, Buffer.from(JSON.stringify(deletedReply)));

      return { message: "Reply berhasil dihapus", data: deletedReply };
    } catch (error) {
      throw new Error("Terjadi kesalahan pada server");
    }
  },
};

export default replyServices;
