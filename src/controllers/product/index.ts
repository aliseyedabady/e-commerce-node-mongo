import { Request, Response } from "express";
import upload from "../../config/multer";
import { ResponseHandler } from "../../lib";
import { validationResult } from "express-validator";

class ProductController {
  async create(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) {
        return ResponseHandler.error(res, err);
      }
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
  async findAll() {}
  async findOne() {}
  async update() {}
  async delete() {}
}

export default new ProductController();
