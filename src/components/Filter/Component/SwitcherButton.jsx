import { forwardRef } from "react";
import styled, { css } from "styled-components";
import {
  ArrowDownIcon,
  CloseIcon,
  CommonStyle,
  getColor,
  getFontSize,
  useId,
} from "akeneo-design-system";

const SwitcherButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  > *:nth-child(2) {
    opacity: 0;
    transition: opacity 0.2s;
  }
  &:hover > *:nth-child(2) {
    opacity: 1;
  }
`;

const LabelAndValueContainer = styled.button`
  ${CommonStyle};
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: baseline;
  flex-direction: ${(props) => (props.$inline ? "row" : "column")};
`;

const Label = styled.label`
  cursor: pointer;
  white-space: nowrap;
  ${(props) =>
    props.$inline
      ? css`
          margin-right: 3px;
          color: ${getColor("grey", 140)};
        `
      : css`
          color: ${getColor("grey", 100)};
          text-transform: uppercase;
          font-size: ${getFontSize("small")};
        `}
`;

const LabelAndArrow = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Value = styled.span`
  color: ${(props) =>
    props.$inline ? getColor("brand", 100) : getColor("grey", 140)};
  margin-right: 5px;
  text-align: left;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
`;

/**
 * Switchers are used to switch the filter on the context or the content of a page or a table.
 */
export const SwitcherButton = forwardRef(
  (
    {
      label,
      children,
      onClick,
      deletable = false,
      onDelete,
      inline = true,
      showArrow = false,
      ...rest
    },
    forwardedRef
  ) => {
    const buttonId = useId("button_");

    const handleDelete = () => deletable && onDelete?.();
    
    return (
      <SwitcherButtonContainer ref={forwardedRef} {...rest}>
        <LabelAndValueContainer
          id={buttonId}
          onClick={onClick}
          $inline={inline}
        >
          <Label htmlFor={buttonId} $inline={inline}>
            {label ? (inline ? `${label}` : label) : ""}
          </Label>
          <LabelAndArrow>
            <Value $inline={inline}>{children}</Value>
            {showArrow && <ArrowDownIcon size={inline ? 16 : 10} />}
          </LabelAndArrow>
        </LabelAndValueContainer>
        {deletable && (
          <CloseButton onClick={handleDelete}>
            <CloseIcon size={10} />
          </CloseButton>
        )}
      </SwitcherButtonContainer>
    );
  }
);