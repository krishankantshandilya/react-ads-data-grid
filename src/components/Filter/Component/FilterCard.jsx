import styled, { css } from "styled-components";
import { Dropdown, getColor } from "akeneo-design-system";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${getColor("grey", 100)};
  background: ${getColor("white")};
  height: 44px;
  box-sizing: border-box;
  gap: 10px;
  :focus-within {
    border-bottom: 1px solid ${getColor("brand", 100)};
  }
  ${(props) =>
    undefined !== props.sticky &&
    css`
      position: sticky;
      top: ${props.sticky}px;
      z-index: 9;
    `}
`;

const CardContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const FilterCard = ({ children, title, ...rest }) => {
  return (
    <Container {...rest}>
      <CardContainer>
        <Dropdown.Title>
          <div style={{ whiteSpace: "normal" }}>
            {title}
          </div>
        </Dropdown.Title>
      </CardContainer>
      {children}
    </Container>
  );
};
