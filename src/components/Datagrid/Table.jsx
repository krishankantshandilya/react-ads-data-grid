import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Table } from "akeneo-design-system";
import { Box } from "@mui/material";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { FilterToolbar } from "../Toolbar/FilterToolbar";
import { DatagridToolBar } from "../Toolbar/DatagridToolBar";
import { useSelection } from "../../hooks/useSelection";
import { filterItems } from "../../utils/filter.utils";
import { sortItems } from "../../utils/sort.utils";
import ExportButton from "../Toolbar/Actions/ExportsButton";
import EmptyData from "../EmptyData";

const DatagridTable = ({
  headers = [],
  rows = [],
  searchPlaceholder = "search",
  searchTitle = "Search",
  tableClassName = "",
  searchOnField = "",
  overrideDatagridToolbarAction = false,
  emptyDataComponent,
  datagridToolbarAction = [],
  isServerSideFiltering = false,
  isServerSideSearch = false,
  isServerSidePagination = false,
  isServerSideSortable = false,
  isPaginationAllowed = false,
  isSelectable = false,
  onSortChange,
  tableHeaderSticky,
  paginationSticky,
  tableStyles = {},
  filterToolbarProps = {
    hideFilterToolbar: true
  },
  currentPage = 1,
  itemsPerPage = 25,
  totalItems,
  onPageChange,
  onSearchChange,
  onFilterChange,
  onRowClick = () => {},
  ...rest
}) => {
  const [data, setData] = useState(rows);
  const { columnFilters } = useSelector(
    (state) => state.react_data_grid_filters
  );

  const totalItemsCount = !totalItems ? data.length : totalItems;
  const [currentPageValue, setCurrentPageValue] = useState(currentPage);
  const [
    selection,
    selectionState,
    isItemSelected,
    onSelectionChange,
    onSelectAllChange,
    onSelectAllVisibleChange,
    selectedCount,
  ] = useSelection(totalItemsCount);
  const showToolbar = 0 < totalItemsCount && !!selectionState;
  const indexOfLastItem = currentPageValue * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dataItems =
    !isServerSidePagination && isPaginationAllowed
      ? data?.slice(indexOfFirstItem, indexOfLastItem)
      : data;

  const currentPageItemsKeys = [...dataItems.keys()];

  const handleOnFilterChange = useCallback(
    (filters) => {
      if (isServerSideFiltering) {
        if (typeof onFilterChange !== "function") {
          throw new Error(
            'For server side filtering, a valid function "onFilterChange" should be pass in props.'
          );
        }
        onFilterChange(filters);
      } else {
        const filteredData = filterItems(rows, filters);
        setData(filteredData);
      }
    },
    [isServerSideFiltering, rows, onFilterChange, setData]
  );

  const handleOnSearchChange = (text) => {
    if (isServerSideSearch) {
      if (typeof onSearchChange !== "function") {
        throw new Error(
          `For server side search, a valid function "onSearchChange" should be pass in props.`
        );
      }
      onSearchChange(text);
    } else {
      if (!searchOnField) {
        throw new Error(
          `To filter items based on search, a valid props "searchOnField" should be pass in props.`
        );
      }
      const updatedData = filterItems(rows, columnFilters, searchOnField, text);
      setData(updatedData);
    }
  };

  const handleOnPageChange = (page) => {
    if (isServerSidePagination) {
      if (typeof onPageChange !== "function") {
        throw new Error(
          'For server side pagination, a valid function "onPageChange" should be pass in props.'
        );
      }

      onPageChange(page);
    }

    setCurrentPageValue(page);
  };

  const onDirectionChange = (sortProps) => {
    if (isServerSideSortable) {
      if (typeof onSortChange !== "function") {
        throw new Error(
          'For server side sorting, a valid function "onSortChange" should be pass in props.'
        );
      }

      onSortChange(sortProps);
    } else {
      const iteratees = [sortProps?.headerName ?? ""];
      const direction = sortProps?.direction === "ascending" ? "asc" : "desc";
      const orders = [direction];
      const sortedData = sortItems(data, iteratees, orders);
      setData(sortedData);
    }
  };

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    handleOnFilterChange(columnFilters);
  }, [handleOnFilterChange, columnFilters]);

  useEffect(() => {
    setCurrentPageValue(currentPage);
  },[currentPage])

  return (
    <Box style={tableStyles ? { ...tableStyles } : {}}>
      {!filterToolbarProps?.hideFilterToolbar && (
        <FilterToolbar
          headers={headers}
          title={searchTitle}
          onSearchChange={handleOnSearchChange}
          placeholder={searchPlaceholder}
          itemsCount={data?.length ?? 0}
          {...filterToolbarProps}
        />
      )}
      {isPaginationAllowed && (
        <Pagination
          currentPage={currentPageValue}
          itemsPerPage={itemsPerPage}
          totalItems={totalItemsCount}
          sticky={paginationSticky}
          followPage={handleOnPageChange}
        />
      )}
      {dataItems.length > 0 && (
        <Table
          className={tableClassName}
          isSelectable={isSelectable}
          displayCheckbox={!!selectionState}
          {...rest}
        >
          <TableHeader
            headers={headers}
            sticky={tableHeaderSticky}
            onDirectionChange={onDirectionChange}
          />
          <Table.Body>
            {dataItems.map((row, index) => (
              <TableRow
                key={index}
                headers={headers}
                row={row}
                onSelectToggle={(value) => onSelectionChange(index, value)}
                isSelected={isItemSelected(index)}
                onClick={() => onRowClick(row)}
              />
            ))}
          </Table.Body>
        </Table>
      )}

      {dataItems.length <= 0 && (
        <EmptyData
          size="large"
          title="Sorry, there is no items for your search."
          subTitle="Try again with new search criteria."
          customComponent={emptyDataComponent}
        />
      )}

      {isSelectable && showToolbar && (
        <DatagridToolBar
          currentPageItemsKeys={currentPageItemsKeys}
          selectedCount={selectedCount}
          totalItemsCount={totalItemsCount}
          selectionState={selectionState}
          isVisible={showToolbar}
          onSelectAllChange={onSelectAllChange}
          onSelectAllVisibleChange={onSelectAllVisibleChange}
        >
          {!overrideDatagridToolbarAction && (
            <ExportButton
              headers={headers}
              selection={selection}
              items={data}
            />
          )}
          {overrideDatagridToolbarAction &&
            datagridToolbarAction.map((action, index) => {
              const { component } = action;
              const ToolbarComponent = component;
              if (!ToolbarComponent) {
                throw new Error(
                  "Datagrid toolbar action should have a component to render."
                );
              }

              return <ToolbarComponent key={index} selection={selection} />;
            })}
        </DatagridToolBar>
      )}
    </Box>
  );
};

export default DatagridTable;
