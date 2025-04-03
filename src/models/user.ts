import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers";

interface IUser {
  email: string;
  id: string;
  password: string;
  role: string;
}

class User extends Model implements IUser {
  email!: string;
  id!: string;
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
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    version: true,
  },
);

export default User;
