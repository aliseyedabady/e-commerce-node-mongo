import { Request, Response } from "express";
import upload from "../../config/multer";
import { ResponseHandler } from "../../lib";

class ProductController {
  async create(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) {
        return ResponseHandler.error(res, err);
      }
    });
  }
  async findAll() {}
  async findOne() {}
  async update() {}
  async delete() {}
}

export default new ProductController();
