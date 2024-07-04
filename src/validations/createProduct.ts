import { body } from "express-validator";

export const createProductValidation = [
  body("title")
    .isString()
    .withMessage(() => "Title is required!"),
  body("price").isNumeric().withMessage("Price is required!"),
  body("description").isString().withMessage("Description is required!"),
  body("categoryId").isString().withMessage("Category is required!"),
];
