import { baseApi } from "@/redux/base/baseApi"

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({ 

        // get products  

        getProducts: build.query({
            query: () => {
                return {
                    url: "/products",
                }
            },
        }), 

        

    })
})

export const { useGetProductsQuery } = productsApi