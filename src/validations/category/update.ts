import { body } from "express-validator";
import { checkExist, checkUnique, checkUniqueUpdate } from "../../lib";
import { Category } from "../../models";

export const updateCategoryValidation = [
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

  body("parentId").custom(async (value, { req }) => {
    await checkUniqueUpdate({
      model: Category,
      key: "_id",
      message: "Parent not forund!",
      value,
      id: req.params?.id,
    });
  }),
];
