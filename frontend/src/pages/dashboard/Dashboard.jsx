//src/pages/dashboard/Dashboard.jsx

import React from 'react';
import { useSales } from '../../hooks/useSales';
import { usePurchases } from '../../hooks/usePurchases';
import { useStock } from '../../hooks/useStock';
import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { sales } = useSales();
    const { purchases } = usePurchase();
    const { stock } = useStock();
    const { products} = useProduct();

    /* Calculations */
    constotalRevenue = useMemo(() => {
        return sales.reduce((total, sale) => total + sale.totalAmount, 0);
    }, [sales]);

    const totalPurchaseAmount = useMemo(() => {
        return purchases.reduce((total, purchase) => total + purchase.totalAmount, 0);
    }, [purchases]);

    const lowStockItems = useMemo(() => {
        return stock.filter(item => item.quantity <= 5 && item.quantity > 0);
    }, [stock]);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="card">
                    <h2>Total Products</h2>
                    <p>{products.length}</p>
                    <Link to="/products">View Products</Link>
                </div>
                <div className="card">  
                    <h2>Total Sales</h2>
                    <p>${totalRevenue.toFixed(2)}</p>
                    <Link to="/sales">View Sales</Link>
                </div>
                <div className="card">
                    <h2>Total Purchases</h2>
                    <p>${totalPurchaseAmount.toFixed(2)}</p>
                    <Link to="/purchases">View Purchases</Link>
                </div>
                <div className="card">
                    <h2>Low Stock Items</h2>
                    <p>{lowStockItems.length}</p>
                    <Link to="/stock">View Stock</Link>
                </div>
                <div className="card">
                    <h2>Out of Stock Items</h2>
                    <p>{stock.filter(item => item.quantity === 0).length}</p>
                    <Link to="/stock">View Stock</Link>
                </div>
                <div className="card">
                    <h2>Best Selling Product</h2>
                    <p>{sales.length > 0 ? sales.reduce((best, sale) => sale.totalAmount > best.totalAmount ? sale : best, sales[0]).productName : 'N/A'}</p>
                    <Link to="/sales">View Sales</Link>
                </div>
                <div className="card">
                    <h2>Recent Sales</h2>
                    <ul>
                        {sales.slice(0, 5).map(sale => (    
                            <li key={sale.id}>{sale.productName} - ${sale.totalAmount.toFixed(2)}</li>
                        ))}
                    </ul>
                    <Link to="/sales">View Sales</Link>
                </div>
                <div className="card">
                    <h2>Recent Purchases</h2>
                    <ul>
                        {purchases.slice(0, 5).map(purchase => (
                            <li key={purchase.id}>{purchase.productName} - ${purchase.totalAmount.toFixed(2)}</li>
                        ))}
                    </ul>
                    <Link to="/purchases">View Purchases</Link>
                </div>
                <div className="card">
                    <h2>Stock Value</h2>
                    <p>${stock.reduce((total, item) => total + (item.quantity * item.unitPrice), 0).toFixed(2)}</p>
                    <Link to="/stock">View Stock</Link>
                </div>
                <div className="card">
                    <h2>Average Sale Value</h2>
                    <p>{sales.length > 0 ? `$${(totalRevenue / sales.length).toFixed(2)}` : 'N/A'}</p>
                    <Link to="/sales">View Sales</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

