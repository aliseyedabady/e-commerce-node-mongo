import mongoose, { Document } from "mongoose";

export interface IImage extends Document {
  url: string;
  title?: string;
  description?: string;
  productId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
