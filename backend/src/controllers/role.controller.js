//src/controllers/role.controller.js 

const Role = require('../models/role.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new role */
exports.createRole = async (req, res, next) => {
    try {
        const { name, permissions } = req.body;

        if (!name) {
            return res.status(400).json(errorResponse('Role name is required'));
        }

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json(errorResponse('Role name already exists'));
        }

        const role = Role.create({
            name,
            permissions: permissions || [],
        });

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'create_role',
            details: `Created role: ${name}`,
        });

        res.status(201).json(successResponse(role));
    } catch (error) {
        next(error);
    }
};

/* Get all roles */
exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find();
        res.json(successResponse(roles));
    } catch (error) {
        console.error('Error fetching roles:', error);
        next(error);
    }
};

/* Get a role by ID */
exports.getRoleById = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json(errorResponse('Role not found'));
        }

        res.json(successResponse(role));
    } catch (error) {
        console.error('Error fetching role:', error);
        next(error);
    }
};

/* Update a role (name or permissions) */
exports.UpdateRole = async (req, res, next) => {
    try {
        const updates = req.body;
        const role = await Role.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!role) {
            return res.status(404).json(errorResponse('Role not found'));
        }

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'update_role',
            details: `Updated role: ${role.name}`,
        });
        res.json(successResponse(role));
    } catch (error) {
        next(error);    
    }
};

/* Delete a role */
exports.deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);   
        if (!role) {
            return res.status(404).json(errorResponse('Role not found'));
        }

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'delete_role',
            details: `Deleted role: ${role.name}`,
        });
        res.json(successResponse({ message: 'Role deleted successfully' }));
    } catch (error) {
        next(error);
    }
};

/* Assign permissions to a role */
exports.assignPermissions = async (req, res, next) => {
    try {
        const { permissions } = req.body;
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json(errorResponse('Role not found'));
        }
        role.permissions = permissions;
        await role.save();

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'assign_permissions',
            details: `Assigned permissions to role: ${role.name}`,
        });
        res.json(successResponse(role));
    } catch (error) {
        console.error('Error assigning permissions:', error);
        next(error);
    }
};

