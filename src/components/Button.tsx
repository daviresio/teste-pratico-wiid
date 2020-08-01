import React from 'react';
import styled from "styled-components";
import {ThemeInnerModel} from "../models/theme.model";

interface ComponentProps {
    label: string
    style?: any
}

const Button: React.FC<ComponentProps> = ({label, ...props}) => {
    return (
        <ButtonStyled {...props}>{label}</ButtonStyled>
    );
};

export default Button;

const ButtonStyled = styled.button`
padding: 0 2.5rem;
height: 3.8rem;
color: #fff;
border-radius: .5rem;
cursor: pointer;
background-color: ${({theme}: ThemeInnerModel) => theme.primaryColor};
&:hover {
background-color: ${({theme}: ThemeInnerModel) => theme.primaryColorLight};
}
`