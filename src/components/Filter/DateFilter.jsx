import { SwitcherButton } from "akeneo-design-system";
import { format } from "date-fns";

const DateFilter = ({ name, label, value, operator, dateFormat }) => {
  const date = format(new Date(value), dateFormat);

  return (
    <SwitcherButton deletable label={label}>
      {date}
    </SwitcherButton>
  );
};

export default DateFilter;
