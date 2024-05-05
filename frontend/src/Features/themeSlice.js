import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userTheme") ? JSON.parse(localStorage.getItem("userTheme")) :  {
    theme: "system"
}

const themeSlice = createSlice({
    name: "userTheme",
    initialState,
    reducers: {
        setUserTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("userTheme", JSON.stringify(action.payload))
        }
    }
})

export const {setUserTheme} = themeSlice.actions;

export default themeSlice.reducer;