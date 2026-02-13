//src/routes/salesRoutes.js 

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SalesList from '../pages/sales/SalesList';
import CreateSale from '../pages/sales/CreateSale';
import SaleDetails from '../pages/sales/SaleDetails';
import SaleReport from '../pages/sales/SaleReport';

const SalesRoutes = () => {
    return (
        <Routes>
            <Route path="/sales" element={<SalesList />} />
            <Route path="/sales/create" element={<CreateSale />} />
            <Route path="/sales/:id" element={<SaleDetails />} />
            <Route path="/sales/report" element={<SaleReport />} />
        </Routes>
    );
};

export default SalesRoutes;
