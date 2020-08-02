import React from 'react';
import styled from "styled-components";
import {hexToRgba} from "../util/color_util";
import {Row} from "../styles/flex";

const Button = ({label, ...props}: any) => {
    return (
        <ButtonStyled {...props}>{label}</ButtonStyled>
    );
};

export default Button;

const ButtonStyled = styled.button`
${Row};
justify-content: center;
padding: 0 2.5rem;
height: 3.4rem;
color: #fff;
border-radius: .3rem;
cursor: pointer;
background-color: ${({color = 'primaryColor', theme}: any) => theme[color]};
&:hover {
background-color: ${({color = 'primaryColor', theme}: any) => hexToRgba(theme[color], .8)};
}
`