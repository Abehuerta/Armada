import styled from "styled-components";

const HyperText = styled.a`
    color: ${(props) => props.theme.hyperlink};
    text-decoration: none;
`;

export default HyperText;