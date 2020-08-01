import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {ThemeInnerModel} from "../models/theme.model";

const GlobalStyles = createGlobalStyle`
${reset};


*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}


html {
    box-sizing: border-box;
    font-size: 62.5%;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({theme}: ThemeInnerModel) => theme.bodyColor};
    color: ${({theme}: ThemeInnerModel) => theme.textPrimaryColor};
    overflow-x: hidden;
}

div, a, i, span, button {
font-size: 1.6rem;
}

i {
    font-size: inherit;
}

button {
 display: inline-block;
 border: none;
 margin: 0;
 padding: 0;
 text-decoration: none;
 outline: none;
 font-family: 'Roboto', sans-serif;
}

ul, li, button {
user-select: none;
}

input {
    font-family: 'Roboto', sans-serif;
    color: ${({theme}: ThemeInnerModel) => theme.textPrimaryColor};
    outline: none;
}

`


export default GlobalStyles
