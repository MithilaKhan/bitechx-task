import { baseApi } from "@/redux/base/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        loginUser: build.mutation({
            query: (data) => ({
                url: "/auth",
                method: "POST",
                body: data,
            }),
        }),

    }),
});

export const {useLoginUserMutation } = authApi