// src/controllers/report.controller.js

const Product = require('../models/product.model');
const Purchase = require('../models/purchase.model');
const Sale = require('../models/sale.model');
const { successResponse, errorResponse } = require('../utils/response');

/* Stock Validation Report
** method: FIFO | LIFO | AVERAGE (siplified) 
*/

exports.stockValidationReport = async (req, res, next) => {
    try {
        const { method } = req.query;

        const products = await Product.findAll();

        const  valuation = products.map(product => {
            let value = 0;
            if (method === 'FIFO' || method === 'LIFO') {
                value = (product.stock * product.costPrice).toFixed(2);
            } else {
                value = (product.stock * product.costPrice).toFixed(2);
            }

            return {
                productId: product.id,
                name: product.name,
                stock: product.stock,
                valuation: parseFloat(value)
            };
        });
        
        return successResponse(res, 'Stock validation report generated successfully', valuation);
    } catch (error) {
        return errorResponse(res, 'Failed to generate stock validation report', error);
    }
};

/* Sales Performance Report
** method: DAILY | WEEKLY | MONTHLY
*/
exports.salesPerformanceReport = async (req, res, next) => {
    try {
        const { method } = req.query;

        const sales = await Sale.findAll();

        const performance = sales.map(sale => {
            return {
                saleId: sale.id,
                productId: sale.productId,
                quantity: sale.quantity,
                total: sale.total,
                date: sale.createdAt
            };
        });
        return successResponse(res, 'Sales performance report generated successfully', performance);
    } catch (error) {
        return errorResponse(res, 'Failed to generate sales performance report', error);
    }
};

/* Purchase History Report
** method: DAILY | WEEKLY | MONTHLY
*/
exports.purchaseHistoryReport = async (req, res, next) => {
    try {
        const { method } = req.query;
        const purchases = await Purchase.findAll();
        const history = purchases.map(purchase => {
            return {
                purchaseId: purchase.id,
                productId: purchase.productId,
                quantity: purchase.quantity,
                total: purchase.total,
                date: purchase.createdAt
            };
        });
        return successResponse(res, 'Purchase history report generated successfully', history);
    }catch (error) {
        return errorResponse(res, 'Failed to generate purchase history report', error);
    }
};


