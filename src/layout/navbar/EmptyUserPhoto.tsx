import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {ThemeInnerModel} from "../../models/theme.model";
import AvatarContainer from "../../components/AvatarContainer";
import {BoxShadowDefault} from "../../styles/boxShadow";
import {Row} from "../../styles/flex";
import useClickOutside from "../../hooks/useClickOutside";
import {useDispatch} from "react-redux";
import {AuthCreators} from "../../store/reducers_sagas/auth";
import {useTranslation} from "react-i18next";

const EmptyUserPhoto = () => {

    const [optionsOpened, setOptionsOpened] = useState<boolean>(false)
    const {t} = useTranslation()
    const ref = useRef()
    const dispatch = useDispatch()

    useClickOutside(ref, () => {
        setOptionsOpened(false)
    })

    const handleLogout = () => {
        dispatch(AuthCreators.logout())
    }

    return (
        <AvatarContainer onClick={() => setOptionsOpened(prev => !prev)} ref={ref}>
            <Icon className="far fa-user" />
            <OnlineIndicator />
            <UserOptions isOpen={optionsOpened} onClick={handleLogout}>
                <i className="fas fa-sign-out-alt" />
                {t('navBar.sair')}
            </UserOptions>
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


const UserOptions = styled.div<{isOpen: boolean}>`
position: absolute;
width: 15rem;
height: 4rem;
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
left: 2rem;
border-radius: .3rem;
padding-left: 2rem;
${Row};
${BoxShadowDefault};
transition: all .3s;

i{
margin-right: 1rem;
}

&:hover {
background-color: ${({theme}: ThemeInnerModel) => theme.dangerColor};
color: ${({theme}: ThemeInnerModel) => theme.textSecundaryColor};
transition: all .3s;
}

${({isOpen}) => isOpen ? ({
    bottom: '-4.2rem',
    opacity: 1,
    transition: 'all .3s',
    zIndex: 10,
}) : ({
    bottom: '-2rem',
    opacity: 0,
    transition: 'all .3s',
    pointerEvents: 'none',
    zIndex: -1,
})}
`
