import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {Mail} from "../../models/mail.model";
import {Column, Row} from "../../styles/flex";
import AvatarContainer from "../../components/AvatarContainer";
import {stringToHashColor} from "../../util/color_util";
import {ThemeInnerModel} from "../../models/theme.model";
import {BoxShadowLight} from "../../styles/boxShadow";
import Checkbox from "../../components/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../models/state.model";
import {DataCreators} from "../../store/reducers_sagas/data";
import {SubMenu} from "../../models/submenu.model";
import {useParams} from "react-router";
import {Menu} from "../../models/menu.model";
import {useTranslation} from "react-i18next";

interface MailItemTypes {
    mail: Mail
}

const MailItem: React.FC<MailItemTypes> = ({mail}) => {

    const [isShowingCheckBox, setIsShowingCheckBox] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [subMenuName, setSubMenuName] = useState<string>('')

    const dispatch = useDispatch()
    const {submenuId: subMenuSelected} = useParams()
    const {t} = useTranslation()

    const ajustUserPosition = (value: number): number => {
        if (value === 0) return 0
        return value * 1.5
    }

    const {selectedItens, subMenus, isDarkMode}: {selectedItens: string[], subMenus: SubMenu[], isDarkMode: boolean}
    = useSelector((state: State) => {
        const subMenuArr: SubMenu[] = []
        return {
            isDarkMode: state.theme.isDarkThemeEnabled,
            selectedItens: state.data.selectedItens,
            subMenus: subMenuArr.concat.apply([], state.data.itemsMenu.map((menu: Menu) => menu.subMenus))
        }
    })

    useEffect(() => {
        if(subMenus && subMenus.length && subMenuSelected) {
            setSubMenuName(subMenus.filter((subMenu) => subMenu.id === Number(subMenuSelected))[0].name)
        }
    }, [subMenus, subMenuSelected])

    const handleShowCheckbox = ((value: boolean) => {
        setIsShowingCheckBox(value)
    })

    const handleSelectValue = (event: any) => {
        const {checked} = event.target
        if (checked) {
            dispatch(DataCreators.selectItemForEdit(mail.id))
        } else {
            dispatch(DataCreators.removeItemForEdit(mail.id))
        }
    }

    useEffect(() => {
        setIsChecked(selectedItens.some((item) => item === mail.id))
    }, [mail.id, selectedItens])

    return (
        <MailItemContainer onMouseEnter={() => handleShowCheckbox(true)} onMouseLeave={() => handleShowCheckbox(false)}>
            <MailTrailing>
                <LeftElement>
                    {(isShowingCheckBox || selectedItens.length) ? <Checkbox onChange={handleSelectValue} checked={isChecked}/> :
                        <Owner name={mail.owner} isDarkMode={isDarkMode}>{mail.owner}</Owner>}
                </LeftElement>
                <MailMainly>
                    <Name>{mail.name}</Name>
                    <Subject><i className="far fa-comment-dots"/>{mail.subject}</Subject>
                    <SubmenuName><i className="fas fa-inbox"/>{subMenuName}</SubmenuName>
                </MailMainly>
            </MailTrailing>
            <MailEnding>
                <Time>{t('email.hoje')}, 11:42</Time>
                <Time>-2 {t('email.horas')}</Time>
                <UsersContainer>
                    {
                        mail.users.slice(0, 3).map((user, index) =>
                            <User key={user} name={user} isDarkMode={isDarkMode} left={ajustUserPosition(index)}>{user}</User>)
                    }
                </UsersContainer>
            </MailEnding>
        </MailItemContainer>
    );
};

export default MailItem;

const MailItemContainer = styled.div`
${Row};
justify-content: space-between;
padding: 2rem 4rem 2rem 2rem;

&:hover {
background-color: ${({theme}: ThemeInnerModel) => theme.bodyColor};
${BoxShadowLight};
}

`


const MailMainly = styled.div`
${Column};
margin-left: 4rem;
`

const MailTrailing = styled.div`
${Row};
`

const MailEnding = styled.div`
${Column};
position: relative;
top: -1.4rem;
`

const LeftElement = styled.div`
width: 5rem;
${Row};
justify-content: center;
`

const Owner = styled(AvatarContainer)<{ name: string, isDarkMode: boolean }>`
background-color: ${({name, isDarkMode}) => getBackgroundColor(name, isDarkMode)};
border-color: ${({name, isDarkMode}) => getBorderColor(name, isDarkMode)};
`

const Name = styled.span`

`

const SecundaryText = css`
font-size: 1.4rem;
font-weight: 300;
`

const IconStyleForAboveComponents = css`
i {
margin-right: 1rem;
color: ${({theme}: ThemeInnerModel) => theme.darkColor};
}
`

const Subject = styled.span`
${SecundaryText};
margin: .8rem 0;
${IconStyleForAboveComponents};
`

const SubmenuName = styled.span`
${SecundaryText};
${IconStyleForAboveComponents};
`

const Time = styled.span`
${SecundaryText};
margin-bottom: .6rem;
`

const UsersContainer = styled.div`
width: 10rem;
`

const User = styled(AvatarContainer).attrs(() => ({
    size: '3.2rem',
}))<{ left: number, name: string, isDarkMode: boolean }>`
font-size: 1.2rem;
font-weight: 300;
position: absolute;
bottom: -3rem;
left: ${({left}) => `${left}rem`};
background-color: ${({name, isDarkMode}) => getBackgroundColor(name, isDarkMode)};
border-color: ${({name, isDarkMode}) => getBorderColor(name, isDarkMode)};
`


const getBackgroundColor = (name: string, isDarkMode: boolean) =>
    isDarkMode ? stringToHashColor(name, 20, 50) : stringToHashColor(name)

const getBorderColor = (name: string, isDarkMode: boolean) =>
    isDarkMode ? stringToHashColor(name, 20, 40) : stringToHashColor(name, 30, 80)