import AutoCompleteInput from "../Inputs/AutoCompleteInput";
import filterStyles from "./filter.module.css";

const SelectFilter = ({ value, operator, onValueChange, options = [], multiple = false }) => {
    const defaultAutoCompleteValue = () => {
        if (multiple) {
            const options = value ? value.split(",").map((value) => value) : [];

            return [...new Set(options)];
        }

        return value ?? null;
    };

    return (
        <AutoCompleteInput
            disablePortal
            multiple={multiple}
            options={options}
            onChange={(event, newValue) => {
                const value = newValue ? newValue.toString() : newValue;
                onValueChange(value);
            }}
            getOptionLabel={(option) => option}
            value={defaultAutoCompleteValue()}
            className={filterStyles["filterInput"]}
        />
    )
};

export default SelectFilter;
