//src/controllers/transaction.controller.js 

import Transaction from '../models/transaction.model.js';
import Product from '../models/product.model.js';

// allowed transaction types
const TRANSACTION_TYPES = ['purchase', 'sale'];

// Create a new transaction
export const createTransaction = async (req, res) => {
    try {
        const { productId, quantity, type } = req.body;

        // validation
        if (!productId || !type || !quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Product ID, type and positive quantity are required' });
        }

        if (!TRANSACTION_TYPES.includes(type)) {
            return res.status(400).json({ message: `Type must be one of: ${TRANSACTION_TYPES.join(', ')}` });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Stock Logic
        if (type === 'sale') {
            if (product.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock for this sale' });
            }

            product.quantity -= quantity;
        } else if (type === 'purchase') {
            product.quantity += quantity;
        }

        await product.save();

        const transaction = await Transaction.create({
            productId,
            quantity,
            type,
            stockAfter: product.quantity,
        });

        res.status(201).json({
            message: 'Transaction created successfully',
            transaction,
        });
    } catch (error) {
        console.error('Create transaction error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all transactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
        .populate('productId', 'name stock')
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            transactions,
        });
    } catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        .populate('productId', 'name stock');

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction retrieved successfully',
            transaction,
        });
    } catch (error) {
        console.error('Get transaction by ID error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid transaction ID' });
        }

        res.status(500).json({ message: 'Server error' });
    }
};

// Update transaction 
export const updateTransaction = async (req, res) => {
    try {
        const { type, quantity } = req.body;

        if (!VALID_TYPES.includes(type) || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid type or quantity' });
        }

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const product = await Product.findById(transaction.productId);
        if (!product) {
            return res.status(404).json({ message: 'Associated product not found' });
        }

        // Rollback old transaction
        if (transaction.type === 'sale') {
            product.quantity += transaction.quantity;
        } else if (transaction.type === 'purchase') {
            product.quantity -= transaction.quantity;
        }

        // apply new transaction
        if (type === 'sale') {
            if (product.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock for this sale' });
            }
            product.quantity -= quantity;
        } else if (type === 'purchase') {
            product.quantity += quantity;
        }

        await product.save();

        transaction.type = type;
        transaction.quantity = quantity;
        transaction.stockAfter = product.stock;
        await transaction.save();

        res.status(200).json({
            message: 'Transaction updated successfully',
            transaction,
        });
    } catch (error) {
        console.error('Update transaction error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const product = await Product.findById(transaction.productId);
        if (!product) {
            return res.status(404).json({ message: 'Associated product not found' });
        }

        // Rollback stock 
        if (transaction.type === 'sale') {
            product.quantity += transaction.quantity;
        } else if (transaction.type === 'purchase') {
            product.quantity -= transaction.quantity;
        }

        await product.save();
        await transaction.deleteOne();

        res.status(200).json({
            message: 'Transaction deleted successfully',
            transaction,
        });
    } catch (error) {
        console.error('Delete transaction error:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid transaction ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

