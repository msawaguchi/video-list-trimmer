import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-color: #282d3c;
        font-family: Arial, Helvetica, sans-serif;
    }

    h2 {
        color:#bfbfbf;
    }
`;

export default GlobalStyle;