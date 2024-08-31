import amqplib from "amqplib";
import { env } from "./env";

export async function rabbitmq(queue: string) {
  const connection = await amqplib.connect(env.RABBITMQ_URI);

  // create channel
  const channel = await connection.createChannel();

  // ensure that "queue" exists in the channel
  await channel.assertQueue(queue, { durable: false });

  return channel;
}
