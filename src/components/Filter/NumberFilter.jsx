import { SwitcherButton } from "akeneo-design-system";

const NumberFilter = ({ name, label, value, operator }) => {
  return (
    <SwitcherButton deletable label={label}>
      {value}
    </SwitcherButton>
  );
};

export default NumberFilter;
