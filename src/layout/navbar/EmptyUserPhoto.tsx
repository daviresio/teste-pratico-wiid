import React from 'react';
import styled from "styled-components";
import {ThemeInnerModel} from "../../models/theme.model";
import AvatarContainer from "../../components/AvatarContainer";

const EmptyUserPhoto = () => {
    return (
        <AvatarContainer>
            <Icon className="far fa-user" />
            <OnlineIndicator />
        </AvatarContainer>
    );
};

export default EmptyUserPhoto;



const Icon = styled.i`
color: ${({theme}: ThemeInnerModel) => theme.darkColor};
font-size: 2rem;
`

const OnlineIndicator = styled.div`
width: 1.2rem;
height: 1.2rem;
border-radius: 50%;
background-color: ${({theme}: ThemeInnerModel) => theme.successColor};
position: absolute;
bottom: .2rem;
right: .2rem;
`