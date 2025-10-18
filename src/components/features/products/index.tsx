"use client";
import React from 'react';
import ProductsFilter from './ProductsFilter';
import { useGetCategoriesQuery } from '@/redux/features/product/categoriesApi';
import { Product } from '@/types/type';
import ProductDetailsModal from '../product-details/ProductDetailsModal';
import ProductForm from '@/components/shared/ProductForm';
import ProductList from './ProductList';
import { useDeleteProduct } from '@/hook/useDeleteProduct';
import { useProductData } from '@/hook/useProductData';

const AllProducts = () => { 
    // filter 
    const [offset, setOffset] = React.useState(5);
    const [limit] = React.useState(10);
    const [categoryId, setCategoryId] = React.useState<string | undefined>(undefined);
    const [search, setSearch] = React.useState<string>("");

    // get products & categories
    const { data: categories } = useGetCategoriesQuery(undefined);
    const { activeData, refetch, isFetching } = useProductData(offset, limit, categoryId, search);

    // product details
    const [isProductDetails, setIsProductDetails] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    // product form 
    const [isProductForm, setIsProductForm] = React.useState(false);
    const [selectedProductForm, setSelectedProductForm] = React.useState<Product | null>(null);

    //delete product
    const { handleDelete } = useDeleteProduct(refetch);

    const categoryOptions =
        categories?.map((cat: { id: string; name: string }) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    const handleEdit = (product: Product) => {
        setIsProductForm(true);
        setSelectedProductForm(product);
    };

    const handleDetails = (product: Product) => {
        setIsProductDetails(true);
        setSelectedProduct(product);
    };

    const handleCategoryChange = (id?: string) => {
        setCategoryId(id);
        setOffset(5);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setOffset(5);
    };

    const handlePageChange = (page: number) => {
        setOffset((page - 1) * limit);
    };

    return (
        <div className='container pt-5 lg:pt-10'>
            <div className='lg:mb-10 mb-5'>
                <ProductsFilter CategoryOption={categoryOptions}
                    onCategoryChange={handleCategoryChange}
                    onSearch={handleSearch}
                    setIsProductForm={setIsProductForm} />
            </div>

            <ProductList
                products={activeData || []}
                isFetching={isFetching}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDetails={handleDetails}
                offset={offset}
                limit={limit}
                total={ categoryId || search ? activeData?.length || 0 : 50 }
                onPageChange={handlePageChange}
            />

            <ProductDetailsModal
                product={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                isOpen={isProductDetails} 
                refetch={refetch}
                onClose={() => setIsProductDetails(false)}
            />

            <ProductForm
                product={selectedProductForm}
                isOpen={isProductForm}
                onClose={() => setIsProductForm(false)}
                refetch={refetch}
                setSelectedProduct={setSelectedProductForm} />

        </div>
    );
};

export default AllProducts;