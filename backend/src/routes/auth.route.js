import express from "express";
import { loginValidator, registerValidator } from '../validators/auth.validator.js'
import { handleLogin, handleRegister, hydrateUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', registerValidator, handleRegister);
router.post('/login', loginValidator, handleLogin);
router.post('/me', authMiddleware, hydrateUser);
router.post('/refresh-token',)

export default router;