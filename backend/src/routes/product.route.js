import express from 'express';
import { authMiddleware } from './../middleware/auth.middleware.js';
import { createProduct, listAllProducts } from '../controllers/product.controller.js';
import multer from 'multer';
import { createProductValidator } from '../validators/product.validator.js';
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1024,
        files: 5
    }
})

router.post('/products', authMiddleware, (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "User is not authorized to create product"
        })
    }
    next();
}, upload.array("images"), (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);
    next();
}, createProductValidator, createProduct)


router.get('/products', listAllProducts);

export default router;