import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CardSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
                ignoredActionPaths: ['payload.timestamp'],
                ignoredPaths: ['items.dates'],
            }
        })
});

export default store;