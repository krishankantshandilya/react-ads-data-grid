import { SwitcherButton } from "akeneo-design-system";

const BooleanFilter = ({ name, label, value, operator }) => {
  return (
    <SwitcherButton deletable label={label}>
      {value}
    </SwitcherButton>
  );
};

export default BooleanFilter;
