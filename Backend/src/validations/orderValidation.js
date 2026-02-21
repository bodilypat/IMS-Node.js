//src/validations/orderValidation.js 

const { body } = require('express-validator');

const cretatePurchaseOrderValidation = [
    body('supplier_id')
        .notEmpty().withMessage('Supplier ID is required')
        .isMongoId().withMessage('Supplier ID must be a valid Mongo ID'),
    body('items')
        .isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.product_id')
        .notEmpty().withMessage('Product ID is required for each item')
        .isMongoId().withMessage('Product ID must be a valid Mongo ID'),
    body('items.*.quantity')
        .notEmpty().withMessage('Quantity is required for each item')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('items.*.unit_price')
        .notEmpty().withMessage('Unit price is required for each item')
        .isFloat({ gt: 0 }).withMessage('Unit price must be a positive number'),
    body('total_amount')
        .notEmpty().withMessage('Total amount is required')
        .isFloat({ gt: 0 }).withMessage('Total amount must be a positive number'),
];

const createSalesOrderValidation = [
    body('customer_id')
        .notEmpty().withMessage('Customer ID is required')
        .isMongoId().withMessage('Customer ID must be a valid Mongo ID'),
    body('items')
        .isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.product_id')
        .notEmpty().withMessage('Product ID is required for each item')
        .isMongoId().withMessage('Product ID must be a valid Mongo ID'),
    body('items.*.quantity')
        .notEmpty().withMessage('Quantity is required for each item')
        .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('items.*.unit_price')
        .notEmpty().withMessage('Unit price is required for each item')
        .isFloat({ gt: 0 }).withMessage('Unit price must be a positive number'),
    body('total_amount')
        .notEmpty().withMessage('Total amount is required')
        .isFloat({ gt: 0 }).withMessage('Total amount must be a positive number'),
];

module.exports = {
    cretatePurchaseOrderValidation,
    createSalesOrderValidation
};

