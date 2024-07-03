import { Request, Response } from "express";
import { generateOTP, ResponseHandler } from "../lib";
import User from "../models/User";
import moment from "moment";
import config from "../config/env";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../lib";
import { validationResult } from "express-validator";

class AuthController {
  async sendOTP(req: Request, res: Response) {
    const { mobile } = req.body;
    try {
      let user = await User.findOne({ mobile });
      if (!user) {
        user = new User({
          mobile,
        });
        await user.save();
      }
      if (
        user.otp &&
        user.otp.expiresAt &&
        moment(user.otp.expiresAt).isBefore(moment())
      ) {
        return ResponseHandler.badRequest(
          res,
          `SMS sent! Please request after ${config.OTP_MIN_EXPIRE}`
        );
      }
      // Send the OTP to the user via email or SMS here

      const code = generateOTP();
      user.otp = {
        code,
        expiresAt: moment().add(config.OTP_MIN_EXPIRE, "minutes").toDate(),
      };
      return ResponseHandler.success(res, { code }, "SMS send successfully!");
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
  async verifyOTPAndLogin(req: Request, res: Response) {
    const { mobile, otp } = req.body;
    try {
      const user = await User.findOne({ mobile });
      if (!user) {
        return ResponseHandler.notFound(res, "Mobile Not Found!");
      }
      if (
        user.otp &&
        user.otp.code === otp &&
        moment(user.otp.expiresAt).isAfter(moment())
      ) {
        user.otp = undefined;
        await user.save();
        const token = generateAccessToken(user);

        return ResponseHandler.success(res, { token });
      }
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      if (!refreshToken) return ResponseHandler.unauthorized(res);
      jwt.verify(refreshToken, config.JWT_SECRET, (err: any, user: any) => {
        if (err) return ResponseHandler.unauthorized(res);
        const newAccessToken = generateAccessToken(user);
        ResponseHandler.success(res, { accessToken: newAccessToken });
      });
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }

  async adminLogin(req: Request, res: Response) {
    const { mobile, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseHandler.validationError(res, errors);
      }
      const user = await User.findOne({ mobile });
      if (!user) {
        return ResponseHandler.badRequest(res, "mobile or password is wrong!");
      }
      if (user && !user.isAdmin) {
        return ResponseHandler.badRequest(res, "mobile or password is wrong!");
      }
      if (user.matchPassword) {
        const checkPassword = await user.matchPassword(password);
        if (checkPassword) {
          const newAccessToken = generateAccessToken(user);
          ResponseHandler.success(res, { accessToken: newAccessToken });
        } else {
          return ResponseHandler.badRequest(
            res,
            "mobile or password is wrong!"
          );
        }
      }
      return ResponseHandler.badRequest(res, "mobile or password is wrong!");
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseHandler.validationError(res, errors);
      }
      const user = new User(req.body);
      await user.save();
      ResponseHandler.success(res, user);
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
}

export default new AuthController();
