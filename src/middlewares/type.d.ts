import { Request } from "express";
import { IUser } from "../interfaces";

export interface RequestUser extends Request {
  user?: IUser;
}
