import { createSlice } from '@reduxjs/toolkit';
import { productData } from './products';

const initialState = {
    products: productData,
    selectedProduct: {}
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newProduct = {
                id: state.products.length + 1,
                name: action.payload.name,
                price: parseFloat(action.payload.price),
                quantity: parseFloat(action.payload.quantity),
            }
            state.products.push(newProduct);
        },
        editProduct: (state, action) => {
            const { id, data } = action.payload;
            const index = state.products.findIndex(obj => obj.id === parseFloat(id));
            state.products[index] = {
                id: parseFloat(id),
                name: data.name,
                price: parseFloat(data.price),
                quantity: parseFloat(data.quantity)
            };
        },
        getProduct: (state, action) => {
            const productId = action.payload;
            state.selectedProduct = state.products.find(product => product.id === parseFloat(productId))
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;
            state.selectedProduct = {}
            state.products = state.products.filter(product => product.id !== parseFloat(productId))
        },
        repalceProduct: (state, action) => {
            const { productId } = action.payload;
            state.products = state.products.map(product => {
                if (product.id !== parseFloat(productId)) {
                    return product;
                }

                return {
                    ...product,
                    quantity: parseFloat(product.quantity) - 1
                };
            })
        }
    },
});

export const { addProduct, getProduct, editProduct, deleteProduct, repalceProduct } = productSlice.actions;
export default productSlice.reducer;