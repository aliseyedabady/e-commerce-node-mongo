import { Schema } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  title: string;
  price: number;
  description: string;
  categoryId: typeof Schema.Types.ObjectId;
  ownerId: typeof Schema.Types.ObjectId;
  off?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
