import jwt from 'jsonwebtoken';
import { config } from './../config/config.js';



export const createAccessToken = ({ userid, role }) => {
    const accessToken = jwt.sign(
        { userid, role },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: '15Min' }
    )
    return accessToken;
}

export const createRefreshToken = ({ userid, role }) => {
    const refreshToken = jwt.sign(
        { userid, role },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: '7Days' }
    )
    return refreshToken;
}