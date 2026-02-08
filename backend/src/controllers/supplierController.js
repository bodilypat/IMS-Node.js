//src/controllers/supplier.controller.js 

import Supplier from '../models/supplier.model.js';

// Create a new supplier
export const createSupplier = async (req, res) => {
    try {
        const {name, email, phone, address } = req.body;

        // validation
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const supplier = await Supplier.create({
            name,
            email,
            phone,
            address,
        });

        res.status(201).json({
            message: 'Supplier created successfully',
            supplier,
        });
    } catch (error) {
        console.error('Create supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all suppliers
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            order: [['createdAt', 'DESC']],
        })
        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Get suppliers error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single supplier by ID
export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json(supplier);
    } catch (error) {
        console.error('Get supplier by ID error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a supplier
export const updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        await supplier.update(req.body);

        res.status(200).json({
            message: 'Supplier updated successfully',
            supplier,
        });
    } catch (error) {
        console.error('Update supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a supplier
export const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        await supplier.destroy();

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error('Delete supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products for a supplier
export const getProductsBySupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id, {
            include: 'products',
        });
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ products: supplier.products });
    } catch (error) {
        console.error('Get products by supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single product by ID for a supplier
export const getProductBySupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.supplierId, {
            include: {
                model: Product,
                where: { id: req.params.productId },
            },
        });

        if (!supplier || supplier.products.length === 0) {
            return res.status(404).json({ message: 'Product not found for this supplier' });
        }

        res.status(200).json({ product: supplier.products[0] });
    } catch (error) {
        console.error('Get product by supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product by ID for a supplier
export const updateProductBySupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.supplierId, {
            include: {
                model: Product,
                where: { id: req.params.productId },
            },
        });

        if (!supplier || supplier.products.length === 0) {
            return res.status(404).json({ message: 'Product not found for this supplier' });
        }

        const product = supplier.products[0];
        await product.update(req.body);
        res.status(200).json({
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        console.error('Update product by supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product by ID for a supplier
export const deleteProductBySupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.supplierId, {
            include: {
                model: Product,
                where: { id: req.params.productId },
            },
        });

        if (!supplier || supplier.products.length === 0) {
            return res.status(404).json({ message: 'Product not found for this supplier' });
        }

        const product = supplier.products[0];
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product by supplier error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
