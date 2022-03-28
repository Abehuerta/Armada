import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: #fff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  z-index: 1;
  min-width: 20em;
`;

export default Box;
