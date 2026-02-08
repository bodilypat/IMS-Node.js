//src/controllers/saleReturn.controller.js 

const Sale = require('../models/sale.model');
const Product = require('../models/product.model');
const { successResponse, errorResponse } = require('../utils/response');
cosnt activityLogService = require('../services/activityLog.service');

/* Create sale return */
exports.createSaleReturn = async (req, res, next) => {
    try {
        const { saleId, returnedProducts, reason } = req.body;

        // Validate input
        if (!saleId || !returnedProducts || returnedProducts.length === 0) {
            return res.status(400).json(errorResponse('Sale ID and returned products are required'));
        }

        // Fetch the original sale
        const sale = await Sale.findById(saleId).populate('products.product');
        if (!sale) {
            return res.status(404).json(errorResponse('Sale not found'));
        }

        // Process each returned product
        for (const returnedProduct of returnedProducts) {
            const { productId, quantity } = returnedProduct;

            // Find the product in the original sale
            const saleProduct = sale.products.find(p => p.product._id.toString() === productId);
            if (!saleProduct) {
                return res.status(400).json(errorResponse(`Product with ID ${productId} not found in the original sale`));
            }
            if (quantity > saleProduct.quantity) {
                return res.status(400).json(errorResponse(`Return quantity for product ID ${productId} exceeds the quantity sold`));
            }
            // Update the product stock
            const product = await Product.findById(productId);
            product.stock += quantity;
            await product.save();
        }
        // Create a sale return record (you can create a separate model for this if needed)
        const saleReturn = new SaleReturn({
            sale: saleId,
            returnedProducts,
            reason,
            createdBy: req.user._id
        });
        await saleReturn.save();

        // Log the activity
        await activityLogService.logActivity({
            userId: req.user._id,
            action: 'Created sale return',
            details: `Sale ID: ${saleId}, Returned Products: ${JSON.stringify(returnedProducts)}, Reason: ${reason}`
        });
        res.status(201).json(successResponse('Sale return created successfully', saleReturn));
    } catch (error) {
        next(error);
    }
};

/* Get sale return details */
exports.getSaleReturnDetails = async (req, res, next) => {
    try {
        const { saleReturnId } = req.params;
        const saleReturn = await SaleReturn.findById(saleReturnId).populate('sale').populate('returnedProducts.product');
        if (!saleReturn) {
            return res.status(404).json(errorResponse('Sale return not found'));
        }
        res.status(200).json(successResponse('Sale return details retrieved successfully', saleReturn));
    } catch (error) {
        next(error);
    }
};

/* List all sale returns */
exports.listSaleReturns = async (req, res, next) => {
    try {
        const saleReturns = await SaleReturn.find().populate('sale').populate('returnedProducts.product');
        res.status(200).json(successResponse('Sale returns retrieved successfully', saleReturns));
    } catch (error) {
        next(error);
    }
};

/* Delete a sale return */
exports.deleteSaleReturn = async (req, res, next) => {
    try {
        const { saleReturnId } = req.params;
        const saleReturn = await SaleReturn.findById(saleReturnId);
        if (!saleReturn) {
            return res.status(404).json(errorResponse('Sale return not found'));
        }
        // Update the product stock back to original
        for (const returnedProduct of saleReturn.returnedProducts) {
            const product = await Product.findById(returnedProduct.product);
            product.stock -= returnedProduct.quantity;
            await product.save();
        }
        await saleReturn.remove();
        // Log the activity
        await activityLogService.logActivity({
            userId: req.user._id,
            action: 'Deleted sale return',
            details: `Sale Return ID: ${saleReturnId}`
        });
        res.status(200).json(successResponse('Sale return deleted successfully'));
    } catch (error) {
        next(error);
    }
};

