import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "./api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", api.getProducts);
export const addProduct = createAsyncThunk("products/addProduct", api.addProduct);
export const updateProduct = createAsyncThunk("products/updateProduct", api.updateProduct);
export const deleteProduct = createAsyncThunk("products/deleteProduct", api.deleteProduct);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        status: "idle",
        error: null
    },
    reducers: {},
    //для остальных действий можно прописать такие же состояния как для получения данных
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const {id, data} = action.payload;
                const existingProductIndex = state.list.findIndex((product) => product._id === id);
                //создание копии объекта
                if(existingProductIndex !== -1) {
                    state.list[existingProductIndex] = {...state.list[existingProductIndex], ...data};
                    // Object.assign(existingProduct, updatedProduct);
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter((product) => product._id !== action.payload);
            })
    }
})

//селекторы для извлечения данных из стора. доступ к данным состояния products в сторе
//первый - возвращает полный список товаров
//второй - находит конкретный товар по id
export const selectAllProducts = (state) => state.products.list;
export const selectProductById = (state, productId) => state.products.list.find((product) => product._id === productId);

export default productsSlice.reducer;