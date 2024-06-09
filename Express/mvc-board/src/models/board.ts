import SQ from "sequelize";
import sequelize from "../db/database.js";
import { dbType } from "./index.js";

const DataTypes = SQ.DataTypes;

export interface BoardType {
  title: string;
  content: string;
}

export interface BoardAttributes extends BoardType {
  id: number;
}

class Board extends SQ.Model {
  public id!: number;
  public title!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "board",
    tableName: "boards",
    timestamps: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Board.hasMany(db.Comment, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  db.Board.hasMany(db.UserLike, { onDelete: "CASCADE", onUpdate: "CASCADE " });
  db.Board.belongsTo(db.User, { as: "user" });
};

export default Board;
