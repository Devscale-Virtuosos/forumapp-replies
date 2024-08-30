import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  RABBITMQ_URI: str(),
  ADD_REPLY_RABBITMQ_QUEUE: str(),
  DELETE_REPLY_RABBITMQ_QUEUE: str(),
});
