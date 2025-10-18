import { baseApi } from "@/redux/base/baseApi"

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        // get products  

        getProducts: build.query({
            query: ({ limit, offset, categoryId }) => {
                const params = new URLSearchParams()
                if (limit) params.append("limit", limit)
                if (offset) params.append("offset", offset)
                if (categoryId) params.append("category", categoryId)
                return {
                    url: `/products?${params.toString()}`,
                }
            },
        }),

        // get products with search  
        searchProducts: build.query({
            query: ({ searchedText, offset, limit }) => {
                const params = new URLSearchParams({
                    searchedText,
                    offset: offset.toString(),
                    limit: limit.toString(),
                });
                return `/products/search?${params.toString()}`;
            },
        }),

    })
})

export const { useGetProductsQuery , useSearchProductsQuery } = productsApi