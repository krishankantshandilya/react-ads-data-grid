import { Search } from "akeneo-design-system";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ColumnFilters } from "../Filter/ColumnFilters";
import { setSearchValue } from "../../store/slices/FilterSlice";

export const FilterToolbar = ({
  headers,
  placeholder,
  title,
  itemsCount,
  hideResultCount = false,
  hideColumnFiters = false,
  onSearchChange = () => { },
}) => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(
    (state) => state.react_data_grid_filters
  );
  return (
    <Search
      onSearchChange={(text) => {
        dispatch(
          setSearchValue(text)
        );
        onSearchChange(text);
      }}
      placeholder={placeholder}
      title={title}
      searchValue={searchValue}
    >
      {!hideResultCount && (
        <Search.ResultCount>{`${itemsCount} results`}</Search.ResultCount>
      )}
      <Stack spacing={1}>
        {!hideColumnFiters && <ColumnFilters headers={headers} />}
      </Stack>
    </Search>
  );
};
