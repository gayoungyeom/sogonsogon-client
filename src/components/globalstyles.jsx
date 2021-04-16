import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};

    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
    body {
    font-family: "Noto Sans KR", sans-serif;
    }
    a{
        text-decoration:none;
        color:inherit;
    }
`;

export default GlobalStyles;
