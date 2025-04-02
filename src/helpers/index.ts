import { Sequelize } from "sequelize";

export const getEnvVar = (envVar: string): string => {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(`missing env variable: ${envVar}`);
  }
  return value;
};

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: getEnvVar("DB_HOST"),
  port: parseInt(getEnvVar("DB_PORT"), 10),
  username: getEnvVar("DB_USERNAME"),
  password: getEnvVar("DB_PASSWORD"),
  database: getEnvVar("DB_NAME"),
  logging: false,
});

export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connection succeeded");
  } catch (error) {
    throw new Error(`db connection failed: ${error}`);
  }
};
