//src/components/forms/WarehouseForm.jsx
/* CREATE TABLE warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    warehouse_name VARCHAR(255) NOT NULL UNIQUE,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
); */

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const WarehouseForm = ({ onSubmit, initialData = {} }) => {
    const [warehouseName, setWarehouseName] = useState(initialData.warehouse_name || '');
    const [location, setLocation] = useState(initialData.location || '');
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!warehouseName.trim()) {
            setError('Warehouse name is required');
            return;
        } else if (warehouseName.length > 255) {
            setError('Warehouse name must be less than 255 characters');
            return;
        } else if (location.length > 1000) {
            setError('Location must be less than 1000 characters');
            return;
        }
        setError('');
        onSubmit({ warehouse_name: warehouseName, location });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Warehouse Name"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                required
                maxLength={255}
            />
            <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                maxLength={1000}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit">{initialData.warehouse_id ? 'Update Warehouse' : 'Create Warehouse'}</Button>
        </form>
    );
};

export default WarehouseForm;
