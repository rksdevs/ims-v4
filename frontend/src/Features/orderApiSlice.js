import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/allOrders`,
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Orders']
        }),
        getSpecificOrderDetails: builder.query({
            query: (orderId)=>({
                url: `${ORDERS_URL}/specificOrder/${orderId}`,
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            }) 
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url:`${ORDERS_URL}/createOrder`,
                method: 'POST',
                body: data,
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            })
        })
    })
})

export const {useGetAllOrdersQuery, useGetSpecificOrderDetailsQuery, useCreateOrderMutation} = orderApiSlice;