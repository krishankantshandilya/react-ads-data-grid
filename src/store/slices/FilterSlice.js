import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  currentPage: 1,
  columnFilters: {},
  sort: {
    headerName: "",
    direction: "none"
  },
  searchValue: ""
};

// Actual Slice
export const FilterSlice = createSlice({
  name: "react_data_grid_filters",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      const { payload: currentPage } = action;
      return { ...state, currentPage };
    },
    setFilters: (state, action) => {
      const { payload } = action;
      const columnFilters = {
        ...state.columnFilters,
        ...payload,
      };

      return { ...state, columnFilters };
    },
    setSort: (state, action) => {
      const { payload: sort } = action;
      return { ...state, sort };
    },
    setSearchValue: (state, action) => {
      const { payload: searchValue } = action;
      return { ...state, searchValue };
    },
  },
});

export const { setFilters, setSearchValue, setCurrentPage, setSort } = FilterSlice.actions;
export const filterReducer = FilterSlice.reducer;
