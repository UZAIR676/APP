import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice.js';
import authreducer from './features/auth/authSlide.js'



const store = configureStore({
    reducer:{

        [apiSlice.reducerPath]:apiSlice.reducer,
        auth : authreducer,

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat
    (apiSlice.middleware),
    devTools:true
})


setupListeners(store.dispatch)

export default store;
