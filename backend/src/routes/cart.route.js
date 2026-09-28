
import express from 'express';
import { addToCartValidator } from '../validators/cart.validator.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/', authMiddleware, addToCartValidator, addToCart);
router.get('/', authMiddleware, getCart);
router.delete("/", authMiddleware, removeFromCart);

export default router;