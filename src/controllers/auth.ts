import { Request, Response } from "express";
import { generateOTP, ResponseHandler } from "../utils";
import User from "../models/User";
import moment from "moment";
import config from "../config/env";

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
        return ResponseHandler.success(res, {});
      }
    } catch (error) {}
  }
}

export default new AuthController();
