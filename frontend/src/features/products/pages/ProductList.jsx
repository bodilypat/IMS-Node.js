//src/freatures/products/pages/ProductList.jsx 

import { useEffect, useState, useMomo } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Loader from '../../../components/common/Loader';

import { getProducts, deleteProduct } from '../product.api';
import { useDebounce } from '../../../hooks/useDebounce';
import { formatCurrency } from '../../../utils/formatCurrency';

const ProductList = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);

    const useDebounceSearch = useDebounce(search, 500);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts({ search: useDebounceSearch });
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [useDebounceSearch]);

    // Handle product deletion
    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteProduct(productId);
            setProducts((prev) => prev.filter((product) => product.id !== productId));
        } catch (err) {
            alert("Failed to delete product.");

        }
    };

    // Table columns definition
    const columns = useMemo( 
        () => [
            { 
                Header: "Product Name",
                accessor: "name",
            },
            {
                Header: "SKU",
                accessor: "sku",
            },
            {
                Header: "Category",
                accessor: "category?.name",
                Cell: ({ row }) => row.original.category?.name || 'Uncategorized',
            },
            {
                Header: "Price",
                accessor: "selling_price",
                Cell: ({ value }) => formatCurrency(value),
            },
            {
                Header: "Stock",
                accessor: "inventory.quantity",
                Cell: ({ row }) => row.original.inventory?.quantity || 0,
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/products/edit/${row.original.id}`)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        [navigate]
    );

    return (
        <Card title="Products" className="mt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <input 
                type="text"
                placeholder="Search products..."
                className="input w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                onClick={() => navigate('/products/add')}
                variant="success"
            >
                Add Product
            </Button>
        </div>
        {/* Content */}
        {loading && <Loader />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && (
            <Table
                columns={columns}
                data={products}
                noDataMessage="No products found."
            />
        )}  
    </Card>
    );
};
export default ProductList;

