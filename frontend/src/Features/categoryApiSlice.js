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
        }),
        addCategory: builder.mutation({
            query: ()=> ({
                url: `${CATEGORIES_URL}/addCategory`,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }),
            invalidatesTags: ['Categories']
        }),
        editCategory: builder.mutation({
            query:(data)=> ({
                url:`${CATEGORIES_URL}/updateCategory/${data.categoryId}`,
                method: 'PUT',
                body: data,
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }),
            invalidatesTags: ['Categories']
        }),
        getSpecificCategory: builder.query({
            query: (categoryId) => ({
                url: `${CATEGORIES_URL}/getSpecificCategory/${categoryId}`,
                method: 'GET',
                headers: {"Content-Type":"application/json"},
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
        deleteCategory: builder.mutation({
            query:(categoryId)=> ({
                url:`${CATEGORIES_URL}/deleteCategory/${categoryId}`,
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }),
            invalidatesTags: ['Categories']
        })
    })
})

export const {useGetAllCategoriesQuery, useAddCategoryMutation, useEditCategoryMutation, useGetSpecificCategoryQuery, useDeleteCategoryMutation} = categoryApiSlice;