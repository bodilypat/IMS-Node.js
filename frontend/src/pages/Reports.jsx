//src/pages/Report.jsx 

import React, { useState, useEffect } from 'react';
import InventoryChart from '../components/charts/InventoryChart';
import SalesChart from '../components/charts/SalesChart';
import PurchaseChart from '../components/charts/PurchaseChart';
import PieChart from '../components/charts/PieChart';
import Button from '../components/ui/Button';

const Report = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [purchaseData, setPurchaseData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        // Fetch inventory stock levels
        fetch('/api/reports/inventory')
            .then(res => res.json())
            .then(data => setInventoryData(data))
            .catch(err => console.error('Error fetching inventory data:', err));
            
        // Fetch sales data
        fetch('/api/reports/sales')
            .then(res => res.json())
            .then(data => setSalesData(data))
            .catch(err => console.error('Error fetching sales data:', err));

        // Fetch purchase data
        fetch('/api/reports/purchase')
            .then(res => res.json())
            .then(data => setPurchaseData(data))
            .catch(err => console.error('Error fetching purchase data:', err));

        // Fetch category-wise sales data
        fetch('/api/reports/category')
            .then(res => res.json())
            .then(data => setCategoryData(data))
            .catch(err => console.error('Error fetching category data:', err));
    }, []);

    return (
        <div className="report-page">
            <h1>Inventory Management Reports</h1>
            <div className="charts-container">
                <div className="chart-item">
                    <h2>Inventory Stock Levels</h2>
                    <InventoryChart data={inventoryData} />
                </div>
                <div className="chart-item">
                    <h2>Sales Trends</h2>
                    <SalesChart data={salesData} />
                </div>
                <div className="chart-item">
                    <h2>Purchase Trends</h2>
                    <PurchaseChart data={purchaseData} />
                </div>
                <div className="chart-item">
                    <h2>Sales by Category</h2>
                    <PieChart data={categoryData} />
                </div>
            </div>
            <Button onClick={() => window.print()}>Print Report</Button>
        </div>
    );
};

export default Report;
