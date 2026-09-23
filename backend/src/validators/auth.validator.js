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
        .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),

    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.json({
                message: "Invalid request",
                errors:errors.array() 
            })
        }

        next();
    }
]

