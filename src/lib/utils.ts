import jwt from "jsonwebtoken";
import config from "../config/env";
import { IUser } from "../interfaces";

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );
};
export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.JWT_SECRET, {
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
