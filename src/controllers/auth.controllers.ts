import type { Request, Response, NextFunction } from "express";
import {
  signInSchema,
  signUpSchema,
  type SignInSchema,
  type SignUpSchema,
} from "../schemas/auth.schemas";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User, type IUser } from "../models/user.model";
import { JWT_SECRET } from "../config/env";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // get the data from the body
    const { name, email, password }: SignUpSchema = req.body;

    // validate the data
    const result = await signUpSchema.safeParseAsync({
      name,
      email,
      password,
    });

    if (!result.success) {
      throw new ApiError(400, result.error.issues[0].message, []);
    }

    // check if the user already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists", []);
    }

    // hash the password
    const hashedPassword: string = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4, // number between 4-31
    });

    // create the user
    const newUsers: IUser[] = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    if (!newUsers.length) {
      throw new ApiError(500, "Failed to create user", []);
    }

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(
      new ApiResponse(201, "User created successfully", {
        token,
        user: newUsers[0],
      })
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the data from the req body
    const { email, password }: SignInSchema = await req.body;

    // validate the data
    const result = await signInSchema.safeParseAsync({
      email,
      password,
    });

    if (!result.success) {
      throw new ApiError(400, result.error.issues[0].message, []);
    }

    // check if the user exists
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "User not found", []);
    }

    // verify the password
    const isPasswordValid: boolean = await Bun.password.verify(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid password", []);
    }

    const token: string = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json(
      new ApiResponse(200, "User logged in successfully", {
        token,
        user,
      })
    );
  } catch (error) {
    next(error);
  }
};
const signOut = () => {};

export { signUp, signIn, signOut };
