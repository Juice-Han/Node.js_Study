import SQ from "sequelize";
import sequelize from "../db/database.js";
import { dbType } from "./index.js";

const DataTypes = SQ.DataTypes;

export interface CommentType {
  content: string;
}

export interface CommentAttributes {
  user_id: number;
  post_id: number;
}

class Comment extends SQ.Model {
  public id!: number;
  public user_id!: number;
  public post_id!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comment",
    tableName: "comments",
    timestamps: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Comment.belongsTo(db.User, { as: "user" });
  db.Comment.belongsTo(db.Board, { as: "board" });
};

export default Comment;
