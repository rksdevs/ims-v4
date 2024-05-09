import { apiSlice } from "./apiSlice";
import { BRANDS_URL } from "../constants";

const brandApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrands: builder.query({
            query: () => ({
                url: `${BRANDS_URL}/allBrands`,
                method: 'GET',
                headers: {"Content-Type":"application/json"},
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Brands"]
        }),
        addBrand: builder.mutation({
            query: () => ({
                url: `${BRANDS_URL}/addBrand`,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }),
            invalidatesTags:['Brands']
        }),
        getSpecificBrand: builder.query({
            query:(brandId) => ({
                url: `${BRANDS_URL}/specificBrand/${brandId}`,
                method: 'GET',
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }),
            keepUnusedDataFor: 5,
        }),
        editBrandDetails: builder.mutation({
            query: (data) => ({
                url: `${BRANDS_URL}/updateBrand/${data.brandId}`,
                method:'PUT',
                body: data,
                headers: {"Content-Type":"application/json"},
                credentials: 'include'
            }),
            invalidatesTags: ['Brands']
        }),
        deleteBrand: builder.mutation({
            query: (brandId) => ({
                url:`${BRANDS_URL}/deleteBrand/${brandId}`,
                method: 'DELETE',
                headers: {"Content-Type":"application/json"},
                credentials: 'include',
            }),
            invalidatesTags: ['Brands']
        })
    })
})

export const {useGetAllBrandsQuery, useAddBrandMutation, useGetSpecificBrandQuery, useEditBrandDetailsMutation, useDeleteBrandMutation} = brandApiSlice;