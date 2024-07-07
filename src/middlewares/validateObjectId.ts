import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ResponseHandler } from "../lib";

export const validateObjectIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return ResponseHandler.badRequest(res, "Invalid ID format!");
  }
  next();
};
