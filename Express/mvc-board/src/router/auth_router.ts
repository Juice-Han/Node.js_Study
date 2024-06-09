import express from "express";
import * as authController from "../controller/auth_controller.js"

const router = express.Router();

// POST /auth/signup
router.post('/signup',authController.signup);

export default router;