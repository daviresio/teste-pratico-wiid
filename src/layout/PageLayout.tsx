import React from 'react';
import styled from "styled-components";

const PageLayout: React.FC = ({children}) => {
    return (
        <PageLayoutStyle>
            {children}
        </PageLayoutStyle>
    );
};

export default PageLayout;

const PageLayoutStyle = styled.div`
display: grid;
grid-template-columns: 35rem 1fr;
grid-gap: 2rem;
height: 100vh;
width: 100vw;
`