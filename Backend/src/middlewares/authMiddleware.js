//src/middleware/authMiddleware.js 

const jwt = require('jsonwebtoken');
const asyyncHandler = require('express-async-handler');
const User = require('../models/userModel');
require('dotenv').config();

// Protect routes 
const protect = asyyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401);
                throw new Error('User not found');
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };

