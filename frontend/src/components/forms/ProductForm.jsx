//src/components/forms/ProductForm.jsx 

import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

const ProductForm = ({ onSubmit, initialData = {}, }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        sku: '',
        const_price: '',
        selling_price: '',
        reorder_level: '',
        ...initialData,
    });

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            ...initialData,
        }));
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Product Name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                required
            />
            <Input
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
            />
            <Input
                label="Cost Price"
                name="const_price"
                type="number"
                value={formData.const_price}
                onChange={handleChange}
                required
            />
            <Input
                label="Selling Price"
                name="selling_price"
                type="number"
                value={formData.selling_price}
                onChange={handleChange}
                required
            />
            <Input
                label="Reorder Level"
                name="reorder_level"
                type="number"
                value={formData.reorder_level}
                onChange={handleChange}
                required
            />
            <Button type="submit" className="w-full">
                {initialData.id ? 'Update Product' : 'Add Product'}
            </Button>
        </form>
    );
};

export default ProductForm;

