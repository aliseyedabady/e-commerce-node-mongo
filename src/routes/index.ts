import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import { AuthController } from "../controllers";
import { adminLoginValidation } from "../validations";

const api = Router();

api.post("/admin/login", adminLoginValidation, AuthController.adminLogin);
// api.use("/admin", AdminMiddleware);

export default api;
