import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: ["Work", "Personal", "Shopping", "Health"],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategoryRequest: (state) => {
      state.loading = true;
    },
    addCategorySuccess: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    addCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFailure,
  clearError,
} = categorySlice.actions;

export default categorySlice.reducer;
