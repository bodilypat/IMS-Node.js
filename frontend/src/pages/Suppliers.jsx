//src/pages/Suppliers.jsx

import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);

    const [formData, setFormData] = useState({
        supplier_name: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        address: ''
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('/api/suppliers');
            const data = await response.json();
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    // Handle input changes 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Open Add Model
    const openAddModal = () => {
        setEditingSupplier(null);
        setFormData({
            supplier_name: '',
            contact_name: '',
            contact_email: '',
            contact_phone: '',
            address: ''
        });
        setIsOpen(true);
    };

    // Open Edit Modal
    const openEditModal = (supplier) => {
        setEditingSupplier(supplier);
        setFormData({
            supplier_name: supplier.supplier_name,
            contact_name: supplier.contact_name,
            contact_email: supplier.contact_email,
            contact_phone: supplier.contact_phone,
            address: supplier.address
        });
        setIsOpen(true);
    };

    // Delete Supplier
    const handleDelete = async (supplierId) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                await fetch(`/api/suppliers/${supplierId}`, { method: 'DELETE' });
                fetchSuppliers();
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }   
        }
    };

    // Save Supplier (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingSupplier) {
            // Update Supplier
            const updated = suppliers.map(s =>
                s.supplier_id === editingSupplier.supplier_id ? { ...s, ...formData } : s
            );
            setSuppliers(updated);
            try {
                await fetch(`/api/suppliers/${editingSupplier.supplier_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                fetchSuppliers();
            } catch (error) {
                console.error('Error updating supplier:', error);
            }
        } else {
            // Add Supplier
            const newSupplier = { ...formData };
            setSuppliers([...suppliers, newSupplier]);
            try {
                await fetch('/api/suppliers', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSupplier)
                });
                fetchSuppliers();
            } catch (error) {
                console.error('Error adding supplier:', error);
            }
        }
        setIsOpen(false);
    };

    return (
        <div>
            <h1>Suppliers</h1>
            <Button onClick={openAddModal}>Add Supplier</Button>
            <DataTable
                data={suppliers}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <h2>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Supplier Name"
                            name="supplier_name"
                            value={formData.supplier_name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Contact Name"
                            name="contact_name"
                            value={formData.contact_name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Contact Email"
                            name="contact_email"
                            type="email"
                            value={formData.contact_email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Contact Phone"
                            name="contact_phone"
                            value={formData.contact_phone}
                            onChange={handleChange}
                        />
                        <TextArea
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <Button type="submit">{editingSupplier ? 'Update' : 'Add'}</Button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Suppliers;


        