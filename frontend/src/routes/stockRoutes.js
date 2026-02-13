//src/hooks/stockRoutes.js 

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StockDashboard from '../pages/stock/StockDashboard';
import StockInfo from '../pages/stock/StockInfo';
import StockOut from '../pages/stock/StockOut';
import StockAdjustment from '../pages/stock/StockAdjustment';
import StockHistory from '../pages/stock/StockHistory';
import StockReport from '../pages/stock/StockReport';
import StockTransfer from '../pages/stock/StockTransfer';

const StockRoutes = () => {
    return (
        <Routes>
            <Route path="/stock" element={<StockDashboard />} />
            <Route path="/stock/in" element={<StockInfo />} />
            <Route path="/stock/out" element={<StockOut />} />
            <Route path="/stock/adjustment" element={<StockAdjustment />} />
            <Route path="/stock/history" element={<StockHistory />} />
            <Route path="/stock/report" element={<StockReport />} />
            <Route path="/stock/transfer" element={<StockTransfer />} />
        </Routes>
    );
}

export default StockRoutes;
