import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/allProducts`,
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
            providesTags:['Products']
        }),
        addProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}/addProduct`,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),
        getSpecificProduct: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/specificProducts/${productId}`,
                method:'GET',
                headers: {"Content-Type":"application/json"},
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
        }),
        editProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/updateProduct/${data.productId}`,
                method:'PUT',
                body: data,
                headers: {"Content-Type":"application/json"},
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ['Products']
        }),
    })
}) 

export const {useGetAllProductsQuery, useAddProductMutation, useGetSpecificProductQuery, useEditProductMutation} = productApiSlice