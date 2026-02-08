//src/controllers/dashboard.controller.js 

const Product = require('../models/product.model');
const Purchase = require('../models/purchase.model');
const Sale = require('../models/sale.model');
const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../utils/response.util');

/* Dashboard KPI Summaryu */
exports.getDashboardSummary = async (req, res, next) => {
    try {
        const[
            totalProducts,
            totalUsers,
            totalPurchases,
            totalSales,
            lowStockCount,
            totalStockValue,
            todaySales,
        ] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments(),
            Purchase.countDocuments(),
            Sale.countDocuments(),
            Product.countDocuments({ stock: { $lt: 10 } }),
            Product.aggregate([
                { $group: { _id: null, totalValue: { $sum: { $multiply: ['$stock', '$price'] } } } }
            ]),
            Sale.aggregate([
                { $match: { date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } } },
                { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } }
            ])
        ]);

        res.json(successResponse({
            totalProducts,
            totalUsers,
            totalPurchases,
            totalSales,
            lowStockCount,
            totalStockValue: totalStockValue[0] ? totalStockValue[0].totalValue : 0,
            todaySales: todaySales[0] ? todaySales[0].totalSales : 0,
        }));
    } catch (error) {
        next(error);
    }
};

/* Dashboard Recent Activity */
exports.getRecentActivity = async (req, res, next) => {
    try {
        const recentPurchases = await Purchase.find().sort({ date: -1 }).limit(5).populate('product', 'name').populate('supplier', 'name');
        const recentSales = await Sale.find().sort({ date: -1 }).limit(5).populate('product', 'name').populate('customer', 'name');
        res.json(successResponse({ recentPurchases, recentSales }));
    } catch (error) {
        next(error);
    }
};

/* Dashboard Stock Alerts */
exports.getStockAlerts = async (req, res, next) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).select('name stock');
        res.json(successResponse({ lowStockProducts }));
    } catch (error) {
        next(error);
    }
};

/* Dashboard Sales Trends */
exports.getSalesTrends = async (req, res, next) => {
    try {
        const salesTrends = await Sale.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, totalSales: { $sum: "$totalAmount" } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(successResponse({ salesTrends }));
    } catch (error) {
        next(error);
    }
};

/* Dashboard User Activity */
exports.getUserActivity = async (req, res, next) => {
    try {
        const userActivity = await User.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, newUsers: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(successResponse({ userActivity }));
    } catch (error) {
        next(error);
    }
};



