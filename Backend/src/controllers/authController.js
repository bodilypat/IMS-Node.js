//src/controllers/authController.js      

const asyncHandler = require('express-async-handler');
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, role  } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }
    const userExists = await UserService.findUserByEmail(email);
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await UserService.createUser({ username, email, password, role });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }
    const user = await UserService.findUserByEmail(email);
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
};

