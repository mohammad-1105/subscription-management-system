import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controllers";

const authRouter = Router();

// PATH: api/v1/auth/
authRouter.route("/sign-up").post(signUp);
authRouter.route("/sign-in").post(signIn);
authRouter.route("/sign-out").post(signOut);

export default authRouter;
