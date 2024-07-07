import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseHandler } from "../../lib";
import { Image, Product } from "../../models";

class ProductController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const product = new Product(req.body);
      await product.save();
      if (req.files && Array.isArray(req.files)) {
        const imageDocs = req?.files?.map(
          (file) =>
            new Image({
              url: `/uploads/${file.filename}`,
              productId: product._id,
            })
        );
        await Image.insertMany(imageDocs);

        return ResponseHandler.success(res, { ...product, imageDocs });
      }
      return ResponseHandler.success(res, product);
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
