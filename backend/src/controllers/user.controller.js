//src/controllers/user.controller.js 

const User = require('../models/user.model');
const Role = require('../models/role.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new user */
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Basic validation
        if (!name || !email || !password || !role) {
            return res.status(400).json(errorResponse('All fields are required'));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json(errorResponse('Email already in use'));
        }

        const userRole = await Role.findOne({ name: role });
        if (!userRole) {
            return res.status(400).json(errorResponse('Invalid role specified'));
        }

        const newUser = new User({
            name,
            email,
            password, // hashed in pre-save hook in  user.model.js
            role: userRole._id
        });

        // log activity
        await activityLogService.logActivity({
            userId: req.user._id,
            action: 'create_user',
            details: `Created user with email: ${email}`
        });

        await newUser.save();
        res.status(201).json(successResponse('User created successfully', newUser));
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json(errorResponse('Server error while creating user'));
    }
};

/* Get all users */
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('role', 'name');
        res.status(200).json(successResponse('Users retrieved successfully', users));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json(errorResponse('Server error while fetching users'));
    }
};

/* Get user by ID */
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).populate('role', 'name');
        if (!user) {
            return res.status(404).json(errorResponse('User not found'));
        }

        res.status(200).json(successResponse('User retrieved successfully', user));
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json(errorResponse('Server error while fetching user'));
    }
};

/* Update user */
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name, email, password, role } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(errorResponse('User not found'));
        }
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json(errorResponse('Email already in use'));
            }   
        }
        if (role) {
            const userRole = await Role.findOne({ name: role });
            if (!userRole) {
                return res.status(400).json(errorResponse('Invalid role specified'));
            }
            user.role = userRole._id;
        }
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password; // hashed in pre-save hook in user.model.js
        }   
        // log activity
        await activityLogService.logActivity({
            userId: req.user._id,
            action: 'update_user',
            details: `Updated user with email: ${user.email}`
        });
        await user.save();
        res.status(200).json(successResponse('User updated successfully', user));
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json(errorResponse('Server error while updating user'));
    }       
};

/* Delete user */
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(errorResponse('User not found'));
        }       
        // log activity
        await activityLogService.logActivity({
            userId: req.user._id,   
            action: 'delete_user',
            details: `Deleted user with email: ${user.email}`
        });
        await user.remove();
        res.status(200).json(successResponse('User deleted successfully'));
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json(errorResponse('Server error while deleting user'));
    }
};

