//src/controllers/orderController.js 

const asyncHandler = require('express-async-handler');
const OrderService = require('../services/orderService');

// Create a Purchase Order
// @route   POST /api/orders/purchase
// @access  Admin/Manager
const createPurchaseOrder = asyncHandler(async (req, res) => {
    const { items, supplierId, totalAmount } = req.body;
    const order = await OrderService.createPurchaseOrder(items, supplierId, totalAmount);
    res.status(201).json(order);
});

// Create a Sales Order
// @route   POST /api/orders/sales
// @access  Admin/Manager
const createSalesOrder = asyncHandler(async (req, res) => {
    const { items, customerId, totalAmount } = req.body;
    const order = await OrderService.createSalesOrder(items, customerId, totalAmount);
    res.status(201).json(order);
});

// Get all Orders(purchase/sales)
// @route   GET /api/orders
// @access  Admin/Manager
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
});

// Get Order by ID
// @route   GET /api/orders/:id
// @access  Admin/Manager
const getOrderById = asyncHandler(async (req, res) => {
    const order = await OrderService.getOrderById(req.params.id);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// Update Order Status
// @route   PUT /api/orders/:id/status
// @access  Admin/Manager
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await OrderService.updateOrderStatus(req.params.id, status);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }   
});

module.exports = {
    createPurchaseOrder,
    createSalesOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};


