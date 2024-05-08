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
            })
        }),
        getSpecificProduct: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/specificProducts/${productId}`,
                method:'GET',
                headers: {"Content-Type":"application/json"},
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products']
        })
    })
}) 

export const {useGetAllProductsQuery, useAddProductMutation, useGetSpecificProductQuery} = productApiSlice