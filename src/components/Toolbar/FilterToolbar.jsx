import { useEffect, useState } from "react";
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
}) => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(
    (state) => state.react_data_grid_filters
  );
  const [searchTerm, setSearchTerm] = useState(searchValue)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        setSearchValue(searchTerm)
      );
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <Search
      onSearchChange={setSearchTerm}
      placeholder={placeholder}
      title={title}
      searchValue={searchTerm}
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