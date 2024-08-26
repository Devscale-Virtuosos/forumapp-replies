import express from "express";
import { connectDB } from "./utils/db"; // Import connectDB
import dotenv from "dotenv";
import replyRoutes from "./routes/reply.routes";
import { middlewareCheckOrigin } from "./middleware/middleware.check-origin";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();
app.use(middlewareCheckOrigin);
// Menggunakan routes
app.use("/api/replies", replyRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
