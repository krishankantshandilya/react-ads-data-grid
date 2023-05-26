import { useState } from "react";
import { Search } from "akeneo-design-system";
import { Stack } from "@mui/material";
import { ColumnFilters } from "../Filter/ColumnFilters";

export const FilterToolbar = ({
  headers,
  placeholder,
  title,
  itemsCount,
  hideResultCount = false,
  hideColumnFiters = false,
  onSearchChange = () => {},
}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Search
      onSearchChange={(text) => {
        setSearchText(text);
        onSearchChange(text);
      }}
      placeholder={placeholder}
      title={title}
      searchValue={searchText}
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
