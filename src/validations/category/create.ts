import { body } from "express-validator";
import { checkExist, checkUnique } from "../../lib";
import { Category } from "../../models";

export const createCategoryValidation = [
  body("name")
    .isString()
    .withMessage(() => "Name is required!")
    .custom(async (value) => {
      await checkUnique({
        model: Category,
        key: "name",
        value,
        message: "Name is already use!",
      });
    }),

  body("parentId").custom(async (value) => {
    await checkExist({
      model: Category,
      key: "_id",
      message: "Parent not forund!",
      value,
    });
  }),
];
