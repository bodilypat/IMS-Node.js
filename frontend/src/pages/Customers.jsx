//src/pages/Customers.jsx 

import React, { useState, useEffect } from 'react';
import Datatable from '../components/ui/Datatable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('/api/customers');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Open Add Modal
    const openAddModal = () => {
        setEditingCustomer(null);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
        });
        setIsOpen(true);
    };

    // Open Edit Modal
    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        setFormData({
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
        });
        setIsOpen(true);
    };

    // Delete Customer
    const handleDelete = async (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await fetch(`/api/customers/${customerId}`, { method: 'DELETE' });
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    // Save Customer (Add or Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingCustomer) {
            const updated = customers.map((cust) =>
                cust.customer_id === editingCustomer.customer_id ? { ...cust, ...formData } : cust
            );
            setCustomers(updated);
            setIsOpen(false);
        } else {
            const newCustomer = { ...formData, customer_id: Date.now() };
            setCustomers([...customers, newCustomer]);
            setIsOpen(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Customers</h1>   
                <Button onClick={openAddModal}>Add Customer</Button>
            </div>
            <Datatable
                columns={[
                    { header: 'First Name', accessor: 'first_name' },
                    { header: 'Last Name', accessor: 'last_name' },
                    { header: 'Email', accessor: 'email' },
                    { header: 'Phone', accessor: 'phone' },
                    { header: 'Address', accessor: 'address' },
                    { header: 'Actions', accessor: 'actions' },
                ]}
                data={customers.map((customer) => ({
                    ...customer,
                    actions: (
                        <div className="space-x-2">
                            <Button onClick={() => openEditModal(customer)}>Edit</Button>
                            <Button onClick={() => handleDelete(customer.customer_id)} variant="danger">
                                Delete  
                            </Button>
                        </div>
                    ),
                }))}
            />  
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingCustomer ? 'Edit Customer' : 'Add Customer'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input      
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <Textarea
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <Button type="submit">{editingCustomer ? 'Update' : 'Add'} Customer</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Customers;

