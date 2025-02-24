import type { Request, Response } from "express";
import mongoose from "mongoose";

/**
 * Returns a health report for the application.
 *  ✔️ Checks server uptime
 *  ✔️ Monitors MongoDB connection
 *  ✔️ Measures response time
 *  ✔️ Gives a clean JSON report
 *  ✔️ Returns HTTP 500 if MongoDB is down
 */
export const healthcheck = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const start = process.hrtime(); // Start time for response time calculation

  // Check MongoDB connection status
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  // Check server uptime
  const uptime = process.uptime();

  // Calculate response time
  const [seconds, nanoseconds] = process.hrtime(start);
  const responseTimeMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

  // Construct health report
  const healthReport = {
    status: "Healthy",
    server: {
      uptime: `${Math.floor(uptime)} seconds`,
      responseTime: `${responseTimeMs} ms`,
    },
    database: {
      status: mongoStatus,
    },
  };

  // If MongoDB is disconnected, return a 500 error
  if (mongoStatus === "Disconnected") {
    res.status(500).json({ ...healthReport, status: "Unhealthy" });
  }

  // Return health report
  res.status(200).json(healthReport);
};
