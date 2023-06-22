import { Table } from "akeneo-design-system";
import PropTypes from "prop-types";
import { TableHeaderCell } from "./TableHeaderCell";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../store/slices/FilterSlice";

export const TableHeader = ({
  sticky,
  headers,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { sort } = useSelector(
    (state) => state.react_data_grid_filters
  );

  const onSortChangeHandler = (direction, headerName) => {
    dispatch(
      setSort({
        headerName,
        direction
      }
      )
    );
  };

  const TableHeaderCells = () => {
    return (
      <Table.Header sticky={sticky}>
        {headers.map((header, index) => {
          const { name, label } = header;
          const sortDirection = sort?.headerName === name ? sort.direction : "none";

          return (
            <TableHeaderCell
              key={`${index}${name}`}
              onDirectionChange={(direction) =>
                onSortChangeHandler(direction, name)
              }
              {...header}
              {...rest}
              sortDirection={sortDirection}
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
