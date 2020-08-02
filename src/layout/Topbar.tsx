import React, {useEffect} from 'react';
import styled, {withTheme} from "styled-components";
import {BoxShadowDefault} from "../styles/boxShadow";
import Theme, {ThemeInnerModel} from "../models/theme.model";
import Logo from '../assets/logo.png'
import {Row} from "../styles/flex";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../models/state.model";
import {ThemeCreators} from "../store/reducers_sagas/theme";
import ReactSwitch from "react-switch";
import Select, {Styles} from "react-select";
import BrazilImage from '../assets/brazil.svg'
import UsaImage from '../assets/usa.svg'
import {useTranslation} from "react-i18next";

interface TopbarTypes {
    theme: Theme
}

interface SelectOptions {
    value: string
    label: any
}

const Topbar: React.FC<TopbarTypes> = ({theme}) => {

    const selectStyles: Styles = {
        control: (base, state) => ({
            ...base,
            width: '15rem',
            marginRight: '2rem',
            backgroundColor: theme.bodySecundaryColor,
            borderColor: theme.ligthColor,
            "&:hover": {
                borderColor: theme.ligthColor,
            },
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: theme.ligthColor,
        }),
        group: (base, state) => ({
            ...base,
            color: theme.ligthColor,
        }),
        indicatorSeparator: (base, state) => ({
            ...base,
            backgroundColor: theme.ligthColor,
        }),
        menu: (base, state) => ({
            ...base,
            backgroundColor: theme.bodySecundaryColor,
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: theme.bodySecundaryColor,
            color: theme.textPrimaryColor,
            "&:hover": {
                backgroundColor: theme.darkColor,
            }
        }),
        singleValue: (base, state) => ({
            ...base,
            color: theme.textPrimaryColor,
        }),
    }

    const countryOptions: SelectOptions[] = [
        {value: 'pt', label: <SelectLabel><SelectImage src={BrazilImage} /> PT-BR</SelectLabel>},
        {value: 'en', label: <SelectLabel><SelectImage src={UsaImage} /> EN-US</SelectLabel>},
    ]

    const {isLogged, isDarkThemeEnabled, language} = useSelector((state: State) => {
        return {
            isLogged: state.auth.isLogged,
            isDarkThemeEnabled: state.theme.isDarkThemeEnabled,
            language: state.theme.language,
        }
    })

    const dispatch = useDispatch()
    const {i18n} = useTranslation()

    const toogleNavbar = () => {
        dispatch(ThemeCreators.toogleDrawer())
    }

    const toogleTheme = () => {
        dispatch(ThemeCreators.toogleTheme())
    }

    const handleGithub = () => {
        window.open('https://github.com/daviresio/teste-pratico-wiid')
    }

    const handleChangeLanguage = ({value}: SelectOptions) => {
        dispatch(ThemeCreators.changeLanguage(value))
    }

    useEffect(() => {
        i18n.changeLanguage(language)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <TopbarContainer>
            <Trailing>
                {
                    isLogged ?
                        <IconMenuContainer onClick={toogleNavbar}>
                            <MenuIcon className="fas fa-bars"/>
                        </IconMenuContainer>
                        : null
                }
                <LogoImg src={Logo}/>
                <SiteName>WiiD - Working In Ideas</SiteName>
            </Trailing>
            <Ending>
                {
                    //@ts-ignore
                <Select options={countryOptions} onChange={handleChangeLanguage}
                        value={countryOptions.filter((country) => country.value === language)[0]}
                styles={selectStyles}/>
                }

                <ReactSwitch checked={!isDarkThemeEnabled} onChange={toogleTheme} offColor={'#4d4d4d'}
                             onColor={'#e4e6ec'} checkedIcon={<SunIcon className="far fa-sun" />}
                             uncheckedIcon={<MoonIcon className="far fa-moon" />} />
                <GithubIcon className="fab fa-github" onClick={handleGithub} />
            </Ending>
        </TopbarContainer>
    );
};

export default withTheme(Topbar);

const TopbarContainer = styled.div`
width: 100%;
height: 7rem;
${BoxShadowDefault};
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
z-index: 50;
position: relative;
margin-bottom: 2rem;
${Row};
justify-content: space-between;
padding: 0 2rem;
`

const Trailing = styled.div`
${Row};
`

const Ending = styled.div`
${Row};
`

const LogoImg = styled.img`
width: 5rem;
`

const SiteName = styled.span`
margin-left: 1.5rem;
font-size: 2.2rem;
font-weight: 500;
color: ${({theme}: ThemeInnerModel) => theme.textPrimaryColor};
`

const IconMenuContainer = styled.div`
position: relative;
width: 4rem;
height: 4rem;
margin-right: 4rem;

&:hover&:after {
content: '';
position: absolute;
width: 100%;
height: 100%;
border-radius: 50%;
background-color: ${({theme}: ThemeInnerModel) => theme.bodyColor};
z-index: 1;
}
`

const MenuIcon = styled.i`
font-size: 2.5rem;
margin-left: .9rem;
margin-top: .7rem;
cursor: pointer;
position: absolute;
z-index: 2;
`

const GithubIcon = styled.i`
font-size: 2.5rem;
cursor: pointer;
margin-left: 2rem;
`

const SunIcon = styled.i`
font-size: 2rem;
margin-left: .5rem;
margin-top: .5rem;
`

const MoonIcon = styled.i`
font-size: 2rem;
margin-top: .5rem;
margin-left: .5rem;
color: #fff;
`

const SelectLabel = styled.div`
${Row};
`

const SelectImage = styled.img`
width: 2rem;
margin-right: 1rem;
`