//src/components/forms/CustomerForm.jsx

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CustomerForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

    return (
    <form onSubmit={handleSubmit} className="customer-form">
        <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      {/* Address */}
        <Input  
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
        <Button type="submit">Save Customer</Button>
    </form>
  );
};

export default CustomerForm;


