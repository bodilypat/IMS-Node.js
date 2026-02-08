//src/controllers/purchase.controller.js 

const Purchase = require('../models/purchase.model');
const Supplier = require('../models/supplier.model');
const Product = require('../models/product.model');

const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new purchase Order(PO) */
exports.createPurchase = async (req, res, next) => {
    try {
        const { supplierId, products, status } = req.body;

        // Validate supplier
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json(errorResponse('Supplier not found'));
        }
        // Validate products and calculate total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json(errorResponse(`Product with ID ${item.productId} not found`));
            }
            totalAmount += product.price * item.quantity;
        }

        // Create purchase order
        const purchaseOrder = await Purchase.create({
            supplier: supplierId,
            products,
            totalAmount,
            status: status || 'pending',
            createdBy: req.user.id,
        });

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'create',
            entity: 'purchase',
            entityId: purchaseOrder._id,
            description: `Created purchase order with ID ${purchaseOrder._id}`,
        });
        res.status(201).json(successResponse(purchaseOrder));
    } catch (error) {
        console.error('Error creating purchase order:', error);
        next(error);
    }
};

/* Get all purchase orders */
exports.getAllPurchases = async (req, res, next) => {
    try {
        const purchases = await Purchase.find().populate('supplier').populate('products.product');
        res.status(200).json(successResponse(purchases));
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        next(error);
    }
};

/* Get a single purchase order by ID */
exports.getPurchaseById = async (req, res, next) => {
    try {
        const purchase = await Purchase.findById(req.params.id)
            .populate('supplier', 'name email phone')
            .populate('products.product');

        if (!purchase) {
            return res.status(404).json(errorResponse('Purchase order not found'));
        } 
        res.status(200).json(successResponse(purchase));
    } catch (error) {
        console.error('Error fetching purchase order:', error);
        next(error);
    }
};

/* Update a purchase order */
exports.updatePurchase = async (req, res, next) => {
    try {
        const purchaseOrder = await Purchase.findById(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json(errorResponse('Purchase order not found'));
        }
        const { supplierId, products, status } = req.body;

        // Validate supplier if updated
        if (supplierId) {
            const supplier = await Supplier.findById(supplierId);
            if (!supplier) {
                return res.status(404).json(errorResponse('Supplier not found'));
            }
        }

        // Validate products and calculate total amount if updated
        let totalAmount = purchaseOrder.totalAmount;
        if (products) {
            totalAmount = 0;
            for (const item of products) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return res.status(404).json(errorResponse(`Product with ID ${item.productId} not found`));
                }
                totalAmount += product.price * item.quantity;
            }
        }

        // Update purchase order
        purchaseOrder.supplier = supplierId || purchaseOrder.supplier;
        purchaseOrder.products = products || purchaseOrder.products;
        purchaseOrder.totalAmount = totalAmount;
        purchaseOrder.status = status || purchaseOrder.status;
        await purchaseOrder.save();

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'update',
            entity: 'purchase',
            entityId: purchaseOrder._id,
            description: `Updated purchase order with ID ${purchaseOrder._id}`,
        });
        res.status(200).json(successResponse(purchaseOrder));
    } catch (error) {
        console.error('Error updating purchase order:', error);
        next(error);
    }
};

/* Delete a purchase order */
exports.deletePurchase = async (req, res, next) => {
    try {
        const purchaseOrder = await Purchase.findById(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json(errorResponse('Purchase order not found'));
        }
        await purchaseOrder.remove();

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'delete',
            entity: 'purchase',
            entityId: purchaseOrder._id,
            description: `Deleted purchase order with ID ${purchaseOrder._id}`,
        });
        res.status(200).json(successResponse('Purchase order deleted successfully'));
    } catch (error) {
        console.error('Error deleting purchase order:', error);
        next(error);
    }
};

