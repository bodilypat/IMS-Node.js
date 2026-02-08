//src/controllers/supplier.controller.js

const Supplier = require('../models/supplier.model');
const { successResponse, errorResponse } = require('../utils/response');
const activityLogService = require('../services/activityLog.service');

/* Create a new supplier */
exports.createSupplier = async (req, res, next) => {
    try {
        const { name, email, phone, address, contactPerson, contractDetails } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json(errorResponse('Name, email, and phone are required'));
        }

        const existing = await Supplier.findOne({ name });
        if (existing) {
            return res.status(400).json(errorResponse('Supplier with this name already exists'));
        }

        const supplier = new Supplier({
            name,
            email,
            phone,
            address,
            contactPerson,
            contractDetails
        });

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'create_supplier',
            details: `Created supplier ${name}`
        });
        
        const savedSupplier = await supplier.save();
        res.status(201).json(successResponse(savedSupplier, 'Supplier created successfully'));
    } catch (err) {
        next(err);
    }
};

/* Get all suppliers */
exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();
        res.json(successResponse(suppliers, 'Suppliers retrieved successfully'));
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        next(err);
    }
};

/* Get a supplier by ID */
exports.getSupplierById = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json(errorResponse('Supplier not found'));
        }
        res.json(successResponse(supplier, 'Supplier retrieved successfully'));
    } catch (err) {
        console.error('Error fetching supplier:', err);
        next(err);
    }
};

/* Update a supplier */
exports.updateSupplier = async (req, res, next) => {
    try {
        const { name, email, phone, address, contactPerson, contractDetails } = req.body;
        
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json(errorResponse('Supplier not found'));
        }

        supplier.name = name || supplier.name;
        supplier.email = email || supplier.email;
        supplier.phone = phone || supplier.phone;
        supplier.address = address || supplier.address;
        supplier.contactPerson = contactPerson || supplier.contactPerson;
        supplier.contractDetails = contractDetails || supplier.contractDetails;

        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'update_supplier',
            details: `Updated supplier ${supplier.name}`
        }); 

        const updatedSupplier = await supplier.save();
        res.json(successResponse(updatedSupplier, 'Supplier updated successfully'));
    } catch (err) {
        console.error('Error updating supplier:', err);
        next(err);
    }
};

/* Delete a supplier */
exports.deleteSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json(errorResponse('Supplier not found'));
        }
        await supplier.remove();
        
        // Log activity
        await activityLogService.logActivity({
            userId: req.user.id,
            action: 'delete_supplier',
            details: `Deleted supplier ${supplier.name}`
        });
        res.json(successResponse(null, 'Supplier deleted successfully'));
    } catch (err) {
        console.error('Error deleting supplier:', err);
        next(err);
    }
};
