import mongoose from "mongoose";
import config from "./env";
import { softDeletePlugin } from "../plugins";

mongoose.plugin(softDeletePlugin)

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI, {
      dbName: config.DB_NAME,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
