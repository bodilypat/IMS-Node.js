//src/components/forms/SalesForm.jsx 

import React, { useState } from 'react';
import CustomerSelect from '../ui/CustomerSelect';

function SalesForm({ customers, products, onSubmit }) {
    const [sale, setSale] = useState({
        customerId: '',
        items: "",
    });

    const handleCustomerChange = (customerId) => setSale({ ...sale, customerId });

    const handleAddItem = (productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
            setSale({
            ...sale,
            items: [...sale.items, { productId, productName: product.name, quantity: parseInt(quantity), price: product.price }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(sale);
    };

    return (
        <form onSubmit={handleSubmit} className="sales-form">
            <CustomerSelect 
                customers={customers} 
                selected={sale.customerId}
                onChange={handleCustomerChange}
            />
            <div className="sale-items">
                {products.map(product => (
                    <div key={product.id} className="sale-item">
                        <span>{product.name} (${product.price})</span>
                        <input
                            type="number"
                            min="1"
                            placeholder="Quantity"
                            onChange={(e) => handleAddItem(product.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>
                <button type="submit">Submit Sale</button>
        </form>
    );
}

export default SalesForm;

