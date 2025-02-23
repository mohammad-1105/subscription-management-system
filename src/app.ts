import { ALLOWED_CORS_ORIGINS } from "../config/env";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";

if (!ALLOWED_CORS_ORIGINS)
  throw new Error(
    "Please define the ALLOWED_CORS_ORIGINS environment variable inside .env<development/production>.local"
  );

const app = express();

// express built-in middlewares
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// cookie parser middleware to parse cookies
app.use(cookieParser());

// cors middleware
app.use(
  cors({
    origin:
      ALLOWED_CORS_ORIGINS === "*"
        ? "*" // This might give CORS error for some origins due to credentials set to true
        : ALLOWED_CORS_ORIGINS?.split(","), // For multiple cors origin for production.
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],

    maxAge: 86400,
    optionsSuccessStatus: 200,
  })
);

// routes import
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import subscriptionRouter from "./routes/subscription.routes";

// app version 1
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello World!",
  });
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
