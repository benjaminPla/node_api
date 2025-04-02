import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers";
import User from "./user";

export interface IPost {
  id: number;
  user_id: number;
  content: string;
  rating: "0" | "1" | "2" | "3" | "4" | "5";
}

class Post extends Model implements IPost {
  id!: number;
  user_id!: number;
  content!: string;
  rating!: "0" | "1" | "2" | "3" | "4" | "5";
}

Post.init(
  {
    user_id: {
      allowNull: false,
      references: {
        key: "id",
        model: User,
      },
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rating: {
      allowNull: false,
      defaultValue: "0",
      type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
    },
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: false,
  },
);

User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

export default Post;
