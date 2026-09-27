import bcrypt from 'bcryptjs';
import User from './../models/user.model.js';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from './../utils/auth.utils.js';

export const handleRegister = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            message: "User with this email already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        name,
        passwordHash: hashPassword
    })

    const { passwordHash, ...user } = newUser.toObject();



    return res.status(201).json({
        message: "User created",
        data: user
    })
}

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: "User is not registered"
        })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    });

    await User.findByIdAndUpdate(user._id, {
        refreshToken: await bcrypt.hash(refreshToken, 10)
    })

    return res.status(201).json({
        message: "User Logged in",
        data: {
            accessToken
        }
    })
}

export const hydrateUser = async (req, res) => {
    const { userId, role } = req.user;
    const user = await User.findById(userId);
    return res.status(200).json({
        message: "User data fetched successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            }
        }
    })
}


export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required."
        })
    }
    try {
        const decoded = verifyRefreshToken(refreshToken);
        const { userId, role } = decoded;
        const user = await User.findById(userId);

        const isValidRefreshToken =  bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValidRefreshToken) {
            await User.findByIdAndUpdate(user._id, {
                refreshToken: null
            })
            return res.status(401).status({
                message: "Refresh token mismatch"
            })
        }

        const accessToken = createAccessToken({
            userId,
            role
        });
        const newRefreshToken = createRefreshToken({
            userId,
            role
        })

        await User.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        })

        res.cookie("refreshToken", newRefreshToken);

        return res.status(200).json({
            message: "Tokens rotated successfully",
            data: {
                accessToken
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}


export const handleLogout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required."
        })
    }

    try {
        const { userId } = refreshToken;
        const user = User.findById(userId);
        await User.findByIdAndUpdate(user._id, {
            refreshToken: null
        });
        res.clearCookie("refreshToken");
        return res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}