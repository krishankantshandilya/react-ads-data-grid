# React ADS Data Grid

View [Documentation](https://www.chromatic.com/component?appId=6474affbba574942f11aa134&csfId=datagrid--default&buildNumber=1&k=6474b1c1eac33b89739969b9-1200-interactive-true&h=20&b=-11)

<a href="https://www.npmjs.com/package/react-ads-data-grid" target="_blank">
  <img alt="" src="https://img.shields.io/npm/v/react-ads-data-grid" />
</a>
<a href="https://www.npmjs.com/package/react-ads-data-grid" target="_blank">
  <img alt="" src="https://badgen.net/npm/dt/react-ads-data-grid?label=installs&icon=npm&color=blue" />
</a>
<a href="https://www.npmjs.com/package/react-ads-data-grid" target="_blank">
  <img alt="" src="https://img.shields.io/npm/dw/react-ads-data-grid" />
</a>
<a href="https://github.com/krishankantshandilya/react-ads-data-grid/blob/master/LICENSE" target="_blank">
  <img alt="" src="https://badgen.net/github/license/krishankantshandilya/react-ads-data-grid?color=blue" />
</a>

## About

### _Built with [Akeneo Design System](https://dsm.akeneo.com/) and [Material UI <sup>V5</sup>](https://mui.com/)__

### Quick Examples

 - [Storybook Example](https://www.chromatic.com/component?appId=6474affbba574942f11aa134&csfId=datagrid--default&buildNumber=1&k=6474b1c1eac33b89739969b9-1200-interactive-true&h=20&b=-11)

## Features

- Built in datagrid sort
- Server Side Sort
- Draggable Rows
- Selectable and toolbar actions
- Scroll and sticky headers
- Built in pagination
- Server side pagination
- Built in search and filters
- Search and filters

## Getting Started

### Installations

```bash
npm install akeneo-design-system
```

Install react-ads-data-grid

```bash
npm install react-ads-data-grid
```

### Usage

```jsx
import { connectorTheme } from "akeneo-design-system";
import { Datagrid } from "react-ads-data-grid";

const rows = [
  {
    "id": "0fcb6709-06d7-4703-993a-12bc13fb7d34",
    "image": "http://dummyimage.com/119x100.png/5fa2dd/ffffff",
    "flight_number": "UA456",
    "departure_airport": "GTN",
    "arrival_airport": "FFO",
    "departure_date": "4/19/2023",
    "arrival_date": "8/12/2022",
    "passenger_name": "Meade Mackison"
  },
  {
    "id": "eabfe4b4-eb0d-4fd6-b2ca-3f2873dbda72",
    "image": "http://dummyimage.com/158x100.png/cc0000/ffffff",
    "flight_number": "DL789",
    "departure_airport": "NAF",
    "arrival_airport": "YSD",
    "departure_date": "1/29/2023",
    "arrival_date": "11/26/2022",
    "passenger_name": "Gery Wildbore"
  },
  {
    "id": "3f7fd02f-d18b-4a68-9697-6b1a501d56e2",
    "image": "http://dummyimage.com/248x100.png/5fa2dd/ffffff",
    "flight_number": "UA456",
    "departure_airport": "BSQ",
    "arrival_airport": "KVB",
    "departure_date": "5/25/2023",
    "arrival_date": "12/24/2022",
    "passenger_name": "Caesar de Broke"
  },
  {
    "id": "4a18b4c0-7852-47e3-826f-b42e60f0306f",
    "image": "http://dummyimage.com/172x100.png/ff4444/ffffff",
    "flight_number": "AA123",
    "departure_airport": "0",
    "arrival_airport": "MGC",
    "departure_date": "4/13/2023",
    "arrival_date": "5/21/2023",
    "passenger_name": "Kristo Hundall"
  },
  {
    "id": "d96de98b-8c06-4d76-8421-e7039d28fa3b",
    "image": "http://dummyimage.com/195x100.png/ff4444/ffffff",
    "flight_number": "DL789",
    "departure_airport": "QWG",
    "arrival_airport": "YQD",
    "departure_date": "4/14/2023",
    "arrival_date": "9/30/2022",
    "passenger_name": "Petrina Casarili"
  },
  {
    "id": "326ceb24-d138-4e8e-af6b-b71de397cf47",
    "image": "http://dummyimage.com/165x100.png/ff4444/ffffff",
    "flight_number": "UA456",
    "departure_airport": "DEF",
    "arrival_airport": "RBD",
    "departure_date": "12/8/2022",
    "arrival_date": "2/10/2023",
    "passenger_name": "Bobby Spooner"
  },
  {
    "id": "2175c8ca-9ff3-49a4-9fc1-8c39332cf381",
    "image": "http://dummyimage.com/250x100.png/cc0000/ffffff",
    "flight_number": "DL789",
    "departure_airport": "BZR",
    "arrival_airport": "PQM",
    "departure_date": "3/18/2023",
    "arrival_date": "2/6/2023",
    "passenger_name": "Susanne Kornes"
  },
  {
    "id": "9acaebdf-99c5-4f60-8764-0d7e03537371",
    "image": "http://dummyimage.com/128x100.png/5fa2dd/ffffff",
    "flight_number": "DL789",
    "departure_airport": "FLL",
    "arrival_airport": "BXT",
    "departure_date": "4/11/2023",
    "arrival_date": "7/7/2022",
    "passenger_name": "Obadias Klosa"
  },
  {
    "id": "09501ace-7674-4af1-84ab-ebe27721ca95",
    "image": "http://dummyimage.com/180x100.png/ff4444/ffffff",
    "flight_number": "AA123",
    "departure_airport": "AMQ",
    "arrival_airport": "SKW",
    "departure_date": "6/28/2022",
    "arrival_date": "4/26/2023",
    "passenger_name": "Diana Houtby"
  }];

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

export default function App() {
  return (
    <Datagrid
      theme={connectorTheme}
      headers={headers}
      rows={data}
      searchPlaceholder="search"
      searchTitle="Search"
      tableClassName=""
      searchOnField="name"
      isServerSideSearch={false}
      onSearchChange={(text) => console.log(text)}
      isServerSideFiltering={false}
      onFilterChange={(filters) => console.log(filters)}
      isPaginationAllowed={true}
      isServerSidePagination={false}
      onPageChange={(page) => console.log(page)}
      isServerSideSortable={false}
      onSortChange={(props) => console.log(props)}
      isSelectable={false}
      tableHeaderSticky={0}
      paginationSticky={0}
      tableStyles={{}}
      filterToolbarProps={{
        hideFilterToolbar: true,
        displayFilterToolbar: true,
      }}
      currentPage={1}
      itemsPerPage={25}
      totalItems={100}
      itemsPerPageonRowClick={(row) => console.log(row)}
      overrideDatagridToolbarAction={false}
      datagridToolbarAction={
        [
          {
            component: ({ selection }) => {
              return (
                <Button
                  level="secondary"
                  onClick={() => console.log(selection)}
                >
                  Test Items
                </Button>
              );
            },
          },
        ]}
    />
  );
}
```