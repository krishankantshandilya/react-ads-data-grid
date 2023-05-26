import { useState } from "react";
import { Table } from "akeneo-design-system";
import PropTypes from "prop-types";
import { TableHeaderCell } from "./TableHeaderCell";

export const TableHeader = ({
  sticky,
  headers,
  onDirectionChange,
  ...rest
}) => {
  const [sortDirection, setSortDirection] = useState({});

  const onSortChangeHandler = (direction, headerName) => {
    setSortDirection((prevState) => ({
      ...prevState,
      [headerName]: direction,
    }));

    onDirectionChange({
      direction,
      headerName,
    });
  };

  const TableHeaderCells = () => {
    return (
      <Table.Header sticky={sticky}>
        {headers.map((header, index) => {
          const { name, label } = header;

          return (
            <TableHeaderCell
              key={`${index}${name}`}
              onDirectionChange={(direction) =>
                onSortChangeHandler(direction, name)
              }
              {...header}
              {...rest}
              sortDirection={sortDirection?.[name] ?? "none"}
            >
              {label}
            </TableHeaderCell>
          );
        })}
      </Table.Header>
    );
  };

  return TableHeaderCells();
};

TableHeader.propTypes = {
  sticky: PropTypes.number,
  headers: PropTypes.array.isRequired,
  onDirectionChange: PropTypes.func,
};
