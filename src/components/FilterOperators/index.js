const hideInputOperatorTypes = ["true", "false", "IS NOT NULL", "IS NULL"];

const selectTypeOperators = ["IN", "NOT IN"];

const operatorTypes = {
  true: "Yes",
  false: "No",
  BETWEEN: "Between",
  "NOT BETWEEN": "Not between",
  IN: "In list",
  "NOT IN": "Not in list",
  "IS NOT NULL": "Is not empty",
  "IS NULL": "Is empty",
  "<": "<",
  ">": ">",
  ">=": ">=",
  "<=": "<=",
  "=": "Is equal to",
  "!=": "Not equal to",
};

const stringFilterOperators = [
  "IN",
  "NOT IN",
  "=",
  "!=",
  "IS NOT NULL",
  "IS NULL",
];

const numberFilterOperators = ["=", "!=", "<", ">", ">=", "<="];

const dateFilterOperators = ["BETWEEN", "NOT BETWEEN", "<", ">"];

const booleanFilterOperators = [true, false];

const operatorsTypeList = (operatorsType) => {
  switch (operatorsType) {
    case "number":
      return numberFilterOperators;
    case "boolean":
      return booleanFilterOperators;
    case "date":
      return dateFilterOperators;
    default:
      return stringFilterOperators;
  }
};

export {
  hideInputOperatorTypes,
  operatorTypes,
  numberFilterOperators,
  stringFilterOperators,
  dateFilterOperators,
  booleanFilterOperators,
  selectTypeOperators,
  operatorsTypeList,
};
