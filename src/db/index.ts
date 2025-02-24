import { MONGODB_URI, NODE_ENV } from "../config/env";
import mongoose from "mongoose";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env<development/production>.local"
  );
}

export const connectToDatabase = async () => {
  try {
    console.log(`⏱️🤚 Connecting to MongoDB at ${MONGODB_URI}`);

    const connectionInstance = await mongoose.connect(MONGODB_URI!);

    console.log(
      `🌿 Connected to MongoDB at ${connectionInstance.connection.host}:${connectionInstance.connection.port} in ${NODE_ENV} mode`
    );
  } catch (error) {
    console.error("⚠️ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
