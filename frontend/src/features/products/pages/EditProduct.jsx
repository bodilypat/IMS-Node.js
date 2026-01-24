//src/features/products/pages/EditProduct.jsx 

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';

import {
    fetchProductById,
    updateProductById,
    getCategories,
} from '../product.api';

import { validateProduct } from '../../../utils/validation';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        sku: '',
        categoryId: '',
        costPrice: '',
        sellingPrice: '',
        quantity: '',
        reorderLevel: '',
        description: '',
    });

    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // Load product and categories on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, categoriesData] = await Promise.all([
                    fetchProductById(id),
                    getCategories(),
                ]);
                
                const product = productData.data;

                setForm({
                    name: product.name || '',
                    sku: product.sku || '',
                    categoryId: product.categoryId || '',
                    costPrice: product.costPrice || '',
                    sellingPrice: product.sellingPrice || '',
                    quantity: product.quantity || '',
                    reorderLevel: product.reorderLevel || '',
                    description: product.description || '',
                });
                setCategories(categoriesData.data || []);
                setPageLoading(false);
            } catch (error) {
                console.error('Error fetching product or categories:', error);
                setPageLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    // Handle form imput changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Subit update 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateProduct(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        try {
            setLoading(true);
            await updateProductById(id, form);
            navigate('/products');
        } catch (error) {
            console.error('Error updating product:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return <Loader />;
    }

    return (
        <Card title="Edit Product">
            {loading && <Loader />}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                {/* Product Name */}
                <div>
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* SKU */}
                <div>
                    <label className="block mb-1 font-medium">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
                </div>

                {/* Cost Price */}
                <div>
                    <label className="block mb-1 font-medium">Cost Price</label>
                    <input
                        type="number"
                        name="costPrice"
                        value={form.costPrice}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.costPrice && <p className="text-red-500 text-sm">{errors.costPrice}</p>}
                </div>

                {/* Selling Price */}
                <div>
                    <label className="block mb-1 font-medium">Selling Price</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={form.sellingPrice}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice}</p>}
                </div>

                {/* Quantity */}
                <div>
                    <label className="block mb-1 font-medium">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>
                
                {/* Reorder Level */}
                <div>
                    <label className="block mb-1 font-medium">Reorder Level</label>
                    <input
                        type="number"
                        name="reorderLevel"
                        value={form.reorderLevel}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.reorderLevel && <p className="text-red-500 text-sm">{errors.reorderLevel}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={() => navigate('/products')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Product'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
export default EditProduct;
