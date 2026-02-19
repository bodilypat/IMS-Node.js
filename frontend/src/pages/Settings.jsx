//src/pages/Settings.jsx

import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

const Settings = () => {
    const [settings, setSettings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingSetting, setEditingSetting] = useState(null);

    const [formData, setFormData] = useState({
        setting_key: '',
        setting_value: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Open Add Modal
    const openAddModal = () => {
        setEditingSetting(null);
        setFormData({ setting_key: '', setting_value: '' });
        setIsOpen(true);
    };

    // Open Edit Modal
    const openEditModal = (setting) => {
        setEditingSetting(setting);
        setFormData({ setting_key: setting.setting_key, setting_value: setting.setting_value });
        setIsOpen(true);
    };

    // Delete Setting 
    const handleDelete = async (setting) => {
        const filtered = settings.filter(s => s.setting_id !== setting.setting_id);
        setSettings(filtered);
        try {
            await fetch(`/api/settings/${setting.setting_id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting setting:', error);
        }
    };
    
    // Save Setting (Add / Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingSetting) {
            const updated = settings.map(s => s.setting_id === editingSetting.setting_id ? { ...s, ...formData } : s);
            setSettings(updated);
        } else {
            const newSetting = { ...formData, setting_id: Date.now() };
            setSettings([...settings, newSetting]);
        }
        setIsOpen(false);
        try {
            if (editingSetting) {
                await fetch(`/api/settings/${editingSetting.setting_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('/api/settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
        } catch (error) {
            console.error('Error saving setting:', error);
        }
    };

    // Table Columns
    const columns = [
        { header: 'Key', accessor: 'setting_key' },
        { header: 'Value', accessor: 'setting_value' },
        { header: 'Actions', accessor: 'actions', Cell: ({ row }) => (
            <div className="flex space-x-2">
                <Button onClick={() => openEditModal(row.original)} variant="outline" size="sm">Edit</Button>   
                <Button onClick={() => handleDelete(row.original)} variant="outline" color="red" size="sm">Delete</Button>
            </div>
        ) }
    ];

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Settings</h1>
                <Button onClick={openAddModal}>Add Setting</Button>
            </div>
            <DataTable columns={columns} data={settings} />

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingSetting ? 'Edit Setting' : 'Add Setting'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        label="Key" 
                        name="setting_key"
                        value={formData.setting_key}
                        onChange={handleInputChange}
                        required
                    />
                    <Textarea
                        label="Value"
                        name="setting_value"
                        value={formData.setting_value}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <Button type="button" onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
                        <Button type="submit">{editingSetting ? 'Update' : 'Add'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Settings;




        