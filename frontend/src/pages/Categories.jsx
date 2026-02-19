//src/pages/Categories.jsx 

import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [formData, setFormData] = useState({
        category_name: '',
        description: ''
    });

    
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }   
    };

    const openModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                category_name: category.category_name,
                description: category.description
            });
        } else {
            setEditingCategory(null);
            setFormData({
                category_name: '',
                description: ''
            });
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingCategory ? 'PUT' : 'POST';
            const url = editingCategory ? `/api/categories/${editingCategory.category_id}` : '/api/categories';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                fetchCategories();
                closeModal();
            } else {
                console.error('Error saving category');
            }   
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'category_id' },
        { header: 'Category Name', accessor: 'category_name' },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (category) => (
                <Button onClick={() => openModal(category)}>Edit</Button>
            )
        }
    ];
    return (
        <div>
            <h1>Categories</h1>
            <Button onClick={() => openModal()}>Add Category</Button>
            <DataTable columns={columns} data={categories} />

            {isOpen && (
                <Modal onClose={closeModal}>
                    <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Category Name"
                            name="category_name"
                            value={formData.category_name}
                            onChange={handleChange}
                            required
                        />
                        <TextArea
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit">{editingCategory ? 'Update' : 'Create'}</Button>
                        <Button type="button" onClick={closeModal}>Cancel</Button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Categories;
