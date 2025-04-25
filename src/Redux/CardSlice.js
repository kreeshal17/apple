import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage (initial state)
const savedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalAmount: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState: savedCart,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }

            // Recalculate total amount
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }

            // Recalculate total amount
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price * item.quantity),
                0
            );
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
