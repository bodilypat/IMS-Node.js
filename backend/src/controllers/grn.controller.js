//src/controllers/grn.controller.js 

const Purchase = require('../models/purchase.model');
const Product = require('../models/product.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new Goods Receipt Note (GRN) */
exports.createGRN = async (req, res, next) => {
    try {
        const { purchaseId, receivedItems } = req.body;

        if (!purchaseId || !receivedItems || !Array.isArray(receivedItems)) {
            return res.status(400).json(errorResponse('purchaseId and receivedItems are required and must be an array'));
        }

        // Fetch the purchase order
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).json(errorResponse('Purchase order not found'));
        }   

        // Validate received items against the purchase order
        const purchaseItemsMap = new Map();
        purchase.items.forEach(item => {
            purchaseItemsMap.set(item.product.toString(), item);
        }
        );
        for (const receivedItem of receivedItems) {
            const { productId, quantity } = receivedItem;
            if (!purchaseItemsMap.has(productId)) {
                return res.status(400).json(errorResponse(`Product with ID ${productId} is not part of the purchase order`));
            }
            const purchaseItem = purchaseItemsMap.get(productId);
            if (quantity > purchaseItem.quantity) {
                return res.status(400).json(errorResponse(`Received quantity for product ID ${productId} exceeds the ordered quantity`));
            }
        }
        // Update product stock and purchase order status
        for (const receivedItem of receivedItems) {
            const { productId, quantity } = receivedItem;
            const purchaseItem = purchaseItemsMap.get(productId);
            // Update product stock
            await Product.findByIdAndUpdate(productId, { $inc: { stock: quantity } });
            // Update purchase item received quantity
            purchaseItem.receivedQuantity = (purchaseItem.receivedQuantity || 0) + quantity;
        }   
        // Check if the purchase order is fully received
        const allItemsReceived = purchase.items.every(item => item.receivedQuantity >= item.quantity);
        purchase.status = allItemsReceived ? 'Completed' : 'Partially Received';
        await purchase.save();
        // Log activity        await activityLogService.logActivity(req.user.id, 'Created GRN', `GRN created for purchase order ${purchaseId}`);
        res.status(201).json(successResponse('GRN created successfully', { purchase }));
    } catch (error) {
        console.error('Error creating GRN:', error);
        next(error);
    }
};

/* Get GRN details by purchase order ID */
exports.getGRNDetails = async (req, res, next) => {
    try {
        const grns = await Purchase.find({ status: { $in: ['Partially Received', 'Completed'] } })
            .populate('supplier', 'name email phone')
            .populate('items.product', 'name category price');

        res.status(200).json(successResponse('GRN details retrieved successfully', { grns }));
    } catch (error) {
        console.error('Error fetching GRN details:', error);
        next(error);
    }
};

/* Get all GRNs with pagination */
exports.getAllGRNs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const grns = await Purchase.find({ status: { $in: ['Partially Received', 'Completed'] } })
            .populate('supplier', 'name email phone')
            .populate('items.product', 'name category price')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Purchase.countDocuments({ status: { $in: ['Partially Received', 'Completed'] } });
        res.status(200).json(successResponse('GRNs retrieved successfully', { grns, total, page: parseInt(page), limit: parseInt(limit) }));
    } catch (error) {
        console.error('Error fetching GRNs:', error);
        next(error);
    }
};

/* Get GRN details by ID */
exports.getGRNById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const grn = await Purchase.findById(id)
            .populate('supplier', 'name email phone')
            .populate('items.product', 'name category price');
        if (!grn) {
            return res.status(404).json(errorResponse('GRN not found'));
        }
        res.status(200).json(successResponse('GRN details retrieved successfully', { grn }));
    } catch (error) {
        console.error('Error fetching GRN details:', error);
        next(error);
    }
};

/* Update GRN details */
exports.updateGRN = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { receivedItems } = req.body;
        if (!receivedItems || !Array.isArray(receivedItems)) {
            return res.status(400).json(errorResponse('receivedItems is required and must be an array'));
        }
        const purchase = await Purchase.findById(id);
        if (!purchase) {
            return res.status(404).json(errorResponse('GRN not found'));
        }
        if (purchase.status === 'Completed') {
            return res.status(400).json(errorResponse('Cannot update a completed GRN'));
        }
        const purchaseItemsMap = new Map();
        purchase.items.forEach(item => {
            purchaseItemsMap.set(item.product.toString(), item);
        });
        for (const receivedItem of receivedItems) {
            const { productId, quantity } = receivedItem;
            if (!purchaseItemsMap.has(productId)) {
                return res.status(400).json(errorResponse(`Product with ID ${productId} is not part of the purchase order`));
            }
            const purchaseItem = purchaseItemsMap.get(productId);
            if (quantity > purchaseItem.quantity) {
                return res.status(400).json(errorResponse(`Received quantity for product ID ${productId} exceeds the ordered quantity`));
            }
        }
        for (const receivedItem of receivedItems) {
            const { productId, quantity } = receivedItem;
            const purchaseItem = purchaseItemsMap.get(productId);
            const quantityDifference = quantity - (purchaseItem.receivedQuantity || 0);
            await Product.findByIdAndUpdate(productId, { $inc: { stock: quantityDifference } });
            purchaseItem.receivedQuantity = quantity;
        }
        const allItemsReceived = purchase.items.every(item => item.receivedQuantity >= item.quantity);
        purchase.status = allItemsReceived ? 'Completed' : 'Partially Received';
        await purchase.save();
        await activityLogService.logActivity(req.user.id, 'Updated GRN', `GRN updated for purchase order ${id}`);
        res.status(200).json(successResponse('GRN updated successfully', { purchase }));
    } catch (error) {
        console.error('Error updating GRN:', error);
        next(error);
    }
};

/* Delete a GRN */
exports.deleteGRN = async (req, res, next) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id);
        if (!purchase) {
            return res.status(404).json(errorResponse('GRN not found'));
        }
        if (purchase.status === 'Completed') {
            return res.status(400).json(errorResponse('Cannot delete a completed GRN'));
        }
        for (const item of purchase.items) {
            if (item.receivedQuantity) {
                await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.receivedQuantity } });
            }
        }
        await Purchase.findByIdAndDelete(id);
        await activityLogService.logActivity(req.user.id, 'Deleted GRN', `GRN deleted for purchase order ${id}`);
        res.status(200).json(successResponse('GRN deleted successfully'));
    } catch (error) {
        console.error('Error deleting GRN:', error);
        next(error);
    }
};

