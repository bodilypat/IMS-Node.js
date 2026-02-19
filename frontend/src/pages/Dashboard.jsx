//src/pages/Dashboard.jsx 

/* 
** Overview metrics 
** Charts (SalesChart, PurchaseChart, InventoryChart)
** Low stock alerts 
** Quick stats card 
**
 */
import React from 'react';
import ChartWrapper from '../components/charts/ChartWrapper';
import SalesChart from '../components/charts/SalesChart';
import PurchaseChart from '../components/charts/PurchaseChart';
import InventoryChart from '../components/charts/InventoryChart';

const Dashboard = () => {
    const salesData = [
        { period: 'jan, total_sales: 5000' },
        { period: 'feb, total_sales: 7000' },
        { period: 'mar, total_sales: 6000' },
    ];
    const purchaseData = [
        { period: 'jan, total_purchases: 3000' },
        { period: 'feb, total_purchases: 4000' },
        { period: 'mar, total_purchases: 3500' },
    ];
    const inventoryData = [
        { period: 'jan, total_inventory: 1500' },
        { period: 'feb, total_inventory: 1200' },
        { period: 'mar, total_inventory: 1300' },
    ];

    return (
        <div>
            <ChartWrapper title="Sales Overview">
                <SalesChart data={salesData} />
            </ChartWrapper>
            <ChartWrapper title="Purchase Overview">
                <PurchaseChart data={purchaseData} />
            </ChartWrapper>
            <ChartWrapper title="Inventory Overview">
                <InventoryChart data={inventoryData} />
            </ChartWrapper>
        </div>
    );
};

export default Dashboard;



