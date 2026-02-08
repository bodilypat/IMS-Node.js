//src/controllers/purchaseReturn.controller.js 

const Purchase = require('../models/purchase.model');
const Product = require('../models/product.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new Purchase Return */
exports.createPurchaseReturn = async (req, res, next) => {
    try {
        const { purchaseId, returnItems, reason } = req.body;

        if (!purchaseId || !returnItems || returnItems.length === 0) {
            return res.status(400).json(errorResponse('Purchase ID and return items are required'));
        }

        const purchaseOrder = awit Purchase.findById(purchaseId).populate('items.product');
        if (!purchaseOrder) {
            return res.status(404).json(errorResponse('Purchase order not found'));
        }
        const purchaseReturnItems = [];
        for (const item of returnItems) {
            const purchaseItem = purchaseOrder.items.find(i => i.product._id.toString() === item.productId);
            if (!purchaseItem) {
                return res.status(400).json(errorResponse(`Product with ID ${item.productId} not found in purchase order`));
            }
            if (item.quantity > purchaseItem.quantity) {
                return res.status(400).json(errorResponse(`Return quantity for product ${purchaseItem.product.name} exceeds purchased quantity`));
            }
            purchaseReturnItems.push({
                product: purchaseItem.product._id,
                quantity: item.quantity,
                price: purchaseItem.price
            });
        }
        const purchaseReturn = new PurchaseReturn({
            purchase: purchaseId,
            items: purchaseReturnItems,
            reason
        });
        await purchaseReturn.save();
        for (const item of purchaseReturnItems) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
        }
        await activityLogService.logActivity(req.user._id, 'Created purchase return', `Purchase Return ID: ${purchaseReturn._id}`);
        res.status(201).json(successResponse(purchaseReturn));
    } catch (error) {
        console.error('Error creating purchase return:', error);
        next(error);
    }
};

/* Get all Purchase Returns */
exports.getAllPurchaseReturns = async (req, res, next) => {
    try {
        const purchaseReturns = await PurchaseReturn.find().populate('purchase').populate('items.product');
        res.json(successResponse(purchaseReturns));
    } catch (error) {
        console.error('Error fetching purchase returns:', error);
        next(error);
    }
};

/* Get a single Purchase Return by ID */
exports.getPurchaseReturnById = async (req, res, next) => {
    try {
        const purchaseReturn = await PurchaseReturn.findById(req.params.id).populate('purchase').populate('items.product'); 
        if (!purchaseReturn) {
            return res.status(404).json(errorResponse('Purchase return not found'));
        }
        res.json(successResponse(purchaseReturn));
    } catch (error) {
        console.error('Error fetching purchase return:', error);
        next(error);
    }
};

/* Update a Purchase Return */
exports.updatePurchaseReturn = async (req, res, next) => {
    try {
        const { returnItems, reason } = req.body;
        const purchaseReturn = await PurchaseReturn.findById(req.params.id);
        if (!purchaseReturn) {
            return res.status(404).json(errorResponse('Purchase return not found'));
        }
        if (returnItems && returnItems.length > 0) {
            for (const item of returnItems) {
                const purchaseItem = await Purchase.findOne({ _id: purchaseReturn.purchase, 'items.product': item.productId }, { 'items.$': 1 });
                if (!purchaseItem) {
                    return res.status(400).json(errorResponse(`Product with ID ${item.productId} not found in purchase order`));
                }
                if (item.quantity > purchaseItem.items[0].quantity) {
                    return res.status(400).json(errorResponse(`Return quantity for product ${purchaseItem.items[0].product} exceeds purchased quantity`));
                }
                await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity - purchaseReturn.items.find(i => i.product.toString() === item.productId).quantity } });
                purchaseReturn.items = purchaseReturn.items.map(i => i.product.toString() === item.productId ? { product: item.productId, quantity: item.quantity, price: purchaseItem.items[0].price } : i);
            }
        }
        if (reason) {
            purchaseReturn.reason = reason;
        }
        await purchaseReturn.save();
        await activityLogService.logActivity(req.user._id, 'Updated purchase return', `Purchase Return ID: ${purchaseReturn._id}`);
        res.json(successResponse(purchaseReturn));
    }catch (error) {
        console.error('Error updating purchase return:', error);
        next(error);
    }   
};

/* Delete a Purchase Return */
exports.deletePurchaseReturn = async (req, res, next) => {
    try {
        const purchaseReturn = await PurchaseReturn.findById(req.params.id);
        if (!purchaseReturn) {
            return res.status(404).json(errorResponse('Purchase return not found'));
        }
        for (const item of purchaseReturn.items) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }
        await purchaseReturn.remove();
        await activityLogService.logActivity(req.user._id, 'Deleted purchase return', `Purchase Return ID: ${purchaseReturn._id}`);
        res.json(successResponse('Purchase return deleted successfully'));
    } catch (error) {
        console.error('Error deleting purchase return:', error);
        next(error);
    }
};

