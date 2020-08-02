import React from 'react';
import styled from "styled-components";
import {Column, Row} from "../../styles/flex";
import Input from "../../components/Input";
import Divider from "../../components/Divider";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../models/state.model";
import {Mail} from "../../models/mail.model";
import MailItem from "./MailItem";
import {ThemeInnerModel} from "../../models/theme.model";
import {BoxShadowDefault} from "../../styles/boxShadow";
import {DataCreators} from "../../store/reducers_sagas/data";
import {toast} from "react-toastify";
import NoItens from '../../assets/no_itens.svg'

const DashboardContent = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {mails, selectedItens}: {selectedItens: string[], mails: Mail[]} = useSelector((state: State) => {
        return {
            mails: state.data.mails,
            selectedItens: state.data.selectedItens,
        }
    })

    const archiveMails = () => {
        if(!selectedItens.length) {
            toast.info(`⚠️ ${t('dashboard.selecioneUmParaArquivar')}`)
            return
        }
        dispatch(DataCreators.archiveMails())
    }

    return (
        <DashboardContentStyled>
            <TopSideContainer>
                <Input placeholder={t('dashboard.acoes.placeholderInputPesquisa')}/>
                <StyledDivider/>
                <Actions>
                    <LeftActions>
                        <Checkbox onChange={() => dispatch(DataCreators.selectOrRemoveAllItensForEdit())} checked={mails.length === selectedItens.length && mails.length > 0}/>
                        <Button label={t('dashboard.acoes.botaoAtribuir')} color={'successColor'}/>
                        <Button label={t('dashboard.acoes.botaoArquivar')} color={'dangerColor'} onClick={archiveMails}/>
                        <Button label={t('dashboard.acoes.botaoAgendar')}/>
                    </LeftActions>
                    <i className="fas fa-filter"/>
                </Actions>
            </TopSideContainer>
            <BottomSideContainer>
                {
                    mails.length ? mails.map((mail: Mail) => {
                        return (
                            <MailItem key={mail.id} mail={mail}/>
                        )
                    }) : <NoItensContainer>
                        <NoItensText>{t('dashboard.nenhumItemEncontrado')}</NoItensText>
                        <NoItensImage src={NoItens} alt={'no itens'} />
                    </NoItensContainer>
                }
            </BottomSideContainer>
        </DashboardContentStyled>
    );
};

export default React.memo(DashboardContent);

const DashboardContentStyled = styled.div`
${Column};
${() => `width: calc(100% - 3rem);`};
`

const TopSideContainer = styled.div`
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
margin-bottom: 2rem;
padding: 2rem 3.5rem;
${BoxShadowDefault};
`

const BottomSideContainer = styled.div`
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
height: 100%;
${BoxShadowDefault};
`

const StyledDivider = styled(Divider)`
margin: 2rem 0;
`

const Actions = styled.div`
${Row};
justify-content: space-between;
i {
color: ${({theme}: ThemeInnerModel) => theme.textPrimaryColor};
}
`

const LeftActions = styled.div`
${Row};
& > * {
margin-right: 1rem;
}
& > div {
margin-right: 5rem;
}
`

const NoItensContainer = styled.div`
${Column};
justify-content: space-between;
align-items: center;
height: 100%;
padding: 4rem;
`

const NoItensImage = styled.img`
width: 50%;
`

const NoItensText = styled.h1`
font-size: 5rem;
font-weight: bold;
color: ${({theme}: ThemeInnerModel) => theme.darkColor};
text-align: center;
`