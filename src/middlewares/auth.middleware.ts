import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error";
import { JWT_SECRET } from "../config/env";
import { User, type IUser } from "../models/user.model";

// Define the JWT payload interface
interface JwtPayload {
  userId: string;
}

// Verify JWT token and return decoded payload
const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded.userId) {
      throw new ApiError(401, "Token missing userId", []);
    }
    return decoded;
  } catch {
    throw new ApiError(401, "Invalid token", []);
  }
};

// Authentication middleware
export const verifyAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "No token provided, unauthorized access", []);
    }

    // Decode token
    const decodedToken = verifyToken(token);

    // Find user
    const user: IUser | null = await User.findById(decodedToken.userId);

    if (!user) {
      throw new ApiError(401, "User not found, unauthorized access", []);
    }

    // Attach user to req
    req.user = user; // ts recognizes req.user as IUser because we extended Request in src/types/express.d.ts
    next();
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};
