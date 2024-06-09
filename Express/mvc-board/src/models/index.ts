import User, { associate as associateUser } from "./user.js";
import Board, { associate as associateBoard } from "./board.js";
import Comment, { associate as associateComment } from "./comment.js";
import UserLike, { associate as associateUserLike } from "./user_like.js";
export * from "../db/database.js";

const db = {
  User,
  Board,
  Comment,
  UserLike,
};

associateUser(db);
associateBoard(db);
associateComment(db);
associateUserLike(db);

export type dbType = typeof db;
