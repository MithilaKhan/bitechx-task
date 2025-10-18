"use client";

import { useGetProductsQuery, useSearchProductsQuery } from "@/redux/features/product/productsApi";

export const useProductData = (offset: number, limit: number, categoryId?: string, search?: string) => { 
    
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

    return { activeData, refetch, isFetching };
};