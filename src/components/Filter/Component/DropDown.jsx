import React from "react";
import { Dropdown, Search } from "akeneo-design-system";

export const SimpleDropDown = ({ open, onClose, items }) => {
  return (
    <Dropdown>
      {open && (
        <Dropdown.Overlay onClose={onClose} verticalPosition="down" style={{width: 'auto'}}>
          <Dropdown.Header>
            <Search
              onSearchChange={function noRefCheck() {}}
              placeholder="Search"
              searchValue=""
              title="Search"
            />
          </Dropdown.Header>
          <Dropdown.ItemCollection>
            <Dropdown.Item>Aquaman</Dropdown.Item>
            <Dropdown.Item>Batman</Dropdown.Item>
            <Dropdown.Item>Catwoman</Dropdown.Item>
            <Dropdown.Item>Flash</Dropdown.Item>
            <Dropdown.Item>Green Lantern</Dropdown.Item>
            <Dropdown.Item>Wonder Woman</Dropdown.Item>
            <Dropdown.Item>Superman</Dropdown.Item>
            <Dropdown.Item>Black panther</Dropdown.Item>
            <Dropdown.Item>Black widow</Dropdown.Item>
            <Dropdown.Item>Ant man</Dropdown.Item>
            <Dropdown.Item>Captain America</Dropdown.Item>
          </Dropdown.ItemCollection>
        </Dropdown.Overlay>
      )}
    </Dropdown>
  );
};
