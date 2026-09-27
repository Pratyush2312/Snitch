import { body, param, validationResult } from "express-validator";

export const createProductValidator = [
    body('title')
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be string").bail()
        .isLength({ min: 2, max: 100 }).withMessage("Title length must be between 2 to 100 characters").bail()
        .isAlpha("en-US", { ignore: " -" }).withMessage("Title can only have english smallcase and capitalcase characters"),

    body('description')
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description is required").bail()
        .isLength({ min: 20, max: 500 }).withMessage("Description length must be between 20 and 500 characters"),

    body('price.amount')
        .exists().withMessage("Price amount is required").bail()
        .isFloat({ min: 0 }).withMessage("Price amount must be a floating number and must be greater than 0"),

    body('price.currency')
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a string").bail()
        .isIn(["INR", "USD"]).withMessage("Currency can either be INR or USD"),

    body('sizes')
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("Sizes must be array of objects"),

    body("sizes.*.size")
        .exists().withMessage("Size must be present in every entry of sizes array").bail()
        .isString().withMessage("Size must be astring value").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL"]).withMessage("Sizes can be of XS, S, M, L,XL"),

    body("sizes.*.stock")
        .exists().withMessage("Stock must be present in every entry of stock array").bail()
        .isInt({ min: 0 }).withMessage("Stock must be a integer value"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }
        next()
    }

]

export const updateProductValidator = [
    param('id')
        .exists().withMessage("Product ID is required in params").bail()
        .isMongoId().withMessage("Product ID must be a valid Mongo object ID"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(400).json({
                message: "Invalid Data",
                errors:errors.array()
            })
        }
        next();
    }
]