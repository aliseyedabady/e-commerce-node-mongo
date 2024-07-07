import { Router } from "express";
import { AdminMiddleware, validateObjectIdMiddleware } from "../middlewares";
import {
  AuthController,
  CategoryController,
  ProductController,
} from "../controllers";
import {
  adminLoginValidation,
  createCategoryValidation,
  createProductValidation,
  signupValidation,
  updateCategoryValidation,
} from "../validations";
import config from "../config/env";
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
api.get(
  "/admin/products/:id",
  validateObjectIdMiddleware,
  ProductController.findOne
);
api.put(
  "/admin/products/:id",
  validateObjectIdMiddleware,
  ProductController.update
);
api.delete("/admin/products/:id", ProductController.delete);

api.post(
  "/admin/categories",
  createCategoryValidation,
  CategoryController.create
);
api.get("/admin/categories", CategoryController.findAll);
api.get(
  "/admin/categories/:id",
  validateObjectIdMiddleware,
  CategoryController.findOne
);
api.put(
  "/admin/categories/:id",
  validateObjectIdMiddleware,
  updateCategoryValidation,
  CategoryController.update
);
api.delete(
  "/admin/categories/:id",
  validateObjectIdMiddleware,
  CategoryController.delete
);

export default api;
