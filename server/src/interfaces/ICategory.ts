import { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  parentId?: typeof Schema.Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
