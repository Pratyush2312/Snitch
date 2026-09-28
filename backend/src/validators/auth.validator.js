import { body, validationResult } from 'express-validator';

export const registerValidator = [
    body('email')
        .exists().withMessage("Email is Required").bail()
        .isEmail().withMessage("Enter valid email address"),
    body('name')
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a String").bail()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name length must be between 2 to 50 characters"),
    body('password')
        .exists().withMessage("Password is required").bail()
        .isString("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage(
            "Password must be at least 6 characters and contain an uppercase letter, lowercase letter, number, and special character"
        ),
    body('confirmPassword')
        .exists().withMessage("Confirm your password")
        .custom((value, { req }) => {
            return value === req.body.password
        }).withMessage("Passwords do not match"),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            })
        }

        next();
    }
]


export const loginValidator = [
    body('email')
        .exists().withMessage("Email is required").bail()
        .isEmail().withMessage("Enter valid email address"),
    body('password')
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be of atleast 6 characteres"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }
        next();
    }

]