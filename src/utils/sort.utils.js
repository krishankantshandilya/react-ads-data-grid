import loadash from "lodash";

export const sortItems = (items, iteratees, orders) =>
  loadash.orderBy(items, iteratees, orders);
