import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  DB_Name: string;
  OTP_LENGTH: number;
  OTP_MIN_EXPIRE: number;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  JWT_REFRESH_EXPIRE:string
}

const config: EnvConfig = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  DB_Name: process.env.DB_NAME || "",
  OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
  OTP_MIN_EXPIRE: Number(process.env.OTP_MIN_EXPIRE) || 2,
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "1h",
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "10d",
};

if (!config.MONGO_URI) {
  throw new Error("Missing MONGO_URI in environment variables");
}

if (!config.DB_Name) {
  throw new Error("Missing DB_NAME in environment variables");
}

if (!config.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

export default config;
