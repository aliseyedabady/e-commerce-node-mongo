import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import { AuthController } from "../controllers";
import { adminLoginValidation, signupValidation } from "../validations";
import config from "../config/env";

const api = Router();

if (config.MODE === "development") {
  api.post("/signup", signupValidation, AuthController.signup);
}
api.post("/admin/login", adminLoginValidation, AuthController.adminLogin);

export default api;
