import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  currentPage: 1,
  columnFilters: {},
  searchValue: ""
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
    setSearchValue: (state, action) => {
      const { payload } = action;
      const searchValue = payload;
      return { ...state, searchValue };
    }
  },
});

export const { setFilters, setSearchValue } = FilterSlice.actions;
export const filterReducer = FilterSlice.reducer;
