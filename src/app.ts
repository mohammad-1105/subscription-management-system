import express from "express";

const app = express();

// routes import
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import subscriptionRouter from "./routes/subscription.routes";

// app version 1
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export default app;
