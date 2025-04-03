import bcrypt from "bcrypt";
import { getEnvVar } from "../helpers";
import { getRedisClient } from "../helpers";
import Post from "../models/post";
import { Request, Response } from "express";
import User from "../models/user";

const syncDb = async (_req: Request, res: Response): Promise<any> => {
  try {
    if (getEnvVar("ENV") === "dev") {
      await User.sync({ force: true });
      console.log("user table synced (forced)");

      const email = getEnvVar("ADMIN_EMAIL");
      const password = getEnvVar("ADMIN_PASSWORD");
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(getEnvVar("BCRYPT_SALT"), 10),
      );
      await User.create({
        email,
        password: hashedPassword,
        role: "admin",
      });
      console.log("user table population succeeded");

      await Post.sync({ force: true });
      console.log("posts table synced (forced)");

      const redis = await getRedisClient();
      redis.del("posts");
      console.log("posts cache deleted");
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(`failed to sync/populate tables: ${error}`);
    return res.sendStatus(500);
  }
};

export default syncDb;
