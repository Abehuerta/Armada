import { createGlobalStyle } from "styled-components";
import "@fontsource/inter";
import "@fontsource/russo-one";

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0px;
        font-family: 'Inter', sans-serif;
        color: #FFF;
    }
    h1, h2, h3, h4{
      font-family: 'Russo One', sans-serif;
      margin: 0;
    }
    input {
      color: black;
      margin: 5px;
      padding: 5px;
    }

    body {
      margin: 0;
        img {
          height: auto;
          max-width: 100%;
        }
      }
`;

export default GlobalStyles;
