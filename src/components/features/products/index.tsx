"use client";
import { useGetProductsQuery } from '@/redux/features/product/productsApi';
import React from 'react';
import ProductsFilter from './ProductsFilter';
import { useGetCategoriesQuery } from '@/redux/features/product/categoriesApi';
import ProductCard from './ProductCard';
import { Product } from '@/types/type';
import ProductDetailsModal from '../product-details/ProductDetailsModal';

const AllProducts = () => {
    const { data: allProducts, refetch } = useGetProductsQuery(undefined);
    const { data: categories } = useGetCategoriesQuery(undefined);
    const [isProductDetails, setIsProductDetails] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null); 

    const categoryOptions =
        categories?.map((cat: { id: string; name: string }) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    const handleEdit = (id: string) => {
        console.log("Edit", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete", id);
    };

    const handleDetails = (product: Product) => {
        setIsProductDetails(true);
        setSelectedProduct(product);
    };

    return (
        <div className='container pt-5 lg:pt-10'>
            <div className='lg:mb-10 mb-5'>
                <ProductsFilter CategoryOption={categoryOptions} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10  ">
                {
                    allProducts?.map((product: any) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onDetails={handleDetails}
                        />
                    ))
                }
            </div>

            <ProductDetailsModal
                product={selectedProduct}
                isOpen={isProductDetails}
                onClose={() => setIsProductDetails(false)}
            />

        </div>
    );
};

export default AllProducts;