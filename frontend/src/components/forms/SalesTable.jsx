//src/components/tables/SalesTable.jsx 

import React from 'react';

function SalesTable({ sales, onView, onDelete }) {
    return (
        <table className="sales-table ">
            <thead>
                <tr>
                    <th>Invoice</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sales.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">No sales found.</td>
                    </tr>
                ) : (
                    sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.invoiceNumber}</td>
                            <td>{sale.customerName}</td>
                            <td>{new Date(sale.date).toLocaleDateString()}</td>
                            <td>${sale.total.toFixed(2)}</td>
                            <td>
                                <button onClick={() => onView(sale)}>View</button>
                                <button onClick={() => onDelete(sale.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default SalesTable;

