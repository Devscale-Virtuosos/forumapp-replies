import { Schema, model, Document } from "mongoose";

export interface IReply extends Document {
  content: string;
  createdAt: Date;
}

const replySchema = new Schema<IReply>({
  content: { type: String, required: true, maxlength: 250 },
  createdAt: { type: Date, default: Date.now },
});

export const Reply = model<IReply>("Reply", replySchema);
