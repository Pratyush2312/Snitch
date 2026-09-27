import { body, validationResult } from "express-validator";

export const addToCartValidator = [
    body('productID')
        .exists().withMessage("Product ID is required").bail()
        .isString().withMessage("Product ID must be a string").bail()
        .isMongoId().withMessage("Product ID must be a valid Mongo ID"),

    body('quantity')
        .exists().withMessage("Quantity is required").bail()
        .isInt({ min: 1 }).withMessage("Quantity must be an integer greater than 0"),

    body('size')
        .exists().withMessage("Size is required").bail()
        .isString().withMessage("Size must be string").bail()
        .isIn(["XS", "S", "M", "L", "XL"]).withMessage("Size must be one of XS,S,M,L,XL"),

    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(400).json({
                message: "Invalid Request",
                errors:errors.array()
            })
        }
        next();
    }
]