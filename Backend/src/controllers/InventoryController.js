//src/controllers/productController.js 

const asyncHandler = require('express-async-handler');
const InventoryService = require('../services/inventoryService');

// @desc    Get inventory by product 
// @route   GET /api/inventory/:productId
// @access  Admin/Manager
const getInventoryByProductId = asyncHandler(async (req, res) => {
    const inventory = await InventoryService.getInventoryByProductId(req.params.productId);
    if (inventory) {
        res.json(inventory);
    } else {
        res.status(404);
        throw new Error('Inventory not found');
    }
});

// @desc    Update inventory quantity
// @route   PUT /api/inventory/:productId
// @access  Admin/Manager
const updateInventoryQuantity = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const inventory = await InventoryService.updateInventoryQuantity(req.params.productId, quantity);
    if (inventory) {
        res.json(inventory);
    } else {
        res.status(404);
        throw new Error('Inventory not found');
    }
});

module.exports = {
    getInventoryByProductId,
    updateInventoryQuantity
};

