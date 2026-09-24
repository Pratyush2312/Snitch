import bcrypt from 'bcryptjs';
import User from './../models/user.model.js';
import { createAccessToken, createRefreshToken } from './../utils/auth.utils.js';

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
        userid: user._id,
        role: user.role
    })

    const refreshToken = createRefreshToken({
        userid: user._id,
        role: user.role
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    });

    await User.findByIdAndUpdate(user._id, {
        refreshToken
    })

    return res.status(201).json({
        message: "User Logged in",
        data: {
            accessToken
        }
    })
}

export const hydrateUser = async (req, res) => {
    console.log(req.user);
}


