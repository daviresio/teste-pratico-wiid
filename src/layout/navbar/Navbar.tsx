import React from 'react';
import styled from "styled-components";
import {Column, Row} from "../../styles/flex";
import EmptyUserPhotoContainer from "./EmptyUserPhoto";
import Theme, {ThemeInnerModel} from "../../models/theme.model";
import ButtonDropdown from "../../components/ButtonDropdown";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {State} from "../../models/state.model";
import {Menu} from "../../models/menu.model";
import {SubMenu} from "../../models/submenu.model";
import {useHistory, useParams} from "react-router";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import Divider from "../../components/Divider";
import {BoxShadowDefault} from "../../styles/boxShadow";

interface IsActive {
    isActive: boolean
}

interface IsActiveWithTheme {
    isActive: boolean
    theme: Theme
}

const Navbar = () => {

    const {t} = useTranslation()
    const history = useHistory()
    const menuItems = useSelector((state: State) => state.data.itemsMenu)
    const {submenuId: subMenuSelected} = useParams()

    const handleMenuRoute = (menu: Menu): void => {
        handleSubmenuRoute(menu.subMenus[0]?.id)
    }

    const handleSubmenuRoute = (submenuId: number): void => {
        history.push(DashboardPage.routeName + '/' + submenuId)
    }

    const isMenuActive = (menu: Menu): boolean => {
        return menu.subMenus.map((subMenu: SubMenu) => subMenu.id).some((subMenuId) => subMenuId === Number(subMenuSelected))
    }

    const isSubMenuActive = (subMenu: SubMenu): boolean => {
        return subMenu.id === Number(subMenuSelected)
    }

    return (
        <NavbarContainer>
            <UserInfoContainer>
                <EmptyUserPhotoContainer/>
                <UserNameAndEmail>
                    <UserName>Admin</UserName>
                    <UserEmail>email@email.com</UserEmail>
                </UserNameAndEmail>
                <ButtonDropdown label={t('navBar.botaoNovo')}/>
            </UserInfoContainer>
            <StyledDivider/>
            <MenuListContainer>
                {
                    menuItems.map((menuItem: Menu) => {
                        const isActive = isMenuActive(menuItem)
                        return (
                            <MenuListItem key={menuItem.id} isActive={isActive}>
                                <MenuListItemContent onClick={() => handleMenuRoute(menuItem)}
                                    isActive={isActive}>{menuItem.name}</MenuListItemContent>
                                <InnerMenuListContainer>
                                    {
                                        menuItem.subMenus.map((subMenuItem: SubMenu) => {
                                            return (
                                                <SubMenuListItem key={subMenuItem.id} isActive={isSubMenuActive(subMenuItem)}
                                                                 onClick={() => handleSubmenuRoute(subMenuItem.id)}>
                                                    {subMenuItem.name}
                                                </SubMenuListItem>
                                            )
                                        })
                                    }
                                </InnerMenuListContainer>
                            </MenuListItem>
                        )
                    })
                }
            </MenuListContainer>
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
${BoxShadowDefault};
overflow: hidden;
`

const UserInfoContainer = styled.div`
${Row};
justify-content: space-between;
padding: 2rem;
`

const StyledDivider = styled(Divider)`
margin: 2rem 0;
`

const MenuListContainer = styled.ul`

`

const InnerMenuListContainer = styled.ul`
`

const MenuListItem = styled.li<IsActive>`
overflow: hidden;
${({isActive}: IsActive) =>
    isActive ? ({
        maxHeight: '30rem',
        transition: 'all .6s',
    }) : ({
        maxHeight: '5.5rem',
        transition: 'all .6s',
    })};
`

const MenuListItemContent = styled.div<IsActive>`
${Row};
height: 5.5rem;
padding: 0 4rem;
cursor: pointer;
${({isActive, theme}: IsActiveWithTheme) => 
    isActive ? ({
        color: theme.primaryColor,
        fontWeight: 'bold',
}) : ({
        '&:hover': {
            backgroundColor: theme.ligthColor,
        }
    })};
`

const SubMenuListItem = styled(MenuListItem)<IsActive>`
padding: 2rem 0 2rem 8rem;
cursor: pointer;
${({isActive, theme}: IsActiveWithTheme) =>
    isActive ? ({
        backgroundColor: theme.primaryColorVeryLight,
        color: theme.textSecundaryColor,
    }) : ({
        '&:hover': {
            backgroundColor: theme.ligthColor,
        }
    })};
`

const UserNameAndEmail = styled.div`
${Column};
align-items: flex-start;
position: relative;
left: -1.5rem;
`

const UserName = styled.span`
margin-bottom: .5rem;
`

const UserEmail = styled.span`
font-size: 1.2rem;
font-weight: 100;
`