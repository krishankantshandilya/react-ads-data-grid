import { useState } from "react";
import {
  Dropdown,
  SwitcherButton,
  useBooleanState,
} from "akeneo-design-system";
import { useDispatch } from "react-redux";
import {
  hideInputOperatorTypes,
  operatorTypes,
  operatorsTypeList,
} from "../FilterOperators";
import BooleanFilter from "./BooleanFilter";
import DateFilter from "./DateFilter";
import FilterUpdateCard from "./FilterUpdateCard";
import NumberFilter from "./NumberFilter";
import StringFilter from "./StringFilter";
import { SupportedFilter } from "./SupportedFilter.js";
import { setFilters } from "../../store/slices/FilterSlice";
import filterStyles from "./filter.module.css";
import SelectFilter from "./SelectFilter";
import IdentifierFilter from "./IdentifierFilter";

const ColumnFilter = ({
  name,
  label,
  value,
  operator,
  filterType = "string",
  dateFormat = "yyyy/MM/dd",
  options = [],
  multiple = false
}) => {
  if (!SupportedFilter.includes(filterType)) {
    throw new Error(`${filterType} is not a valid filter type.`);
  }

  const supportedOperatorsTypeList = operatorsTypeList(filterType);
  const defaultFilter = operator
    ? operator
    : supportedOperatorsTypeList[0] ?? "";
  const [filterOperator, setFilterOperator] = useState(defaultFilter);
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, open, close] = useBooleanState(false);
  const hideInput = hideInputOperatorTypes.includes(filterOperator);
  const dispatch = useDispatch();

  const onValueChange = (value) => {
    setInputValue(value);
  };

  const onClickOperator = (operator) => {
    setFilterOperator(operator);
  };

  const onUpdate = () => {
    const filter = {
      [name]: {
        name,
        operator: filterOperator
      },
    }
    
    if (!hideInput) {
      filter[name].value = inputValue;
    }

    dispatch(
      setFilters(filter)
    );
    close();
  };

  const filterOperatorButtonTitle = () => {
    const operatorLabel = operatorTypes[filterOperator] ?? "";
    let title = "";
    if (hideInput) {
      title = operatorLabel;
    } else if (inputValue) {
      title = `${filterOperator} "${inputValue}"`;
    } else {
      title = "All";
    }

    return title;
  };

  let FilterComponent = StringFilter;
  switch (filterType) {
    case "number":
      FilterComponent = NumberFilter;
      break;
    case "boolean":
      FilterComponent = BooleanFilter;
      break;
    case "date":
      FilterComponent = DateFilter;
      break;
    case "identifier":
      FilterComponent = IdentifierFilter;
      break;
    case "select":
      FilterComponent = SelectFilter;
      break;
    default:
      FilterComponent = StringFilter;
  }

  return (
    <>
      <div className={filterStyles["filterOperatorButtonTitle"]} onClick={open}>
        <SwitcherButton label={label} inline={false}>
          {filterOperatorButtonTitle()}
        </SwitcherButton>
      </div>
      <Dropdown>
        {isOpen && (
          <Dropdown.Overlay
            onClose={close}
            verticalPosition="down"
            fullWidth={true}
            className={filterStyles["filterOperatorDropdown"]}
          >
            <FilterUpdateCard
              label={label}
              filterType={filterType}
              operator={filterOperator}
              onUpdate={onUpdate}
              onClickOperator={onClickOperator}
            >
              {!hideInput && (
                <FilterComponent
                  name={name}
                  value={inputValue}
                  operator={filterOperator}
                  dateFormat={dateFormat}
                  onValueChange={onValueChange}
                  options={options}
                  multiple={multiple}
                />
              )}
            </FilterUpdateCard>
          </Dropdown.Overlay>
        )}
      </Dropdown>
    </>
  );
};

export default ColumnFilter;
