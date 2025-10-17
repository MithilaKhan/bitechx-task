import { baseApi } from "@/redux/base/baseApi"

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({   

        getCategories: build.query({
            query: () => { 
                return{
                    url: "/categories",
                }
            },
        }),
         
    }) 
}) 

export const { useGetCategoriesQuery } = categoriesApi