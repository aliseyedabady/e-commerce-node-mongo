import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model<ICategory, mongoose.PaginateModel<ICategory>>(
  "Category",
  categorySchema
);
export default Category;
