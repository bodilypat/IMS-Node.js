//src/controllers/category.controller.js 

const Category = require('../models/category.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new category */
exports.createCategory = async (req, res, next) => {
    try {
        const { name, parentId } = req.body;

        if (!name) {
            return res.status(400).json(errorResponse('Category name is required'));
        }

        // Check if category exists 
        const existingCategory = await Category.findOne({ name, parentId: parentId || null });
        if (existingCategory) {
            return res.status(400).json(errorResponse('Category with the same name already exists under the same parent'));
        }

        const category = await Category.create({ 
            name, 
            parentId: parentId || null
        });

        await activityLogService.logActivity(req.user.id, 'create_category', `Created category: ${name}`);
        res.status(201).json(successResponse(category));
    } catch (error) {
        console.error('Error creating category:', error);
        next(error);
    }
};

/* Get all categories */
exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().populate('parentId', 'name');

        // Organize as tree 
        const buildTree = (items, parent = null) => {
            return items.filter(item => String(item.parentId) === String(parent)).map(item => ({
                ...item.toObject(),
                children: buildTree(items, item._id)
            }));
        }
        const categoryTree = buildTree(categories);
        res.json(successResponse(categoryTree));
    } catch (error) {
        console.error('Error fetching categories:', error);
        next(error);
    }
};

/* Get a single category by ID */
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate('parentId', 'name');
        if (!category) {
            return res.status(404).json(errorResponse('Category not found'));
        }
        res.json(successResponse(category));
    } catch (error) {
        console.error('Error fetching category:', error);
        next(error);
    }
};

/* Update a category */
exports.updateCategory = async (req, res, next) => {
    try {
        const { name, parentId } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json(errorResponse('Category not found'));
        }
        if (name) {
            // Check if category exists 
            const existingCategory = await Category.findOne({ name, parentId: parentId || null, _id: { $ne: req.params.id } });
            if (existingCategory) {
                return res.status(400).json(errorResponse('Category with the same name already exists under the same parent'));
            }
            category.name = name;
        }
        if (parentId !== undefined) {
            category.parentId = parentId || null;
        }   
        await category.save();
        await activityLogService.logActivity(req.user.id, 'update_category', `Updated category: ${category.name}`);
        res.json(successResponse(category));
    } catch (error) {
        console.error('Error updating category:', error);
        next(error);
    }
};

/* Delete a category */
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json(errorResponse('Category not found'));
        }

        await activityLogService.logActivity(req.user.id, 'delete_category', `Deleted category: ${category.name}`);
        await category.remove();
        res.json(successResponse(null, 'Category deleted successfully'));
    } catch (error) {
        console.error('Error deleting category:', error);
        next(error);
    }
};

