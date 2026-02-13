//src/routes/purchaseRoutes.js 

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PurchaseList from '../pages/purchase/PurchaseList';
import CreatePurchase from '../pages/purchase/CreatePurchase';
import PurchaseDetails from '../pages/purchase/PurchaseDetails';
import EditPurchase from '../pages/purchase/EditPurchase';

const PurchaseRoutes = () => {
    return (
        <Routes>
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/purchases/create" element={<CreatePurchase />} />
            <Route path="/purchases/:id" element={<PurchaseDetails />} />
            <Route path="/purchases/:id/edit" element={<EditPurchase />} />
        </Routes>
    );
};

export default PurchaseRoutes;
