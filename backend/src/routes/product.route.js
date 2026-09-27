import express from 'express';
import { authMiddleware } from './../middleware/auth.middleware.js';
import { createProduct, deleteProduct, getProductsById, listAllProducts, updateProduct } from '../controllers/product.controller.js';
import multer from 'multer';
import { createProductValidator, updateProductValidator } from '../validators/product.validator.js';
import { authenticateSeller, authorizeSeller } from '../middleware/authSeller.middleware.js';
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1024,
        files: 5
    }
})

router.post('/products', authMiddleware, authenticateSeller, upload.array("images"), (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);
    next();
}, createProductValidator, createProduct)


router.get('/products', listAllProducts);
router.get('/products/:id', getProductsById);
router.put('/products/:id', authMiddleware, authorizeSeller, upload.array("images"), updateProductValidator,
    (req, res, next) => {
        req.body.price = JSON.parse(req.body.price);
        req.body.sizes = JSON.parse(req.body.sizes);
        next();
    },
    createProductValidator, updateProduct)
router.delete('/products/:id', authMiddleware, authorizeSeller, updateProductValidator, deleteProduct)

export default router;