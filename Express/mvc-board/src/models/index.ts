import User, { associate as associateUser } from "./user";
import Board, { associate as associateBoard } from "./board";
import Comment, { associate as associateComment } from "./comment";
import UserLike, { associate as associateUserLike } from "./user_like";

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
