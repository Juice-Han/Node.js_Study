import express, { NextFunction, Request, Response } from "express";
import {config} from "./config.js";

const app = express();

app.listen(config.port)