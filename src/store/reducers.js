import { combineReducers } from "redux";
import { FilterSlice, filterReducer } from "./slices/FilterSlice";

// ==============================|| COMBINE REDUCER ||============================== //
const reducers = combineReducers({
  [FilterSlice.name]: filterReducer,
});

export default reducers;
