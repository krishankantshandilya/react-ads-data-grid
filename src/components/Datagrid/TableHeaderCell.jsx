import { Table } from "akeneo-design-system";
import PropTypes from "prop-types";

export const TableHeaderCell = ({ children, ...rest }) => {
  const restProps = { ...rest };

  if (!restProps?.isSortable) {
    if (restProps?.onDirectionChange) {
      delete restProps?.onDirectionChange;
    }

    if (restProps?.sortDirection) {
      delete restProps?.sortDirection;
    }
  }

  return <Table.HeaderCell {...restProps}>{children}</Table.HeaderCell>;
};

TableHeaderCell.propTypes = {
  isSortable: PropTypes.bool,
  onDirectionChange: PropTypes.func,
  children: PropTypes.node,
};
