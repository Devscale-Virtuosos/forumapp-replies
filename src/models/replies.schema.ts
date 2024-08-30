import { Schema, model, Document } from "mongoose";

export interface IReply extends Document {
  threadId: string;
  userId: string;
  content: string;
}

const replySchema = new Schema<IReply>(
  {
    threadId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true, maxlength: 250 },
  },
  { timestamps: true }
);

export const Reply = model<IReply>("Reply", replySchema);
