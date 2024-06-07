import SQ from "sequelize";
import sequelize from "../db/database";
import { deflate } from "zlib";

const DataTypes = SQ.DataTypes;

export interface user_likeType {
  user_id: number;
  post_id: number;
}

export interface user_likeAttributes extends user_likeType {}

class User_Like extends SQ.Model {
  user_id!: number;
  post_id!: number;
}

User_Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user_like",
    tableName: "user_likes",
    timestamps: false,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export default User_Like;
