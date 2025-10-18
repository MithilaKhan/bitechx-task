"use client";
import { useDeleteProductMutation, useGetProductsQuery, useSearchProductsQuery } from '@/redux/features/product/productsApi';
import React from 'react';
import ProductsFilter from './ProductsFilter';
import { useGetCategoriesQuery } from '@/redux/features/product/categoriesApi';
import ProductCard from './ProductCard';
import { Product } from '@/types/type';
import ProductDetailsModal from '../product-details/ProductDetailsModal';
import { ConfigProvider, Pagination } from 'antd';
import ProductForm from '@/components/shared/ProductForm';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const AllProducts = () => {
    const [offset, setOffset] = React.useState(5);
    const [limit] = React.useState(10);
    const [categoryId, setCategoryId] = React.useState<string | undefined>(undefined);
    const [search, setSearch] = React.useState<string>("");
    const [deleteProduct] = useDeleteProductMutation();

    const { data: categories } = useGetCategoriesQuery(undefined);
    const {
        data: productData,
        refetch: refetchProducts,
        isFetching: isProductsFetching,
    } = useGetProductsQuery({ offset, limit, categoryId }, { skip: !!search });

    const {
        data: searchData,
        isFetching: isSearchFetching,
        refetch: refetchSearch
    } = useSearchProductsQuery({ searchedText: search, offset, limit }, { skip: !search });

    //  Select  dataset
    const activeData = search ? searchData : productData;
    const refetch = search ? refetchSearch : refetchProducts;
    const isFetching = search ? isSearchFetching : isProductsFetching;

    // product details
    const [isProductDetails, setIsProductDetails] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    // product form 
    const [isProductForm, setIsProductForm] = React.useState(false);

    const categoryOptions =
        categories?.map((cat: { id: string; name: string }) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    const handleEdit = (product: Product) => {
        setIsProductForm(true);
        setSelectedProduct(product);
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteProduct(id); 
                    if ("data" in response) {
                        Swal.fire("Deleted!", "Your product has been deleted.", "success"); 
                        refetch();
                    } else {
                        toast.error("Failed to delete the product.");
                    }
                } catch (error) {
                    toast.error("Something went wrong. Please try again.");
                }
            }
        });
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

            {isFetching ? (
                <p className="text-center py-10 text-gray-500">Loading products...</p>
            ) : activeData?.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {activeData?.map((product: Product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={() => handleEdit(product)}
                                onDelete={() => handleDelete(product.id)}
                                onDetails={() => handleDetails(product)}
                            />
                        ))}
                    </div>

                    {/* 📄 Pagination */}
                    <div className="flex justify-center lg:my-8 my-5 ">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Pagination: {
                                        itemBg: "#A44A3F30",
                                        itemActiveBg: "#A44A3F30",
                                    },
                                },

                                token: {
                                    colorPrimaryBorder: '#0D1821',
                                    colorPrimary: '#A44A3F',
                                },
                            }}
                        >
                            <Pagination
                                current={offset / limit + 1}
                                pageSize={limit}
                                total={search ? activeData?.length : 50}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                            />
                        </ConfigProvider>
                    </div>
                </>
            ) : (
                <p className="text-center py-10 text-gray-400">No products found</p>
            )}

            <ProductDetailsModal
                product={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                isOpen={isProductDetails}
                onClose={() => setIsProductDetails(false)}
            />

            <ProductForm
                product={selectedProduct}
                isOpen={isProductForm}
                onClose={() => setIsProductForm(false)}
                refetch={refetch}
                setSelectedProduct={setSelectedProduct} />

        </div>
    );
};

export default AllProducts;