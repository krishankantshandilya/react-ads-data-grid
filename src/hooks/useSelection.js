import { useState, useCallback } from "react";

const selectAll = () => ({
  mode: "not_in",
  collection: [],
});

const unselectAll = () => ({
  mode: "in",
  collection: [],
});

const select = (selection, elementToSelect) => ({
  ...selection,
  collection:
    selection.mode === "in"
      ? [...selection.collection, elementToSelect]
      : selection.collection.filter((element) => element !== elementToSelect),
});

const unselect = (selection, elementToUnselect) => ({
  ...selection,
  collection:
    selection.mode === "in"
      ? selection.collection.filter((element) => element !== elementToUnselect)
      : [...selection.collection, elementToUnselect],
});

const currentSelectionState = (selection, totalCount) => {
  if (selection.collection.length === totalCount) {
    return selection.mode === "in";
  } else if (selection.collection.length !== 0) {
    return "mixed";
  } else {
    return selection.mode === "not_in";
  }
};

const useSelection = (totalCount) => {
  const [selection, setSelection] = useState({
    mode: "in",
    collection: [],
  });

  const isSelected = useCallback(
    (item) => {
      return selection.mode === "in"
        ? selection.collection.includes(item)
        : !selection.collection.includes(item);
    },
    [selection]
  );

  const onSelectionChange = useCallback((item, newValue) => {
    setSelection((selection) =>
      newValue ? select(selection, item) : unselect(selection, item)
    );
  }, []);

  const onSelectAllChange = useCallback((newValue) => {
    setSelection(newValue ? selectAll() : unselectAll());
  }, []);

  const onSelectAllVisibleChange = useCallback((newValues) => {
    setSelection((selection) => ({
      ...selection,
      mode: "in",
      collection: newValues,
    }));
  }, []);

  const selectedCount =
    "in" === selection.mode
      ? selection.collection.length
      : totalCount - selection.collection.length;

  return [
    selection,
    currentSelectionState(selection, totalCount),
    isSelected,
    onSelectionChange,
    onSelectAllChange,
    onSelectAllVisibleChange,
    selectedCount,
  ];
};

export { useSelection };
