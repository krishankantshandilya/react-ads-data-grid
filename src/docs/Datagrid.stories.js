import { StylesProvider } from "@mui/styles";
import { ThemeProvider } from "styled-components";
import { connectorTheme } from "akeneo-design-system";
import { Source } from "@storybook/blocks";
import { Datagrid } from "../components";
import rows from "../mockData";

const headers = [
  {
    name: "image",
    label: "Image",
    valueType: "image",
  },
  {
    name: "flight_number",
    label: "Flight number",
    isFilterable: true,
    isSortable: true,
    isExportable: true,
  },
  {
    name: "departure_airport",
    label: "Departure airport",
    isSortable: true,
    isExportable: true,
  },
  {
    name: "arrival_airport",
    label: "Arrival airport",
    isFilterable: true,
    isExportable: true,
  },
  {
    name: "departure_date",
    label: "Departure date",
    isFilterable: true,
    isExportable: true,
  },
  {
    name: "arrival_date",
    label: "Arrival date",
    isFilterable: true,
    isExportable: true,
  },
  {
    name: "passenger_name",
    label: "Passenger name",
    isExportable: true,
    isFilterable: true,
  },
];

const Mockstore = ({ children }) => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={connectorTheme}>{children}</ThemeProvider>
  </StylesProvider>
);

export default {
  component: Datagrid,
  title: "Datagrid",
  tags: ["autodocs"],
};

export const Default = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  args: {
    headers: headers,
    rows: rows,
  }
};

export const ServerSideSort = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  args: {
    ...Default.args,
    isServerSideSortable: false,
    onSortChange: (props) => console.log(props),
  },
};

export const DraggableRows = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  args: {
    ...Default.args,
    isDragAndDroppable: true,
    onReorder: (newIndices) => {
      console.log(newIndices);
    },
  },
};

export const SelectableAndToolbarActions = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  args: {
    ...Default.args,
    isSelectable: true,
    overrideDatagridToolbarAction: false,
    datagridToolbarAction: [
      {
        component: ({ selection }) => {
          return (
            <Button level="secondary" onClick={() => console.log(selection)}>
              Custom Button
            </Button>
          );
        },
      },
    ],
  },
};

export const ScrollAndStickyHeaders = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  args: {
    ...Default.args,
    tableHeaderSticky: 0,
    tableStyles: {
      height: "500px",
      overflow: "auto",
    },
  },
};

export const Pagination = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  args: {
    ...Default.args,
    isPaginationAllowed: true,
    isServerSidePagination: false,
    paginationSticky: 0,
    onPageChange: (page) => {
      console.log(page);
    },
  },
};

export const SearchAndFilters = {
  decorators: [(story) => <Mockstore>{story()}</Mockstore>],
  title: "test",
  args: {
    ...Default.args,
    isServerSideSearch: false,
    searchOnField: "flight_number",
    onSearchChange: (text) => {
      console.log(text);
    },
    isServerSideFiltering: false,
    onFilterChange: (filters) => {
      console.log(filters);
    },
    filterToolbarProps: {
      hideFilterToolbar: false,
      hideResultCount: false,
      hideColumnFiters: false,
    },
  },
};
