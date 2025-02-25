import { IUser } from "../models/user.model";

declare module "express" {
  interface Request {
    user?: IUser; // Optional because it’s only set after auth middleware
  }
}
