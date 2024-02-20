import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    purchases: [],
    selectedPurchase: {}
};

export const purchaseSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        buyProduct: (state, action) => {
            const { data, user } = action.payload;
            const existed = state.purchases.filter(p => p.customerID === parseFloat(user) && p.productID === parseFloat(data.product))
            if (existed.length > 0) {
                throw new Error('already purchased');
            } else {
                const date = new Date();

                const formatted = date.toLocaleDateString('he-IL', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                const newPurchase = {
                    id: state.purchases.length + 1,
                    customerID: parseFloat(user),
                    productID: parseFloat(data.product),
                    date: formatted,
                }
                state.purchases.push(newPurchase);
            }
        },
        deletePurchase: (state, action) => {
            const productId = action.payload;
            state.selectedPurchase = {}
            state.purchases = state.purchases.filter(purchase => purchase.productID !== parseFloat(productId))
        },
        deleteCustomerPurchase: (state, action) => {
            const customerId = action.payload;
            state.selectedPurchase = {}
            state.purchases = state.purchases.filter(purchase => purchase.customerID !== parseFloat(customerId))
        },
    },
});

export const { buyProduct, deletePurchase, deleteCustomerPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;