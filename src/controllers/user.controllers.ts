import type { Request, Response, NextFunction } from "express";
import { User, type IUser } from "../models/user.model";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users: IUser[] | null = await User.find();

    if (!users) {
      throw new ApiError(404, "No users found", []);
    }

    res.status(200).json(
      new ApiResponse(200, "Users fetched successfully", {
        users,
      })
    );
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the id from the params
    const { id } = req.params;

    // validate the id
    if (!id) {
      throw new ApiError(400, "Id is required", []);
    }

    const user: IUser | null = await User.findById({ _id: id }).select(
      "-password"
    );

    if (!user) {
      throw new ApiError(404, "User not found", []);
    }

    res.status(200).json(
      new ApiResponse(200, "User fetched successfully", {
        user,
      })
    );
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser };
