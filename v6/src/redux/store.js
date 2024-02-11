import { configureStore } from '@reduxjs/toolkit';
import userReducer from './api/userSlice';
import productReducer from './api/productSlice';
import purchaseReducer from './api/purchaseSlice';

export const store = configureStore({
    reducer: {
        userState: userReducer,
        productState: productReducer,
        purchaseState: purchaseReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
});
