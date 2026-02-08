// src/controllers/auth.controller.js

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { sign } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');

/* Register a new user */
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return errorResponse(res, 400, 'Username, email, and password are required');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 400, 'Email already in use');
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'Staff' // Default role is 'Staff'
        });

        // Generate JWT token
        const token = sign({ id: newUser._id, email: newUser.email, role: newUser.role });

        return successResponse(res, {
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return errorResponse(res, 500, 'Server error during registration');
    }
};

/* Login user */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return errorResponse(res, 400, 'Email and password are required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, 400, 'Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 400, 'Invalid email or password');
        }

        // Generate JWT token
        const token = sign({ id: user._id, email: user.email, role: user.role });

        return successResponse(res, {
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse(res, 500, 'Server error during login');
    }
};

/* Get current logged-in user profile */
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }
        return successResponse(res, { user });
    } catch (error) {
        console.error('Profile retrieval error:', error);
        return errorResponse(res, 500, 'Server error retrieving profile');
    }
};

