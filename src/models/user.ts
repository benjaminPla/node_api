import { DataTypes } from "sequelize";
import { sequelize } from "../helpers";

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
    await User.sync({ force: true });
    console.log("user table synced (forced)");

    // env var + hash pass
    await User.create({
      email: "rindus@email.com",
      password: "rindus12345",
    });
    console.log("user table populaton succeeded");
  } catch (error) {
    console.error(`user table sync/populate failed: ${error}`);
    process.exit(1);
  }
})();

export default User;
