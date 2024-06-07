import SQ from "sequelize";
import sequelize from "../db/database.js";

const DataTypes = SQ.DataTypes;

export interface UserType {
  nickname: string;
  password: string;
}

export interface UserAttributes extends UserType {
  id: number;
}

class User extends SQ.Model {
  public id!: number;
  public nickname!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export default User;
