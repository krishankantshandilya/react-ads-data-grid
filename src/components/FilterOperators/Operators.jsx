import { Dropdown, useBooleanState } from "akeneo-design-system";
import { operatorTypes, operatorsTypeList } from ".";
import { SwitcherButton } from "../Filter/Component";

export const Operators = ({ operator, onClickOperator }) => {
  const [isOpen, open, close] = useBooleanState(false);

  const supportedOperatorsTypeList = operatorsTypeList();

  return (
    <Dropdown>
      <SwitcherButton label="" onClick={open} showArrow={true}>
        {operatorTypes[operator] ?? operator}
      </SwitcherButton>
      {isOpen && (
        <Dropdown.Overlay
          onClose={close}
          verticalPosition="down"
          fullWidth={true}
          style={{ width: "auto" }}
        >
          <Dropdown.Header>
            <Dropdown.Title>OPERATOR</Dropdown.Title>
          </Dropdown.Header>
          <Dropdown.ItemCollection>
            {supportedOperatorsTypeList.map((type, index) => {
              const value = operatorTypes[type];
              return (
                <Dropdown.Item
                  isActive={operator === type}
                  key={`${type}-${index}`}
                  onClick={() => {
                    onClickOperator(type);
                    close();
                  }}
                >
                  {value}
                </Dropdown.Item>
              );
            })}
          </Dropdown.ItemCollection>
        </Dropdown.Overlay>
      )}
    </Dropdown>
  );
};
