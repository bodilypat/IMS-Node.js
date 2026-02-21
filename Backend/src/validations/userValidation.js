//src/validations/userValidation.js 

const { body} = require('express-validator');

const userValidation = [
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    body('email')
        .isEmail().withMessage('Please provide a valid email address'),
    role = body('role')
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
];

module.exports = userValidation;

