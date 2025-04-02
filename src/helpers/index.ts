import { JwtPayload } from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { Request } from "express";
import { Sequelize } from "sequelize";
import { slowDown } from "express-slow-down";

export const getEnvVar = (envVar: string): string => {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(`missing env variable: ${envVar}`);
  }
  return value;
};

export const sequelize = new Sequelize({
  database: getEnvVar("DB_NAME"),
  dialect: "postgres",
  host: getEnvVar("DB_HOST"),
  logging: false,
  password: getEnvVar("DB_PASSWORD"),
  port: parseInt(getEnvVar("DB_PORT"), 10),
  username: getEnvVar("DB_USERNAME"),
});

export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connection succeeded");
  } catch (error) {
    throw new Error(`db connection failed: ${error}`);
  }
};

export interface IRequestWithUser extends Request {
  user?: JwtPayload | string;
}

export const rateLimiter = rateLimit({
  legacyHeaders: false,
  max: parseInt(getEnvVar("RATE_LIMITER_MAX"), 10),
  message: "too many requests",
  standardHeaders: true,
  windowMs: parseInt(getEnvVar("RATE_LIMITER_WINDOW_MS"), 10),
});

export const speedLimiter = slowDown({
  delayAfter: parseInt(getEnvVar("SPEED_LIMITER_DELAY_AFTER"), 10),
  delayMs: (hits) => hits * parseInt(getEnvVar("SPEED_LIMITER_DELAY_MS"), 10),
  windowMs: parseInt(getEnvVar("SPEED_LIMITER_WINDOW_MS"), 10),
});
