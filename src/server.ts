import express from "express";
import { connectDB } from "./utils/db"; // Import connectDB
import dotenv from "dotenv";
import replyRoutes from "./routes/reply.routes";

dotenv.config();

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    // Koneksi ke MongoDB
    await connectDB();

    // Menggunakan routes
    app.use("/api/replies", replyRoutes);

    // Setelah koneksi berhasil, jalankan server
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    // Jika koneksi gagal, jangan jalankan server
    console.error("Failed to connect to MongoDB:", error);
  }
};

startServer();
