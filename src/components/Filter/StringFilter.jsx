import { TextInput } from "akeneo-design-system";
import filterStyles from "./filter.module.css";

const StringFilter = ({ value, operator, onValueChange }) => {
  return (
    <TextInput
      onChange={(value) => {
        onValueChange(value);
      }}
      value={value}
      className={filterStyles["filterInput"]}
    />
  );
};

export default StringFilter;
