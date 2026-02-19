//src/components/forms/CategoryForm.jsx

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CategoryForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <Input
                label="Category Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <Button type="submit">Save Category</Button>
        </form>
    );
}