import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  currentPage: 1,
  columnFilters: {},
};

// Actual Slice
export const FilterSlice = createSlice({
  name: "react_data_grid_filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const { payload } = action;
      const columnFilters = {
        ...state.columnFilters,
        ...payload,
      };

      return { ...state, columnFilters };
    },
  },
});

export const { setFilters } = FilterSlice.actions;
export const filterReducer = FilterSlice.reducer;
