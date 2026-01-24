//src/features/products/pages/AddProduct.jsx 

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';

import { createProduct, getCategories } from '../product.api';
import { validateProduct } from '../../../utils/validators';

const AddProduct = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        sku: '',
        categoryId: '',
        contPrice: '',
        sellPrice: '',
        quantity: '',
        reorderLevel: '',
        description: ''
    });

    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data || []);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateProduct(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsLoading(true);
            await createProduct(form);
            navigate('/products');
        } catch (error) {
            console.error('Failed to create product', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Add Product">
        {isLoading && <Loader />}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4" noValidate>
                {/* Product Name */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* SKU */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.sku ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                </div>

                {/* Category */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded`}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                </div>

                {/* Cost Price */}
                <div>
                    <label className="block mb-1 font-medium">Cost Price</label>
                    <input
                        type="number"
                        name="contPrice"
                        value={form.contPrice}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.contPrice ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.contPrice && <p className="text-red-500 text-sm mt-1">{errors.contPrice}</p>}
                </div>

                {/* Selling Price */}
                <div>
                    <label className="block mb-1 font-medium">Selling Price</label>
                    <input
                        type="number"
                        name="sellPrice"
                        value={form.sellPrice}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.sellPrice ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.sellPrice && <p className="text-red-500 text-sm mt-1">{errors.sellPrice}</p>}
                </div>
            
                {/* Quantity */}
                <div>
                    <label className="block mb-1 font-medium">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                </div>
            
                {/* Reorder Level */}
                <div>
                    <label className="block mb-1 font-medium">Reorder Level</label>
                    <input
                        type="number"
                        name="reorderLevel"
                        value={form.reorderLevel}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.reorderLevel ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.reorderLevel && <p className="text-red-500 text-sm mt-1">{errors.reorderLevel}</p>}
                </div>
                {/* Description */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Submit Button */}
                <div className="col-span-2 text-right">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
export default AddProduct;



