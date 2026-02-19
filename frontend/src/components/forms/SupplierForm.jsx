//src/components/forms/SupplierForm.jsx 

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SupplierForm = ({ onSubmit, initialData = {} }) => {
    const [supplierData, setSupplierData] = useState({
        name: initialData.name || '',
        contact: initialData.contact || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData({ ...supplierData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(supplierData);
    };

    return (
        <form onSubmit={handleSubmit} className="supplier-form">
            <Input
                label="Supplier Name"
                name="name"
                value={supplierData.name}
                onChange={handleChange}
                required
            />
            <Input
                label="Contact Person"
                name="contact"
                value={supplierData.contact}
                onChange={handleChange}
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={supplierData.email}
                onChange={handleChange}
            />
            <Input
                label="Phone"
                name="phone"
                type="tel"
                value={supplierData.phone}
                onChange={handleChange}
            />
            <Button type="submit">Save Supplier</Button>
        </form>
    );
};

export default SupplierForm;
