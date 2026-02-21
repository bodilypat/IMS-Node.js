//src/validations/productValidation.js 

const { body } = require('express-validator');

const createProductValidation = [
    body('prodduct_name')
        .notEmpty().withMessage('Product name is required')
        .isString().withMessage('Product name must be a string')
        .isLength({ max: 100 }).withMessage('Product name must not exceed 100 characters'),
    body('sku')
        .notEmpty()
        .withMessage('SKU is required')
        .isAlphanumeric()
        .withMessage('SKU must be alphanumeric')
        .isLength({ max: 100 })
        .withMessage('SKU must not exceed 100 characters'),
    body('category_id')
        .optional()
        .isMongoId()
        .withMessage('Category ID must be a valid MongoDB ID'),
    body('supplier_id')
        .optional()
        .isMongoId()
        .withMessage('Supplier ID must be a valid MongoDB ID'),
    body('cost_price')
        .notEmpty()
        .isFloat({ gt: 0 })
        .withMessage('Cost price must be a positive number'),
    body('selling_price')
        .isFloat({ gt: 0 })
        .withMessage('Selling price must be a positive number')
        .custom((value, { req }) => {
            if (value < req.body.cost_price) {
                throw new Error('Selling price must be greater than or equal to cost price');
            }
            return true;
        }),
    body('quantity')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
    body('reorder_level')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Reorder level must be a non-negative integer'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters'),
];

module.exports = {
    createProductValidation,
};

