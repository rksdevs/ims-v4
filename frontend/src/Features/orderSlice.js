import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrders: localStorage.getItem("allOrders") ? JSON.parse(localStorage.getItem("allOrders")) : null
}

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.allOrders = action.payload;
            localStorage.setItem("allOrders", JSON.stringify(action.payload));
        }
    }
})

export const {setOrders} = orderSlice.actions;

export default orderSlice.reducer;