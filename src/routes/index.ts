import { Router } from "express";
import { AdminMiddleware } from "../middlewares";
import { AuthController, ProductController } from "../controllers";
import { adminLoginValidation, signupValidation } from "../validations";
import config from "../config/env";
import { createProductValidation } from "../validations/createProduct";
import upload from "../config/multer";

const api = Router();

if (config.MODE === "development") {
  api.post("/signup", signupValidation, AuthController.signup);
}
api.post("/admin/login", adminLoginValidation, AuthController.adminLogin);
api.use("/admin", AdminMiddleware);

api.post(
  "/admin/products",
  upload.array("images", 10),
  createProductValidation,
  ProductController.create
);
api.get("/admin/products", ProductController.findAll);
api.get("/admin/products/:id", ProductController.findOne);
api.put("/admin/products/:id", ProductController.update);
api.delete("/admin/products/:id", ProductController.delete);

export default api;
