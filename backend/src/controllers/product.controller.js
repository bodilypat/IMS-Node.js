//src/controllers/product.controller.js 

const Product = require('../models/product.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new product */
exports.createProduct = async (req, res, next) => {
    try {
        const {
            name,
            sku,
            barcode,
            category,
            subCategory,
            brance,
            costPrice,
            sellingPrice,
            expiryDate,
            reorderLevel,
            unit,
            description,
            images
        } = req.body;
    
        // Basic validation
        if (!name || !sku || !category || !costPrice || !sellingPrice) {
            return res.status(400).json(errorResponse('Name, SKU, Category, Cost Price, and Selling Price are required'));
        }

        const product = await Product.create({
            name,
            sku,
            barcode,
            category,
            subCategory,
            brance,
            costPrice,
            sellingPrice,
            expiryDate,
            reorderLevel,
            unit,
            description,
            images
        });

        // Log activity
        await activityLogService.logActivity(req.user.id, 'CREATE_PRODUCT', `Created product: ${product.name}`);

        res.status(201).json(successResponse(product, 'Product created successfully'));
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json(errorResponse('An error occurred while creating the product'));
    }
};

/* Get all products */
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(successResponse(products, 'Products retrieved successfully'));
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json(errorResponse('An error occurred while fetching products'));
    }
};

/* Get a product by ID */
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json(errorResponse('Product not found'));
        }
        res.status(200).json(successResponse(product, 'Product retrieved successfully'));
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json(errorResponse('An error occurred while fetching the product'));
    }
};

/* Update a product */
exports.updateProduct = async (req, res, next) => {
    try {
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!product) {
            return res.status(404).json(errorResponse('Product not found'));
        }

        // Log activity
        await activityLogService.logActivity(req.user.id, 'UPDATE_PRODUCT', `Updated product: ${product.name}`);
        res.status(200).json(successResponse(product, 'Product updated successfully'));
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json(errorResponse('An error occurred while updating the product'));
    }
};

/* Delete a product */
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json(errorResponse('Product not found'));
        }

        // Log activity
        await activityLogService.logActivity(req.user.id, 'DELETE_PRODUCT', `Deleted product: ${product.name}`);
        res.status(200).json(successResponse(null, 'Product deleted successfully'));
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json(errorResponse('An error occurred while deleting the product'));
    }
};

