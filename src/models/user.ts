import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import { getEnvVar, sequelize } from "../helpers";

export interface IUser {
  email: string;
  id: number;
  password: string;
  role: string;
}

class User extends Model implements IUser {
  id!: number;
  email!: string;
  password!: string;
  role!: "admin" | "client";
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "client"),
      allowNull: false,
      defaultValue: "client",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
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
        role: "admin",
      });
      console.log("user table populaton succeeded");
    }
  } catch (error) {
    console.error(`user table sync/populate failed: ${error}`);
    process.exit(1);
  }
})();

export default User;
