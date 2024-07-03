import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces";

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

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
