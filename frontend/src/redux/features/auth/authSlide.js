import { createSlice } from "@reduxjs/toolkit";

// Retrieve and parse userInfo from localStorage
const storedUserInfo = localStorage.getItem('userInfo');

const initialState = {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null
};

const apiSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            
            // Calculate expiration time and set it in localStorage
            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem('expirationTime', expirationTime);
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('expirationTime');
        },
    }
});

export const { setCredentials, logout } = apiSlice.actions;
export default apiSlice.reducer;
