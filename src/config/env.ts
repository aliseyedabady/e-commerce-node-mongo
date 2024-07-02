import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  DB_Name: string;
  OTP_LENGTH: number;
}

const config: EnvConfig = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  DB_Name: process.env.DB_NAME || "",
  OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
};

if (!config.MONGO_URI) {
  throw new Error("Missing MONGO_URI in environment variables");
}

if (!config.DB_Name) {
  throw new Error("Missing DB_NAME in environment variables");
}

export default config;
