import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { getEnvVar, sequelize } from "../helpers";

const User = sequelize.define(
  "User",
  {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  },
);

(async () => {
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
      });
      console.log("user table populaton succeeded");
    }
  } catch (error) {
    console.error(`user table sync/populate failed: ${error}`);
    process.exit(1);
  }
})();

export default User;
