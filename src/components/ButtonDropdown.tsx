import React from 'react';
import styled from "styled-components";
import Button from "./Button";
import {Row} from "../styles/flex";
import {ThemeInnerModel} from "../models/theme.model";

interface ComponentProps {
    label: string
}

const ButtonDropdown: React.FC<ComponentProps> = ({label}) => {
    return (
        <ButtonDropdownContainer>
            <Button label={label} style={{borderBottomRightRadius: 0, borderTopRightRadius: 0}} />
            <Dropdown>

            </Dropdown>
        </ButtonDropdownContainer>
    );
};

export default ButtonDropdown;

const ButtonDropdownContainer = styled.div`
${Row};
`

const Dropdown: any = styled.div.attrs(() => ({
    children: <i className="fas fa-caret-down" />
}))`
${Row};
justify-content: center;
width: 3rem;
height: 3.4rem;
cursor: pointer;
color: #fff;
font-size: 1.8rem;
border-bottom-right-radius: .3rem;
border-top-right-radius: .3rem;
background-color: ${({theme}: ThemeInnerModel) => theme.primaryColor};
&:hover {
background-color: ${({theme}: ThemeInnerModel) => theme.primaryColorLight};
}
`