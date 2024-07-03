import { body } from "express-validator";
import { checkExist } from "../lib";
import { User } from "../models";

export const adminLoginValidation = [
  body("mobile")
    .isString()
    .withMessage(() => "Mobile is required.")
    .matches(
      /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .withMessage(() => "Mobile is not valid.")
    .custom(async (value) => {
      await checkExist({
        model: User,
        key: "mobile",
        value,
        message: "Mobile or Password is wrong!",
      });
    }),
  body("password")
    .isString()
    .withMessage(() => "Password is required.")
    .isLength({ min: 6 })
    .withMessage(() => "Min length is 6 character."),
];
