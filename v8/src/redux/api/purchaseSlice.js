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
                    id: state.purchases.length ? state.purchases.sort((a, b) => b.id - a.id)[0].id + 1 : 1,
                    customerID: parseFloat(user),
                    productID: parseFloat(data.product),
                    date: formatted,
                }
                state.purchases.push(newPurchase);
                state.purchases.sort((a, b) => a.id - b.id)
            }
        },
        deletePurchase: (state, action) => {
            const productId = action.payload;
            state.selectedPurchase = {}
            state.purchases = state.purchases.filter(purchase => purchase.productID !== parseFloat(productId)).sort((a, b) => a.id - b.id)
        },
        deleteCustomerPurchase: (state, action) => {
            const customerId = action.payload;
            state.selectedPurchase = {}
            state.purchases = state.purchases.filter(purchase => purchase.customerID !== parseFloat(customerId)).sort((a, b) => a.id - b.id)
        },
    },
});

export const { buyProduct, deletePurchase, deleteCustomerPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;