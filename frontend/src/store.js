import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../src/Features/authSlice";
import themeSliceReducer from "./Features/themeSlice";
import orderSliceReducer from "./Features/orderSlice";
import { apiSlice } from "./Features/apiSlice";
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        userTheme: themeSliceReducer,
        orders: orderSliceReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;