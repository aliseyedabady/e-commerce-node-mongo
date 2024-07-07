import mongoose, { Schema } from "mongoose";
import { IImage } from "../interfaces";

const imageSchema: Schema<IImage> = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model<IImage>("Image", imageSchema);
export default Image;
