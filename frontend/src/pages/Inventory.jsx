//src/pages/Inventory.jsx 

import React, { useState, useEffect } from 'react';
import InventoryTable from '../components/tables/InventoryTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [adjustmentQuantity, setAdjustmentQuantity] = useState('');

    useEffect(() => {
        fetch('/api/inventory')
            .then(response => response.json())
            .then(data => setInventory(data))
            .catch(error => console.error('Error fetching inventory:', error));
    }, []);

    // Open Adjustment Modal
    const handleAdjustClick = (item) => {
        setSelectedItem(item);
        setAdjustmentQuantity('');
        setIsOpen(true);
    };

    // Save Inventory Adjustment
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedInventory = inventory.map(inv => {
            if (inv.inventory_id === selectedItem.inventory_id) {
                return { ...inv, quantity: inv.quantity + parseInt(adjustmentQuantity) };
            }
            return inv;
        });
        setInventory(updatedInventory);
        setIsOpen(false);
    };

    // Highlight Low Stock Items
    const processedInventory = inventory.map(item => ({
        ...item,
        isLowStock: item.quantity < item.reorder_level
    }));

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <InventoryTable inventory={processedInventory} onAdjustClick={handleAdjustClick} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Adjust Inventory">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product: {selectedItem?.product_name}</label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Quantity: {selectedItem?.quantity}</label>
                    </div>
                    <div>
                        <Input
                            type="number"
                            label="Adjustment Quantity"
                            value={adjustmentQuantity}
                            onChange={(e) => setAdjustmentQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Adjustment</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Inventory;

