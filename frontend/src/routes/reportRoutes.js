//src/hooks/reportRoutes.js 

import React from 'react';
import { Route, Routes} from 'react-router-dom';
import ReportDashboard from '../pages/reports/ReportDashboard';
import SalesReport from '../pages/reports/SalesReport';
import PurchaseReport from '../pages/reports/PurchaseReport';
import InventoryReport from '../pages/reports/InventoryReport';
import ProfitLossReport from '../pages/reports/ProfitLossReport';

const ReportRoutes = () => {
    return (
        <Routes>
            <Route path="/reports" element={<ReportDashboard />} />
            <Route path="/reports/sales" element={<SalesReport />} />
            <Route path="/reports/purchase" element={<PurchaseReport />} />
            <Route path="/reports/inventory" element={<InventoryReport />} />
            <Route path="/reports/profit-loss" element={<ProfitLossReport />} />
        </Routes>
    );
};

export default ReportRoutes;
