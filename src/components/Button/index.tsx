import React, { ElementType } from "react";
import StyledButton from "./StyledButton";

const Button = <E extends ElementType = "button">(
  props: ElementType<E>
): JSX.Element => {
  return <StyledButton />;
};

export default Button;
