import { ALLOWED_CORS_ORIGINS } from "./config/env";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import path from "path";

if (!ALLOWED_CORS_ORIGINS)
  throw new Error(
    "Please define the ALLOWED_CORS_ORIGINS environment variable inside .env<development/production>.local"
  );

const app = express();

// Parse allowed origins
const allowedOrigins =
  ALLOWED_CORS_ORIGINS === "*"
    ? "*" // Allow all origins (not recommended for production with credentials)
    : ALLOWED_CORS_ORIGINS.split(",").map((origin) => origin.trim());

// express built-in middlewares
app.use(express.static("public"));
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// cookie parser middleware to parse cookies
app.use(cookieParser());

// CORS middleware with dynamic origin checking
app.use(
  cors({
    origin: (origin, callback) => {
      // If ALLOWED_CORS_ORIGINS is '*', allow all (with warning for credentials)
      if (allowedOrigins === "*") {
        console.warn(
          "⚠️ Warning: Using '*' with credentials may cause issues in some browsers"
        );
        callback(null, true);
        return;
      }

      // Allow only if origin matches an allowed origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow same-origin or matching origins
      } else {
        callback(new Error("CORS policy: This origin is not allowed"));
      }
    },
    credentials: true, // Keep this because we are using cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    maxAge: 86400,
    optionsSuccessStatus: 200,
  })
);

// routes import
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import healthcheckRouter from "./routes/healthcheck.routes";
import subscriptionRouter from "./routes/subscription.routes";

// app version 1
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// catch-all route handler
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/files/404.html"));
});

/*
 * Error Handling Middleware:
 * --------------------------------------------
 * 1. This middleware is defined with four parameters: (err, req, res, next).
 * 2. It is placed at the end of the middleware stack to catch any errors that
 *    occur in the preceding routes or middleware.
 * 3. When an error is passed using next(err), Express skips all regular middleware
 *    and goes directly to this error handler.
 * 4. This centralized error handling ensures consistent logging and response to errors.
 * 5. Placing it last prevents subsequent middleware from interfering with error handling.
 */
app.use(errorMiddleware);

export default app;
