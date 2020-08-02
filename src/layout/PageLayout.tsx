import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {State} from "../models/state.model";

const PageLayout: any = ({children}: any) => {

    const isDrawerOpened = useSelector((state: State) => state.theme.isDrawerOpened)

    return (
        <PageLayoutStyle isDrawerOpened={isDrawerOpened}>
            {children}
        </PageLayoutStyle>
    );
};

export default PageLayout;

const PageLayoutStyle = styled.div<{isDrawerOpened: boolean}>`
display: grid;
grid-gap: 2rem;
height: 100vh;
width: 100vw;
${({isDrawerOpened}: {isDrawerOpened: boolean}) => isDrawerOpened ? ({
    gridTemplateColumns: '35rem 1fr',
}) : ({
    gridTemplateColumns: '0 1fr',
})};
`