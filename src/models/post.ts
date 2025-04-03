import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers";
import User from "./user";

interface IPost {
  content: string;
  id: string;
  rating: "0" | "1" | "2" | "3" | "4" | "5";
  user_id: string;
}

class Post extends Model implements IPost {
  content!: string;
  id!: string;
  rating!: "0" | "1" | "2" | "3" | "4" | "5";
  user_id!: string;
}

Post.init(
  {
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    rating: {
      allowNull: false,
      defaultValue: "0",
      type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
    },
    user_id: {
      allowNull: false,
      references: {
        key: "id",
        model: User,
      },
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
  },
);

User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

export default Post;
