import { baseApi } from "@/redux/base/baseApi"

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        // get products  

        getProducts: build.query({
            query: ({ limit, offset, categoryId }) => {
                const params = new URLSearchParams()
                if (limit) params.append("limit", limit)
                if (offset) params.append("offset", offset)
                if (categoryId) params.append("categoryId", categoryId)
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
        //create product
        createProduct: build.mutation({
            query: (value) => {                 
                return {               
                    url: "/products",
                    method: "POST",
                    body: value,
                }
            },
        }),

        // update product  
        updateProduct: build.mutation({
            query: ({id , value}) => {  
                return{         
                url: `/products/${id}`,
                method: "PUT",
                body: value, 
                }
            },
        }),

        // delete product
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
        }),

    })
})

export const { useGetProductsQuery, useSearchProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi