//src/components/forms/StockOutForm.jsx 

import React, { useState } from 'react';

function StockOutForm({ products, onSubmit }) {
    const [formData, setFormData] = useState({
        productId: '',
        quantity: '',
        date: '',
        reason: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            productId: '',
            quantity: '',
            date: '',
            reason: ''
        });
    }

    return (
        <form onSubmit={handleSubmit} className="stock-out-form">
            <select name="productId" value={formData.productId} onChange={handleChange} required>
                <option value="">Select Product</option>
                {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <input type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason for Stock Out" required />
            <button type="submit">Submit</button>
        </form>
    );
}

export default StockOutForm;


