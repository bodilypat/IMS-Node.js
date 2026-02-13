//src/routes/productRoutes.js 

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../pages/products/ProductList';
import AddProduct from '../pages/products/AddProduct';
import EditProduct from '../pages/products/EditProduct';
import ProductDetails from '../pages/products/ProductDetails';

const ProductRoutes = () => {
    return (
        <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
    );
};

export default ProductRoutes;

