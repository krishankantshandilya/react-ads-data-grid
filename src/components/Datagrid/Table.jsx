import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setCurrentPage } from "../../store/slices/FilterSlice";

const DatagridTable = forwardRef(({
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
  tableHeaderSticky,
  paginationSticky,
  tableStyles = {},
  filterToolbarProps = {
    hideFilterToolbar: true
  },
  itemsPerPage = 25,
  totalItems,
  onRowClick = () => { },
  onQueryChange,
  onRefreshQuery,
  ...rest
}, ref) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(rows);
  const { currentPage, columnFilters, searchValue, sort } = useSelector(
    (state) => state.react_data_grid_filters
  );
  const totalItemsCount = !totalItems ? data.length : totalItems;
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dataItems = !isServerSidePagination && isPaginationAllowed
    ? data?.slice(indexOfFirstItem, indexOfLastItem)
    : data;

  const currentPageItemsKeys = [...dataItems.keys()];
  const firstRender = useRef(true);
  const handleOnQueryRefresh = useCallback(() => {
    onQueryChange({ currentPage, columnFilters, searchValue, sort });
  }, [currentPage, columnFilters, searchValue, sort]);

  useImperativeHandle(ref, () => ({
    refreshQuery() {
      onQueryChange({ currentPage, columnFilters, searchValue, sort });
    }
  }));

  const handleOnPageChange = (page) => {
    dispatch(
      setCurrentPage(page)
    );
  };

  const sortLocalData = (sortProps) => {
    if (typeof onQueryChange !== "function" && !isServerSideSortable) {
      const iteratees = [sortProps?.headerName ?? ""];
      const direction = sortProps?.direction === "ascending" ? "asc" : "desc";
      const orders = [direction];
      const sortedData = sortItems(data, iteratees, orders);
      setData(sortedData);
    }
  }

  const filterLocalData = (filters) => {
    if (typeof onQueryChange !== "function" && !isServerSideFiltering) {
      const filteredData = filterItems(rows, filters);
      setData(filteredData);
    }
  }

  const searchLocalData = (text) => {
    if (typeof onQueryChange !== "function" && !isServerSideSearch) {
      const updatedData = filterItems(rows, columnFilters, searchOnField, text);
      setData(updatedData);
    }
  }

  useEffect(() => {
    sortLocalData(sort);
  }, [sort])

  useEffect(() => {
    filterLocalData(columnFilters);
  }, [columnFilters])

  useEffect(() => {
    searchLocalData(searchValue);
  }, [searchValue])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof onQueryChange === "function") {
      handleOnQueryRefresh()
    }
  }, [handleOnQueryRefresh]);

  return (
    <Box style={tableStyles ? { ...tableStyles } : {}}>
      {!filterToolbarProps?.hideFilterToolbar && (
        <FilterToolbar
          headers={headers}
          title={searchTitle}
          placeholder={searchPlaceholder}
          itemsCount={data?.length ?? 0}
          {...filterToolbarProps}
        />
      )}
      {isPaginationAllowed && (
        <Pagination
          currentPage={currentPage}
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
});

export default DatagridTable;
