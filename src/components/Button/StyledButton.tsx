import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: black;
  border: 2px solid ${(props) => props.theme.foreground};
  background: ${(props) => props.theme.background};
`;

export default StyledButton;
