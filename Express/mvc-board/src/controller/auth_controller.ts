import { Request, Response } from "express";
import * as userRepository from "../data/user.js";
import { config } from "../config.js";
import { UserType } from "../models/user.js";
import sequelize from "../db/database.js";
import { QueryTypes } from "sequelize";

type User = {
  nickname: string;
  password: string;
};

export async function signup(req: Request, res: Response) {
  const { nickname, password } = req.body;
  const found = await userRepository.findByNickname(nickname);
  //   const found = await sequelize.query(
  //     "SELECT * FROM users where nickname = ?",
  //     {
  //       replacements: [nickname],
  //       type: QueryTypes.SELECT,
  //     }
  //   );
  if (found) {
    return res.status(409).json({ message: `${nickname} already exists!` });
  }
  const userId: string = await userRepository.createUser({
    nickname,
    password,
  });
  res.status(200).json({ userId });
}
