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
        })
    })
})

export const {useGetAllOrdersQuery} = orderApiSlice;