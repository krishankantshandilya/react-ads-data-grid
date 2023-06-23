import { TextInput } from "akeneo-design-system";
import { selectTypeOperators } from "../FilterOperators";
import AutoCompleteInput from "../Inputs/AutoCompleteInput";
import filterStyles from "./filter.module.css";

const IdentifierFilter = ({ value, operator, onValueChange, options = [], multiple = false }) => {
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
                    disablePortal
                    freeSolo
                    multiple={multiple}
                    options={options}
                    onChange={(event, newValue) => {
                        const value = newValue ? newValue.toString() : newValue;
                        onValueChange(value);
                    }}
                    value={defaultAutoCompleteValue()}
                    className={filterStyles["filterInput"]}
                />
            )}
        </>
    );
};

export default IdentifierFilter;
