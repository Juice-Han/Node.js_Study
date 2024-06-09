import express, { NextFunction, Request, Response } from "express";
import { config } from "./config.js";
import { sequelize } from "./models/index.js";
import authRouter from "./router/auth_router.js";

const app = express();

sequelize.sync({ force: false }).then(() => {
  console.log("Connect!");
});

app.use(express.json());

app.use("/auth", authRouter);

app.listen(config.port);
