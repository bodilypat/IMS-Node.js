//src/components/forms/PurchaseOrderForm.jsx

/* 
** Select supplier
** Add multiple product 
** Calculate total amount 
** Submit to backend
 */
 
import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';

const PurchaseOrderForm = ({ onSubmit, initialData = {} }) => {
    const [supplierId, setSupplierId] = useState(initialData.supplier_id || '');
    const [orderDate, setOrderDate] = useState(initialData.order_date || '');
    const [status, setStatus] = useState(initialData.status || 'Pending');
    const [totalAmount, setTotalAmount] = useState(initialData.total_amount || '');
    const [products, setProducts] = useState(initialData.products || [{ product_id: '', quantity: '' }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ supplier_id: supplierId, order_date: orderDate, status, total_amount: totalAmount, products });
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        setProducts([...products, { product_id: '', quantity: '' }]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Select
                label="Supplier ID"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                required
            >
                {/* Options should be populated dynamically from backend */}
                <option value="">Select Supplier</option>
                <option value="1">Supplier 1</option>
                <option value="2">Supplier 2</option>
            </Select>
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
            <div>
                <h3 className="text-lg font-semibold">Products</h3>
                {products.map((product, index) => (
                    <div key={index} className="flex space-x-4 mb-2">
                        <Select
                            label="Product ID"
                            value={product.product_id}
                            onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                            required
                        >
                            {/* Options should be populated dynamically from backend */}
                            <option value="">Select Product</option>
                            <option value="1">Product 1</option>
                            <option value="2">Product 2</option>
                        </Select>
                        <Input
                            label="Quantity"
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <Button type="button" onClick={addProduct}>Add Product</Button>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default PurchaseOrderForm;
