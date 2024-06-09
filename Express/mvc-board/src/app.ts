import express, { NextFunction, Request, Response } from "express";
import {config} from "./config.js";
import { sequelize } from "./models/index.js";
import User from "./models/user.js";

const app = express();

sequelize.sync({force: false}).then(() => {
    console.log("Connect!");
});

app.listen(config.port)
