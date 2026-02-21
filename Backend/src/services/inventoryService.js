//src/services/inventoryService.js 

const Inventory = require('../models/Inventory');
const StockMovement = require('../models/StockMovement');

// Get inventory by product 
const getInventoryByProduct = async (productId) => {
    return await Inventory.findOne({ product_id: productId })
        .populate('product_id', 'product_name sku'); // Populate product name and sku
};

// Update inventory directly 
const updateInventory = async (productId, quantity) => {
    const inventory = await Inventory.findOneAndUpdate(
        { product_id: productId },
        { $inc: { quantity: quantity } },
        { new: true, upsert: true } // Create if not exists
    );

    // Log stock movement
    await StockMovement.create({
        product_id: productId,
        quantity: quantity,
        movement_type: quantity > 0 ? 'Stock In' : 'Stock Out',
        date: new Date()
    });
    return inventory;
};

// Adjust inventory automatically (positive for purchase, negative for sale)
const adjustInventory = async (productId, quantity, movement_type) => {
    const inventory = await Inventory.findOne({ product_id: productId });
    let newQuantity = quantity;

    if (movement_type === 'Purchase') {
        newQuantity = inventory ? inventory.quantity + quantity : quantity;
    } else if (movement_type === 'Sale') {
        newQuantity = inventory ? inventory.quantity - quantity : -quantity;
    }
    return await updateInventory(productId, newQuantity - (inventory ? inventory.quantity : 0));
};

module.exports = {
    getInventoryByProduct,
    updateInventory,
    adjustInventory
};


