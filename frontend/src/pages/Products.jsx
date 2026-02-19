//src/pages/Products.jsx       

import React, { useState, useEffect } from 'react';
import InventoryTable from '../components/tables/InventoryTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({
        product_name: '',
        sku: '',
        category: '',
        price: '',
        supplier_id: '',
        reorder_level: '',
        is_active: true,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingProduct ? 'PUT' : 'POST';
            const url = editingProduct ? `/api/products/${editingProduct.product_id}` : '/api/products';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchProducts();
                setIsOpen(false);
                setEditingProduct(null);
                setFormData({
                    product_name: '',
                    sku: '',
                    category: '',
                    price: '',
                    supplier_id: '',
                    reorder_level: '',
                    is_active: true,
                });
            } else {
                console.error('Error saving product:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }   
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            product_name: product.product_name,
            sku: product.sku,
            category: product.category,
            price: product.price,
            supplier_id: product.supplier_id,
            reorder_level: product.reorder_level,
            is_active: product.is_active,
        });
        setIsOpen(true);
    };

    const handleDelete = async (product_id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`/api/products/${product_id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchProducts();
                } else {
                    console.error('Error deleting product:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <Button onClick={() => setIsOpen(true)}>Add Product</Button>
            </div>
            <InventoryTable
                data={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Product Name"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="SKU"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Supplier ID"
                        name="supplier_id"
                        type="number"
                        value={formData.supplier_id}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Reorder Level"
                        name="reorder_level"
                        type="number"
                        value={formData.reorder_level}
                        onChange={handleInputChange}
                    />
                    <Select
                        label="Active"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleInputChange}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </Select>
                    <Button type="submit">{editingProduct ? 'Update' : 'Create'}</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Products;

