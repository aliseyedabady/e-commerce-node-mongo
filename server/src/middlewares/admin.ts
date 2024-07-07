import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestUser } from "./type";
import config from "../config/env";
import { ResponseHandler } from "../lib";

export const AdminMiddleware = (
  request: RequestUser,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (token) {
    jwt.verify(
      token.split(" ")[1],
      config.JWT_SECRET,
      (error: any, decoded: any): void => {
        if (error) {
          ResponseHandler.unauthorized(response);
        } else {
          if (decoded && decoded.isAdmin) {
            request.user = decoded;
            next();
          } else {
            ResponseHandler.unauthorized(response);
          }
        }
      }
    );
  } else {
    return ResponseHandler.unauthorized(response);
  }
};
