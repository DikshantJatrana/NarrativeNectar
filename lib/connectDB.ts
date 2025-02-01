import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected");
    return;
  }

  const mongoUrl: string = process.env.MONGODB_URL || "";
  if (!mongoUrl) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
  }

  mongoose.connect(mongoUrl);
  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Database connected successfully");
  });

  db.on("error", (err) => {
    console.error("Database connection error:", err);
  });
}
