import React, {useState} from 'react';
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid'
import {ThemeInnerModel} from "../models/theme.model";
import {Row} from "../styles/flex";

interface CheckboxType {
    onChange?: Function
    checked?: boolean
}

const Checkbox: React.FC<CheckboxType> = ({onChange, checked}) => {

    const [id] = useState<string>(uuidv4())

    return (
        <div>
            <CheckboxStyled id={id} onChange={onChange} checked={checked}/>
            <Label htmlFor={id}/>
        </div>
    );
};

export default Checkbox;

const Label = styled.label`
cursor: pointer;
width: 2rem;
height: 2rem;
border-radius: .4rem;
border: .1rem solid ${({theme}: ThemeInnerModel) => theme.darkColor};
user-select: none;
color: ${({theme}: ThemeInnerModel) => theme.textSecundaryColor};
vertical-align: middle;
${Row};
justify-content: center;
align-items: center;
transition: all .3s;
`

const CheckboxStyled: any = styled.input.attrs(() => ({
    type: 'checkbox',
}))`
position: absolute;
opacity: 0;
user-select: none;
z-index: -1;

&:checked ~ Label {
background-color: ${({theme}: ThemeInnerModel) => theme.primaryColor};
border-color: ${({theme}: ThemeInnerModel) => theme.primaryColorLight};
transition: all .3s;
&::after {
content: '\f00c';
font-family: "Font Awesome 5 Free";
font-weight: 900;
display: inline-block;
font-size: 1rem;
}
}
`