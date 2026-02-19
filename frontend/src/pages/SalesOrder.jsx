//src/pages/SalesOrders.jsx 

import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const SalesOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [formData, setFormData] = useState({
        customer_id: '',
        order_date: '',
        status: 'Pending',
        total_amount: '',
    });

    useEffect(() => {
        fetch('/api/sales-orders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error('Error fetching sales orders:', err));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Open Add Modal 
    const handleAdd = () => {
        setEditingOrder(null);
        setFormData({
            customer_id: '',
            order_date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            total_amount: '',
        });
        setIsOpen(true);
    };

    // Open Edit Modal
    const handleEdit = (order) => {
        setEditingOrder(order);
        setFormData({
            customer_id: order.customer_id,
            order_date: order.order_date.split('T')[0],
            status: order.status,
            total_amount: order.total_amount,
        });
        setIsOpen(true);
    };

    // Delete Order
    const handleDelete = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            fetch(`/api/sales-orders/${orderId}`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setOrders(prev => prev.filter(o => o.order_id !== orderId));
                    } else {
                        console.error('Failed to delete order');
                    }   
                })
                .catch(err => console.error('Error deleting order:', err));
        }
    };

    // Save Order (Add / Update)
    const handleSubmit = () => {
        e.preventDefault();

        if (editingOrder) {
            const updated = orders.map(o => o.order_id === editingOrder.order_id ? { ...o, ...formData } : o);
            setOrders(updated);
        } else {
            const newOrder = { ...formData, order_id: Date.now() };
            setOrders(prev => [...prev, newOrder]);
        }
        setIsOpen(false);
    };

    // Table columns
    const columns = [
        { key: 'order_id', label: 'Order ID' },
        { key: 'customer_id', label: 'Customer ID' },
        { key: 'order_date', label: 'Order Date' },
        { key: 'status', label: 'Status' },
        { key: 'total_amount', label: 'Total Amount' },
    ];

    return (
        <div>
            <h1>Sales Orders</h1>
            <Button onClick={handleAdd}>Add Sales Order</Button>
            <DataTable columns={columns} data={orders} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>{editingOrder ? 'Edit Sales Order' : 'Add Sales Order'}</h2>
                <form onSubmit={handleSubmit}>
                    <Input name="customer_id" label="Customer ID" value={formData.customer_id} onChange={handleChange} required />  
                    <Input type="date" name="order_date" label="Order Date" value={formData.order_date} onChange={handleChange} required />
                    <Select name="status" label="Status" value={formData.status} onChange={handleChange} required>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                    </Select>
                    <Input type="number" step="0.01" name="total_amount" label="Total Amount" value={formData.total_amount} onChange={handleChange} required />
                    <Button type="submit">{editingOrder ? 'Update' : 'Add'}</Button>
                </form>
            </Modal>
        </div>
    );
};

export default SalesOrders;


