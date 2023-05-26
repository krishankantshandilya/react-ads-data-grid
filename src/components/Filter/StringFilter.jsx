import { TextInput } from "akeneo-design-system";
import { selectTypeOperators } from "../FilterOperators";
import AutoCompleteInput from "../Inputs/AutoCompleteInput";
import filterStyles from "./filter.module.css";

const StringFilter = ({ value, operator, onValueChange, options = [] }) => {
  const defaultAutoCompleteValue = () => {
    const options = value ? value.split(",").map((value) => value) : [];

    return [...new Set(options)];
  };

  return (
    <>
      {!selectTypeOperators.includes(operator) && (
        <TextInput
          onChange={(value) => {
            onValueChange(value);
          }}
          value={value}
          className={filterStyles["filterInput"]}
        />
      )}
      {selectTypeOperators.includes(operator) && (
        <AutoCompleteInput
          multiple
          freeSolo
          options={options}
          onChange={(event, newValue) => {
            onValueChange(newValue.toString());
          }}
          value={defaultAutoCompleteValue()}
          className={filterStyles["filterInput"]}
        />
      )}
    </>
  );
};

export default StringFilter;
