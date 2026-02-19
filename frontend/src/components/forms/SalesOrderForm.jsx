//src/components/forms/SalesOrderForm.jsx

import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

    const SalesOrderForm = ({ onSubmit, initialData = {} }) => {
    const [customerId, setCustomerId] = useState(initialData.customer_id || '');
    const [orderDate, setOrderDate] = useState(initialData.order_date || '');
    const [status, setStatus] = useState(initialData.status || 'Pending');
    const [totalAmount, setTotalAmount] = useState(initialData.total_amount || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ customer_id: customerId, order_date: orderDate, status, total_amount: totalAmount });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Customer ID"
                type="number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
            />
            <Input
                label="Order Date"
                type="datetime-local"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                required
            />
            <Input
                label="Status"
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <Input
                label="Total Amount"
                type="number"
                step="0.01"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};
export default SalesOrderForm;


