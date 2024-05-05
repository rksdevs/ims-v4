import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../src/Features/authSlice";
import themeSliceReducer from "./Features/themeSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        theme: themeSliceReducer,
    },
    devTools: true,
})

export default store;