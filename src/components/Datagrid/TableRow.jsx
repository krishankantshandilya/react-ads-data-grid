import { Badge, Image, Table } from "akeneo-design-system";
import _ from "lodash";

export const TableRow = ({ headers, row, ...rest }) => {
  const CellValue = (valueType, value) => {
    switch (valueType) {
      case "boolean": {
        let booleanLevel = "Yes";
        let level = "primary";
        if (!value) {
          booleanLevel = "No";
          level = "danger";
        }

        return <Badge level={level}>{booleanLevel}</Badge>;
      }
      case "image":
        return <Image alt="" src={value} />;
      case "json":
        return JSON.stringify(value);
      case "string":
      case "number":
        return value;
      default:
        throw new RangeError("The value type must be valid");
    }
  };

  const TableHeaderCells = () => {
    return (
      <Table.Row {...rest}>
        {headers.map((header, index) => {
          const { name, valueType, renderRowCell } = header;
          const type = valueType ?? "string";
          const value = _.get(row, name) ?? "";
          if (typeof renderRowCell === "function") {
            return renderRowCell(row, index);
          }
          return <Table.Cell key={index}>{CellValue(type, value)}</Table.Cell>;
        })}
      </Table.Row>
    );
  };

  return TableHeaderCells();
};
