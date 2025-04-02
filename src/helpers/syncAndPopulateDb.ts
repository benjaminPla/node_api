import bcrypt from "bcrypt";
import fs from "fs";
import { getEnvVar, sequelize } from "./";
import path from "path";
import Post from "../models/post";
import User from "../models/user";

export const syncAndPopulateDb = async () => {
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

      const postsFilePath = path.resolve(__dirname, "../../posts.sql");
      const posts = fs.readFileSync(postsFilePath, "utf-8");
      await sequelize.query(posts);
      console.log("posts table population succeeded");
    }
  } catch (error) {
    console.error(`failed to sync/populate tables: ${error}`);
    process.exit(1);
  }
};
