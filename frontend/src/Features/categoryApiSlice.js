import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORIES_URL}/allCategories`,
                method: 'GET',
                headers: {"Content-Type":"application/json"},
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
            providesTags:['Categories']
        })
    })
})

export const {useGetAllCategoriesQuery} = categoryApiSlice;