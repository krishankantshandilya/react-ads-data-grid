const requiredOperatorForEmptyValue = ["IS NOT NULL", "IS NULL"];

const compare = {
  true: (value, filterValue) => value === filterValue,
  false: (value, filterValue) => value === filterValue,
  "=": (value, filterValue) => value === filterValue,
  "<": (value, filterValue) => value < filterValue,
  ">": (value, filterValue) => value > filterValue,
  "<=": (value, filterValue) => value <= filterValue,
  ">=": (value, filterValue) => value >= filterValue,
  "!=": (value, filterValue) => value !== filterValue,
  IN: (value, filterValue) => {
    const filterValueArray = filterValue.split(",");
    return filterValueArray.includes(value);
  },
  "NOT IN": (value, filterValue) => {
    const filterValueArray = filterValue.split(",");
    return !filterValueArray.includes(value);
  },
  "IS NOT NULL": (value) => value !== "",
  "IS NULL": (value) => value === "",
};

const compareItemValue = (value, operator, filterValue) => {
  let comparisonPassed = false;

  switch (operator) {
    case "true":
    case "false":
    case "=":
    case "<":
    case ">":
    case ">=":
    case "<=":
    case "!=":
    case "IN":
    case "NOT IN":
      comparisonPassed = compare[operator](value, filterValue);
      break;
    case "IS NOT NULL":
    case "IS NULL":
      comparisonPassed = compare[operator](value);
      break;
    default:
  }

  return comparisonPassed;
};

const filterItem = (item, filters) => {
  let filterValueFound = true;

  for (let filterName in filters) {
    const { name, operator, value: filterValue } = filters?.[filterName];
    if (name && operator && item[name] !== undefined) {
      if (
        filterValue === "" &&
        !requiredOperatorForEmptyValue.includes(operator)
      ) {
        filterValueFound = true;
      } else {
        filterValueFound = compareItemValue(item[name], operator, filterValue);
        if (!filterValueFound) {
          break;
        }
      }
    }
  }

  return filterValueFound;
};

export const filterItems = (items, filters, searchOnField, textToSearch) => {
  if (searchOnField) {
    return items.filter((item) => {
      let found = item?.[searchOnField]
        .toLowerCase()
        .includes(textToSearch.toLowerCase());
      if (found) {
        found = filterItem(item, filters);
      }

      return found;
    });
  } else {
    return items.filter((item) => filterItem(item, filters));
  }
};
