import SQ from "sequelize";
import sequelize from "../db/database.js";
import { dbType } from "./index.js";

const DataTypes = SQ.DataTypes;

export interface userLikeType {
  user_id: number;
  post_id: number;
}

export interface userLikeAttributes extends userLikeType {}

class UserLike extends SQ.Model {
  user_id!: number;
  post_id!: number;
}

UserLike.init(
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
    modelName: "userLike",
    tableName: "userLikes",
    timestamps: false,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.UserLike.belongsTo(db.User, { as: "user" });
  db.UserLike.belongsTo(db.Board, { as: "board" });
};

export default UserLike;
