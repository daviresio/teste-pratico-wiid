import React from 'react';
import styled from "styled-components";
import {ThemeInnerModel} from "../models/theme.model";
import {BoxShadowDefault} from "../styles/boxShadow";
import AuthImage from '../assets/auth.svg'
import Input from "../components/Input";
import {useTranslation} from "react-i18next";
import {Column, Row} from "../styles/flex";
import Logo from "../assets/logo.png";
import FacebookImage from "../assets/facebook.svg";
import GooglePlusImage from "../assets/google-plus.svg";
import LinkedinImage from "../assets/linkedin.svg";
import TwitterImage from "../assets/twitter.svg";
import Button from "../components/Button";
import {useDispatch} from "react-redux";
import {AuthCreators} from "../store/reducers_sagas/auth";

const LoginPage = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()

    const handleSubmit = (event: any) => {
        event.preventDefault()
        dispatch(AuthCreators.login())
    }

    return (
        <LoginPageContainer>
            <Image src={AuthImage} />
            <Divider />
            <Form onSubmit={handleSubmit}>
                <LogoImg src={Logo}/>
                <SiteName>WiiD - Working In Ideas</SiteName>
                <Input label={t('auth.usuario')} placeholder={t('auth.usuarioPlaceholder')} iconName={"fas fa-user"} />
                <Input label={t('auth.senha')} placeholder={t('auth.senhaPlaceholder')} type={'password'} iconName={"fas fa-unlock-alt"} />
                <SubmitButton type={'submit'} label={t('auth.entrar')} />
                <SocialMediaContainer>
                    <SocialMediaIcon src={FacebookImage} />
                    <SocialMediaIcon src={GooglePlusImage} />
                    <SocialMediaIcon src={LinkedinImage} />
                    <SocialMediaIcon src={TwitterImage} />
                </SocialMediaContainer>
            </Form>
        </LoginPageContainer>
    );
};

LoginPage.routeName = '/login'

export default LoginPage;


const LoginPageContainer = styled.div`
width: 80vw;
height: 80vh;
display: grid;
grid-template-columns: 1fr .3rem 1fr;
grid-gap: 2rem;
background-color: ${({theme}: ThemeInnerModel) => theme.bodySecundaryColor};
border-radius: .5rem;
margin: auto;
${BoxShadowDefault};
padding: 2rem;
overflow: hidden;
`

const Image = styled.img`
width: 50rem;
margin: auto;
`

const Divider = styled.div`
width: 100%;
height: 90%;
background-image: linear-gradient(to bottom, transparent, ${({theme}: ThemeInnerModel) => theme.primaryColor}, transparent);
`

const Form = styled.form`
${Column};
padding: 4rem;

& > div {
margin-bottom: 2rem;
}
`

const LogoImg = styled.img`
width: 10rem;
align-self: center;
margin-bottom: 2rem;
`

const SiteName = styled.span`
margin: 0 auto 4rem;
font-size: 2rem;
font-weight: 500;
`

const SubmitButton = styled(Button)`
padding: 2rem;
`

const SocialMediaContainer = styled.div`
${Row};
justify-content: center;
margin: 2rem 0;
`

const SocialMediaIcon = styled.img`
width: 5rem;
margin-left: 1.5rem;
cursor: pointer;
`