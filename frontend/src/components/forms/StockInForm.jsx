//src/components/froms/StockInForm.jsx 

import React, { useState } from 'react';

function StockInForm({ products, onSubmitStock }) {
    const [formData, setFormData] = useState({
        productId: '',
        quantity: '',
        date: '',
        note: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitStock(formData);
        setFormData({
            productId: '',
            quantity: '',
            date: '',
            note: ''
        });
    }

    return (
        <form onSubmit={handleSubmit} className="stock-in-form">
            <select name="productId" value={formData.productId} onChange={handleChange} required>
                <option value="">Select Product</option>
                {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>

                ))}
            </select>
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />
            <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Note (optional)"
            />
            <button type="submit">Add Stock</button>
        </form>
    );
}

export default StockInForm;

