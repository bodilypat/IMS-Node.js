//src/pages/PurchaseOrder.jsx

import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const PurchaseOrder = () => {
    const [orders, setOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/purchase-orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };
        fetchOrders();
    }, []);

    // Handle input changes 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Open Add Modal 
    const openAddModal = () => {
        setEditingOrder(null);
        setFormData({
            supplier_id: '',
            order_date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            total_amount: '',
        });
        setIsOpen(true);
    };

    // Open Edit Modal
    const openEditModal = (order) => {
        setEditingOrder(order);
        setFormData({
            supplier_id: order.supplier_id,
            order_date: order.order_date.split('T')[0],
            status: order.status,
            total_amount: order.total_amount,
        });
        setIsOpen(true);
    };

    // Delete Order 
    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await fetch(`/api/purchase-orders/${orderId}`, { method: 'DELETE' });
                setOrders(orders.filter((order) => order.purchase_order_id !== orderId));
            } catch (error) {
                console.error('Error deleting purchase order:', error);
            }
        }
    };

    // Save Order (Add / Update)
    const handleSubmit = async () => {
        const method = editingOrder ? 'PUT' : 'POST';
        const url = editingOrder ? `/api/purchase-orders/${editingOrder.purchase_order_id}` : '/api/purchase-orders';
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const savedOrder = await response.json();   
            if (editingOrder) {
                setOrders(orders.map((order) => (order.purchase_order_id === savedOrder.purchase_order_id ? savedOrder : order)));
            } else {
                setOrders([...orders, savedOrder]);
            }
            setIsOpen(false);
        } catch (error) {
            console.error('Error saving purchase order:', error);
        }
    };

    // Table Columns
    const columns = [
        { key: 'purchase_order_id', label: 'ID' },
        { key: 'supplier_id', label: 'Supplier ID' },
        { key: 'order_date', label: 'Order Date' },
        { key: 'status', label: 'Status' },
        { key: 'total_amount', label: 'Total Amount' },
    ];

    const actions = (row) => (
        <div className="flex space-x-2">
            <Button onClick={() => openEditModal(row)} variant="outline" size="sm">Edit</Button>
            <Button onClick={() => handleDelete(row.purchase_order_id)} variant="outline" size="sm" color="red">Delete</Button>
        </div>
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Purchase Orders</h1>
                <Button onClick={openAddModal}>Add Purchase Order</Button>
            </div>
            <DataTable columns={columns} data={orders} actions={actions} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingOrder ? 'Edit Purchase Order' : 'Add Purchase Order'}>
                <div className="space-y-4">
                    <Input 
                        label="Supplier ID" 
                        name="supplier_id" 
                        value={formData.supplier_id} 
                        onChange={handleInputChange} 
                    />
                    <Input 
                        label="Order Date" 
                        name="order_date" 
                        type="date" 
                        value={formData.order_date} 
                        onChange={handleInputChange} 
                    />
                    <Select 
                        label="Status" 
                        name="status" 
                        value={formData.status} 
                        onChange={handleInputChange} 
                        options={[
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Approved', label: 'Approved' },
                            { value: 'Received', label: 'Received' },
                            { value: 'Cancelled', label: 'Cancelled' },
                        ]} 
                    />
                    <Input 
                        label="Total Amount" 
                        name="total_amount" 
                        type="number" 
                        value={formData.total_amount} 
                        onChange={handleInputChange} 
                    />
                    <Button onClick={handleSubmit} className="mt-4">{editingOrder ? 'Update' : 'Create'}</Button>
                </div>
            </Modal>
        </div>
    );
};

export default PurchaseOrder;

