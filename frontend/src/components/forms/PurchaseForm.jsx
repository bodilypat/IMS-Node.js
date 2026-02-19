//src/components/forms/PurchaseForm.jsx 

import React, { useState } from 'react';
import SupplierSelect from '../Supplier/SupplierSelect';

function PurchaseForm({ suppliers, products, onSubmit }) {
    const [purchase, setPurchase] = useState({
        supplierId: '',
        items: [{ productId: '', quantity: 1, price: 0 }]
    });

    const handleSupplierChange = (supplierId) => setPurchase({ ...purchase, supplierId });
    
    const handleAddItem = (productId, quantity, price ) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setPurchase({
                ...purchase,
                items: [...purchase.items, { productId, quantity, price }]
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(purchase);
        setPurchase({ supplierId: '', items: [{ productId: '', quantity: 1, price: 0 }] });
    };

    return (
        <form onSubmit={handleSubmit} className="purchase-form">
            <SupplierSelect
                suppliers={suppliers}
                value={purchase.supplierId}
                onChange={handleSupplierChange}
            />
            <div className="purchase-items">
                {purchase.items.map((item, index) => (
                    <div key={index} className="purchase-item">
                        <span>Product ID: {item.productId}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: {item.price}</span>
                    </div>
                ))}
            </div>
            <button type="submit">Add Purchase</button>
        </form>
    );
}

export default PurchaseForm;

