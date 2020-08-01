import React from 'react';
import styled from "styled-components";
import {ThemeInnerModel} from "../models/theme.model";
import {hexToRgba} from "../util/color_util";

interface InputTypes {
    placeholder?: string
    label?: string
}

const Input: React.FC<InputTypes> = ({label, ...props}) => {
    return (
        <>
            {label ? <Label>{label}</Label> : null}
            <InputStyled {...props} />
        </>
    );
};

export default Input;

const InputStyled = styled.input`
width: 100%;
padding: 1rem .5rem;
background-color: ${({theme}: ThemeInnerModel) => theme.bodyColor};
border: .1rem solid ${({theme}: ThemeInnerModel) => hexToRgba(theme.darkColor, .4)};
`

const Label = styled.label`

`