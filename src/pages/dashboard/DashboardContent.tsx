import React from 'react';
import styled from "styled-components";
import {Column, Row} from "../../styles/flex";
import Input from "../../components/Input";
import Divider from "../../components/Divider";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {State} from "../../models/state.model";
import {Mail} from "../../models/mail.model";
import MailItem from "./MailItem";
import {ThemeInnerModel} from "../../models/theme.model";
import {BoxShadowDefault} from "../../styles/boxShadow";

const DashboardContent = () => {

    const {t} = useTranslation()
    const mails = useSelector((state: State) => state.data.mails)

    return (
        <DashboardContentStyled>
            <TopSideContainer>
                <Input placeholder={t('dashboard.acoes.placeholderInputPesquisa')}/>
                <StyledDivider/>
                <Actions>
                    <div>
                        <Checkbox/>
                        <Button label={t('dashboard.acoes.botaoAtribuir')}/>
                        <Button label={t('dashboard.acoes.botaoArquivar')}/>
                        <Button label={t('dashboard.acoes.botaoAgendar')}/>
                    </div>
                    <i className="fas fa-filter"/>
                </Actions>
            </TopSideContainer>
            <BottomSideContainer>
                {
                    mails.map((mail: Mail) => {
                        return (
                            <MailItem key={mail.id} mail={mail}/>
                        )
                    })
                }
            </BottomSideContainer>
        </DashboardContentStyled>
    );
};

export default DashboardContent;

const DashboardContentStyled = styled.div`
${Column};
`

const TopSideContainer = styled.div`
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
margin-bottom: 2rem;
padding: 2rem; 
${BoxShadowDefault};
`

const BottomSideContainer = styled.div`
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
${() => `width: calc(100% - 3rem);`};
height: 100%;
${BoxShadowDefault};
`

const StyledDivider = styled(Divider)`
margin: 2rem 0;
`

const Actions = styled.div`
${Row};
justify-content: space-between;
`
