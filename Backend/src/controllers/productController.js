//src/controllers/productController.js 

const asyncHandler = require('express-async-handler');
const ProductService = require('../services/productService');

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin/Manager
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
    const product = await ProductService.createProduct(name, description, price, category);
    res.status(201).json(product);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public  
const getProductById = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin/Manager
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
    const product = await ProductService.updateProduct(req.params.id, name, description, price, category);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin/Manager
const deleteProduct = asyncHandler(async (req, res) => {
    const success = await ProductService.deleteProduct(req.params.id);
    if (success) {
        res.status(200).json({ message: 'Product deleted successfully' });  
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

