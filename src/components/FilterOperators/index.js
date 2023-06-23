const hideInputOperatorTypes = ["true", "false", "NOT EMPTY", "EMPTY"];

const selectTypeOperators = ["IN", "NOT IN"];

const operatorTypes = {
  CONTAINS: "Contains",
  "DOES NOT CONTAIN": "Does not contain",
  "STARTS WITH": "Starts with",
  true: "Yes",
  false: "No",
  BETWEEN: "Between",
  "NOT BETWEEN": "Not between",
  IN: "In list",
  "NOT IN": "Not in list",
  "NOT EMPTY": "Is not empty",
  "EMPTY": "Is empty",
  "<": "<",
  ">": ">",
  ">=": ">=",
  "<=": "<=",
  "=": "Is equal to",
  "!=": "Not equal to",
};

const identifierFilterOperators = [
  "CONTAINS",
  "DOES NOT CONTAIN",
  "STARTS WITH",
  "=",
  "!=",
  "IN",
  "NOT IN",
  "NOT EMPTY",
  "EMPTY"
];

const stringFilterOperators = [
  "CONTAINS",
  "DOES NOT CONTAIN",
  "STARTS WITH",
  "=",
  "!=",
  "NOT EMPTY",
  "EMPTY",
];

const selectFilterOperator = [
  "IN",
  "NOT IN",
  "NOT EMPTY",
  "EMPTY",
]

const numberFilterOperators = ["=", "!=", "<", ">", ">=", "<="];

const dateFilterOperators = ["BETWEEN", "NOT BETWEEN", "=", "!=", "<", ">", "NOT EMPTY", "EMPTY"];

const booleanFilterOperators = [true, false];

const operatorsTypeList = (operatorsType) => {
  switch (operatorsType) {
    case "number":
      return numberFilterOperators;
    case "boolean":
      return booleanFilterOperators;
    case "date":
      return dateFilterOperators;
    case "identifier":
      return identifierFilterOperators;
    case "select":
      return selectFilterOperator;
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
  identifierFilterOperators,
  selectFilterOperator,
  operatorsTypeList,
};
