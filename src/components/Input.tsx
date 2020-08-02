import React from 'react';
import styled from "styled-components";
import {ThemeInnerModel} from "../models/theme.model";
import {hexToRgba} from "../util/color_util";

interface InputTypes {
    placeholder?: string
    label?: string
    type?: string
    iconName?: any
}

const Input: React.FC<InputTypes> = ({label, iconName, ...props}) => {
    return (
        <InputContainer>
            {label ? <Label>{label}</Label> : null}
            <InputStyled {...props} hasIcon={!!iconName} />
            {iconName ? <Icon className={iconName} /> : null}
        </InputContainer>
    );
};

export default Input;

const InputContainer = styled.div`
position: relative;
`

const InputStyled = styled.input<{hasIcon?: boolean}>`
width: 100%;
background-color: ${({theme}: ThemeInnerModel) => theme.bodyColor};
border: .1rem solid ${({theme}: ThemeInnerModel) => hexToRgba(theme.darkColor, .4)};
font-size: 1.6rem;
${({hasIcon}) => hasIcon ? ({
    padding: '1rem 1rem 1rem 4rem',
}) : ({
    padding: '1rem',
})};

`

const Label = styled.label`
display: inline-block;
margin-bottom: .5rem;
`


const Icon = styled.i`
font-size: 1.8rem;
position: absolute;
bottom: 1.2rem;
left: 1.2rem;
`