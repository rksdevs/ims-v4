import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem("theme")) : "system"
}

const themeSlice = createSlice({
    name: "userTheme",
    initialState,
    reducers: {
        setUserTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", JSON.stringify(action.payload))
        }
    }
})

export const {setUserTheme} = themeSlice.actions;

export default themeSlice.reducer;