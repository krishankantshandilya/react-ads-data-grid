import {
  ArrowDownIcon,
  Checkbox,
  Dropdown,
  IconButton,
  Toolbar,
  useBooleanState,
} from "akeneo-design-system";

import styles from "./Toolbar.module.css";

export const DatagridToolBar = ({
  currentPageItemsKeys,
  selectedCount,
  isVisible,
  selectionState,
  onSelectAllChange,
  onSelectAllVisibleChange,
  children,
}) => {
  const [isDropdownOpen, openDropdown, closeDropdown] = useBooleanState();

  return (
    <Toolbar isVisible={isVisible} className={styles["actionToolbar"]}>
      <Toolbar.SelectionContainer>
        <Checkbox checked={selectionState} onChange={onSelectAllChange} />
        <Dropdown>
          <IconButton
            size="small"
            level="tertiary"
            ghost="borderless"
            icon={<ArrowDownIcon />}
            title="Select"
            onClick={openDropdown}
          />
          {isDropdownOpen && (
            <Dropdown.Overlay onClose={closeDropdown}>
              <Dropdown.Header>
                <Dropdown.Title>Select</Dropdown.Title>
              </Dropdown.Header>
              <Dropdown.ItemCollection>
                <Dropdown.Item
                  onClick={() => {
                    onSelectAllChange(true);
                    closeDropdown();
                  }}
                >
                  Select all
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    onSelectAllVisibleChange(currentPageItemsKeys);
                    closeDropdown();
                  }}
                >
                  Select all visible
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    onSelectAllChange(false);
                    closeDropdown();
                  }}
                >
                  Select none
                </Dropdown.Item>
              </Dropdown.ItemCollection>
            </Dropdown.Overlay>
          )}
        </Dropdown>
      </Toolbar.SelectionContainer>
      <Toolbar.LabelContainer>{selectedCount} Selected</Toolbar.LabelContainer>
      <Toolbar.ActionsContainer>{children}</Toolbar.ActionsContainer>
    </Toolbar>
  );
};
