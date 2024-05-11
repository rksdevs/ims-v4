import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {items:[], billNumber: '', custName: '', custAddress: '', custPhone: '', discount: 0, methodOfPayment: 'Cash', readyToCreateOrder:false};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItem = action.payload;
            const cartItemExists = state.items.find((x)=>x._id === cartItem._id);

            if (cartItemExists) {
                state.items = state.items.map((x)=>x._id === cartItem._id ? cartItem : x)
            } else {
                state.items = [...state.items, cartItem]
            }

            return updateCart(state)
        },
        updateCartWithCustInfo: (state, action)=>{
            const {custName, custAddress, custPhone, discount, methodOfPayment} = action.payload;
            state.custName = custName;
            state.custAddress = custAddress;
            state.custPhone = custPhone;
            state.discount = discount;
            state.methodOfPayment = methodOfPayment;
            state.readyToCreateOrder = true
            return updateCart(state);
        },
        clearCart: (state, payload) => {
            state.items = [];

            return updateCart(state)
        },
        removeFromCart: (state, action) =>{
            state.items = state.items.filter((x)=> x._id !== action.payload);
            
            return updateCart(state);
        },
    }
})

export const {addToCart, updateCartWithCustInfo, clearCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;