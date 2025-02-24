import { PORT } from "./config/env";
import app from "./app";
import { connectToDatabase } from "./db";

if (!PORT) {
  throw new Error(
    "Please define the PORT environment variable inside .env<development/production>.local"
  );
}

console.log("⚡️[server]: Server is starting...");
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "⚠️ Error connecting to MongoDB or starting the server:",
      error
    );
    process.exit(1);
  });
