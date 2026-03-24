import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  categories: [],
  productsLoading: false,
  categoriesLoading: false,
  loading: false, // Keeping for backward compatibility if used elsewhere
  error: null,
  total: 0,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.productsLoading = true;
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.productsLoading = false;
      state.loading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
    fetchProductsFailure: (state, action) => {
      state.productsLoading = false;
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesRequest: (state) => {
      state.categoriesLoading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categoriesLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.categoriesLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = productSlice.actions;
export default productSlice.reducer;
