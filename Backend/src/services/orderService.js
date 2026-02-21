//src/services/orderService.js 

const PurchaseOder = require('../models/PurchaseOrder');
const PurchaseOrderItem = require('../models/PurchaseOrderItem');
const SaleOrder = require('../models/SaleOrder');
const SaleOrderItem = require('../models/SaleOrderItem');
const InventoryService = require('./inventoryService');

// Purchase Order 
const createPurchaseOrder = async (supplier_id, items, total_amount, status) => {
    const purchaseOrder = new PurchaseOder({
        supplier_id,
        total_amount,
        status
    });
    const savedOrder = await purchaseOrder.save();

    // Save items 
    for (const item of items) {
        const purchaseItem = new PurchaseOrderItem({
            purchase_order_id: savedOrder._id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_cost: item.unit_cost
        });
        await purchaseItem.save();

        // Update inventory
        await InventoryService.adjustInventory(item.product_id, item.quantity, 'Purchase');
    }
    return savedOrder;
};

// Sale Order
const createSaleOrder = async (customer_id, items, total_amount, status) => {
    const saleOrder = new SaleOrder({
        customer_id,
        total_amount,
        status
    });
    const savedOrder = await saleOrder.save();

    // Save items
    for (const item of items) {
        const saleItem = new SaleOrderItem({
            sale_order_id: savedOrder._id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price
        });
        await saleItem.save();

        // Update inventory
        await InventoryService.adjustInventory(item.product_id, item.quantity, 'Sale');
    }
    return savedOrder;
};

// Get all orders
const getAllOrders = async () => {
    const purchaseOrders = await PurchaseOder.find().populate('supplier_id','supplier_name');
    const saleOrders = await SaleOrder.find().populate('customer_id','customer_name');
    return { purchaseOrders, saleOrders };
};

module.exports = {
    createPurchaseOrder,
    createSaleOrder,
    getAllOrders
};




