import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data,
                headers: {"Content-Type": "application/json"},
                credentials: 'include',  
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation} = authApiSlice