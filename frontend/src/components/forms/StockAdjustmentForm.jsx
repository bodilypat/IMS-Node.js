//src/components/forms/StockAdjustmentForm.jsx

/* 
** Product 
** Warehouse
** Quantity (+ or -)
** Reason
** Movement Type
 */
import React, { useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

const StockAdjustmentForm = ({ products, warehouses, onSubmit }) => {
    const [formData, setFormData] = useState({
        productId: '',
        warehouseId: '',
        quantity: '',
        reason: '',
        movementType: 'addition'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="stock-adjustment-form">
            <Select
                label="Product"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                options={products.map(p => ({ value: p.id, label: p.name }))}
                required    
            />
            <Select
                label="Warehouse"
                name="warehouseId"
                value={formData.warehouseId}
                onChange={handleChange}
                options={warehouses.map(w => ({ value: w.id, label: w.name }))}
                required
            />
            <Input
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
            />
            <Input
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
            />
            <Select
                label="Movement Type"
                name="movementType"
                value={formData.movementType}
                onChange={handleChange}
                options={[
                    { value: 'addition', label: 'Addition' },
                    { value: 'subtraction', label: 'Subtraction' }
                ]}
                required
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}
export default StockAdjustmentForm;




