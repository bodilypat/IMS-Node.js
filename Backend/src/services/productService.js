//src/services/productService.js 

const Product = require('../models/productModel');

// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Get all products 
const getAllProducts = async () => {
    return await Product.find()
        .populate('category', 'name') // Populate category name
        .populate('supplier', 'name'); // Populate supplier name
};

// Get a product by ID
const getProductById = async (id) => {
    return await Product.findById(id)
        .populate('category', 'name') // Populate category name
        .populate('supplier', 'name'); // Populate supplier name
};

// Update a product by ID
const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

// Delete a product by ID
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};




