import React from "react";
import styled from "styled-components";
import { SpaceProps } from "styled-system";

interface InputProps extends SpaceProps {
  isValid?: boolean;
}

const getBackground = ({ isValid = false }: InputProps) => {
  return isValid ? "none" : "solid 2px red";
};

const Input = styled.input<InputProps>`
  border: ${getBackground};

  &:focus {
    outline: none;
  }
`;

Input.defaultProps = {
  isValid: true,
};

export default Input;
