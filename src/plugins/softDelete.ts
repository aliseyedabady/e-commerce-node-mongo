import { Schema, Query } from "mongoose";

export const softDeletePlugin = (schema: Schema): void => {
  schema.add({ isDeleted: { type: Boolean, default: false } });
  const excludeDeletedItems = function (this: Query<any, any>) {
    this.where({ isDeleted: { $ne: true } });
  };
  schema.pre<Query<any, any>>("find", excludeDeletedItems);
  schema.pre<Query<any, any>>("findOne", excludeDeletedItems);
  schema.pre<Query<any, any>>("findOneAndUpdate", excludeDeletedItems);
  schema.pre<Query<any, any>>("countDocuments", excludeDeletedItems);
  schema.statics.softDeleteById = async function (id: string) {
    return this.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  };
};
