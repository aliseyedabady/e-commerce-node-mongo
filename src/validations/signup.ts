import { body } from "express-validator";
import { checkUnique } from "../lib";
import { User } from "../models";

export const signupValidation = [
  body("email")
    .isEmail()
    .withMessage(() => "Email is not valid!")
    .custom(async (value) => {
      await checkUnique({
        model: User,
        value,
        key: "email",
        message: "Email is already use!",
      });
    }),
  body("mobile")
    .isString()
    .withMessage(() => "Mobile is required!")
    .isMobilePhone("any")
    .withMessage(() => "Mobile is not valid!")
    .custom(async (value) => {
      await checkUnique({
        model: User,
        value,
        key: "mobile",
        message: "Mobile is already use!",
      });
    }),
  body("password")
    .isString()
    .withMessage(() => "Password is required.")
    .isLength({ min: 6 })
    .withMessage(() => "Min length is 6 character."),
  body("isAdmin")
    .isBoolean()
    .withMessage(() => "isAdmin is required!"),
];
