
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';


export const authMiddleware = (req, res, next) => { 
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing"
            })
        }
        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message:error.message
        })
    }
}