import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controllers";
import { verifyAuth } from "../middlewares/auth.middleware";
const userRouter = Router();

// public routes
userRouter.route("/").get(getUsers);

// protected routes
userRouter.route("/:id").get(verifyAuth, getUser);

export default userRouter;
