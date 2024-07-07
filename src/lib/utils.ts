import jwt from "jsonwebtoken";
import config from "../config/env";
import { IUser } from "../interfaces";
import { TCheckExist, TCheckUnique, TCheckUniqueUpdate } from "./type";

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};
export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.JWT_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};
export const generateOTP = (): string => {
  const otpLength = config.OTP_LENGTH;
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < otpLength; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

export const checkExist = async ({
  model,
  key,
  value,
  message,
}: TCheckExist) => {
  if (value) {
    const result = await model.findOne({ [key]: value }).exec();
    if (!result) {
      throw Promise.reject(message);
    }
  }
};

export const checkUnique = async ({
  value,
  model,
  key,
  message,
}: TCheckUnique) => {
  if (value) {
    const result = await model.findOne({ [key]: value }).exec();
    if (result) {
      return Promise.reject(message);
    }
  }
};

export const checkUniqueUpdate = async ({
  model,
  key,
  value,
  id,
  message,
}: TCheckUniqueUpdate) => {
  const existingProduct = await model.findOne({ [key]: value });

  if (!existingProduct) {
    return true;
  }

  if (id && existingProduct._id.toString() === id) {
    return true;
  }

  return Promise.reject(message);
};
