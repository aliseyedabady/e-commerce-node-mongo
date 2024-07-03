import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import { AuthController } from "../controllers";

const api = Router();

api.get("/admin/login", AuthController.adminLogin);
api.use("/admin", AdminMiddleware);

export default api;
