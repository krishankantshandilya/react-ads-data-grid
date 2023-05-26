import { Button } from "akeneo-design-system";
import { Operators } from "../FilterOperators/Operators";
import { FilterCard } from "./Component";
import filterStyles from "./filter.module.css";

const FilterUpdateCard = ({
  label,
  operator,
  onClickOperator,
  onUpdate,
  children,
}) => {
  return (
    <>
      <FilterCard title={label}>
        <Operators operator={operator} onClickOperator={onClickOperator} />
      </FilterCard>
      {children}
      <div className={filterStyles["filterUpdateBtn"]}>
        <Button level="primary" onClick={onUpdate}>
          Update
        </Button>
      </div>
    </>
  );
};

export default FilterUpdateCard;
