//src/controllers/sales.controller.js 

const Sale = require('../models/sale.model');
const Product = require('../models/product.model');
const { successResponse, errorResponse } = require('../utils/response');
const activitLogService = require('../services/activityLog.service');

/* Create sales order */
exports.createSaleOrder = async (req, res, next) => {
    try {
        const { customer, products, discount = 0, tax = 0 } = req.body;

        if (!customer || !products || products.length === 0) {
            return res.status(400).json(errorResponse('Customer and products are required'));
        }
        let totalAmount = 0;
        // Validate products and calculate total amount
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json(errorResponse(`Product with ID ${item.productId} not found`));
            }
            if (product.stock < item.quantity) {
                return res.status(400).json(errorResponse(`Insufficient stock for product ${product.name}`));
            }
            totalAmount += product.price * item.quantity;
        }
        totalAmount = totalAmount - discount + tax;

        // Create sale order
        const sale = new Sale({
            customer,
            products,
            totalAmount,
            discount,
            tax
        });
        await sale.save();
        // Update product stock
        for (const item of products) {
            await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
        }

        // Log activity        await activitLogService.logActivity({
            action: 'create_sale_order',
            details: `Created sale order for customer ${customer} with total amount ${totalAmount}`
        });

        res.status(201).json(successResponse(sale));
    } catch (error) {
        next(error);
    }
};

/* Get all sales orders */
exports.getAllSalesOrders = async (req, res, next) => {
    try {
        const sales = await Sale.find().populate('products.productId');
        res.status(200).json(successResponse(sales));
    } catch (error) {
        next(error);
    }
};

/* Get sale order by ID */
exports.getSaleOrderById = async (req, res, next) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('products.productId');
        if (!sale) {
            return res.status(404).json(errorResponse('Sale order not found'));
        }
        res.status(200).json(successResponse(sale));
    } catch (error) {
        next(error);
    }
};

/* Update sale order */
exports.updateSaleOrder = async (req, res, next) => {
    try {
        const { customer, products, discount, tax } = req.body;
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json(errorResponse('Sale order not found'));
        }
        // Update fields
        if (customer) sale.customer = customer;
        if (products) {
            let totalAmount = 0;
            for (const item of products) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return res.status(404).json(errorResponse(`Product with ID ${item.productId} not found`));
                }
                if (product.stock < item.quantity) {
                    return res.status(400).json(errorResponse(`Insufficient stock for product ${product.name}`));
                }
                totalAmount += product.price * item.quantity;
            }
            sale.products = products;
            sale.totalAmount = totalAmount - (discount || sale.discount) + (tax || sale.tax);
        }
        if (discount !== undefined) sale.discount = discount;
        if (tax !== undefined) sale.tax = tax;
        await sale.save();

        // Log activity
        await activitLogService.logActivity({
            action: 'update_sale_order',
            details: `Updated sale order with ID ${sale._id}`
        });
        res.status(200).json(successResponse(sale));
    } catch (error) {
        next(error);
    }
};

/* Delete sale order */
exports.deleteSaleOrder = async (req, res, next) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json(errorResponse('Sale order not found'));
        }
        // Update product stock
        for (const item of sale.products) {
            await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
        }
        // Log activity
        await activitLogService.logActivity({
            action: 'delete_sale_order',
            details: `Deleted sale order with ID ${sale._id}`
        });
        res.status(200).json(successResponse('Sale order deleted successfully'));
    } catch (error) {
        next(error);
    }
};

