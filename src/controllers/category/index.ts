import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseHandler } from "../../lib";
import { Category } from "../../models";

class CategoryController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors);
    }
    try {
      const category = new Category(req.body);
      await category.save();
      return ResponseHandler.success(res, category);
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const categories = await Category.paginate(
        {},
        { page: +page, limit: +limit }
      );
      return ResponseHandler.success(res, categories);
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
  async findOne(req: Request, res: Response) {
    try {
      const category = await Category.findById(req.params.id).exec();
      return category
        ? ResponseHandler.success(res, category)
        : ResponseHandler.notFound(res);
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const category = await Category.findById(id);
      if (category) {
        const categoryUpdated = await Category.findByIdAndUpdate(
          id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );
        return ResponseHandler.success(res, categoryUpdated);
      }
      return ResponseHandler.notFound(res);
    } catch (error) {
      return ResponseHandler.error(res, error);
    }
  }
  async delete() {}
}

export default new CategoryController();
