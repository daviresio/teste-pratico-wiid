import React from 'react';
import styled, {css} from "styled-components";
import {Mail} from "../../models/mail.model";
import {Column, Row} from "../../styles/flex";
import AvatarContainer from "../../components/AvatarContainer";
import {stringToHashColor} from "../../util/color_util";

interface MailItemTypes {
    mail: Mail
}

const MailItem: React.FC<MailItemTypes> = ({children, mail}) => {

    const ajustUserPosition = (value: number): number => {
        if(value === 0) return 0
        return value * 1.5
    }

    return (
        <MailItemContainer>
            <MailTrailing>
                <Owner name={mail.owner}>{mail.owner}</Owner>
                <MailMainly>
                    <Name>{mail.name}</Name>
                    <Subject>{mail.subject}</Subject>
                    <SubmenuName>{'Caixa de entrada'}</SubmenuName>
                </MailMainly>
            </MailTrailing>
            <MailEnding>
                <Time>Hoje, 11:42</Time>
                <Time>-2 horas</Time>
                <UsersContainer>
                    {
                        mail.users.slice(0, 3).map((user, index) => <User key={user} name={user} left={ajustUserPosition(index)}>{user}</User>)
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
`

const Owner = styled(AvatarContainer)<{name: string}>`
background-color: ${({name}) => stringToHashColor(name)};
border-color: ${({name}) => stringToHashColor(name, 30, 80)};
`

const Name = styled.span`

`

const SecundaryText = css`
font-size: 1.4rem;
font-weight: 300;
`

const Subject = styled.span`
${SecundaryText};
margin: .8rem 0;
`

const SubmenuName = styled.span`
${SecundaryText};
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
}))<{left: number, name: string}>`
font-size: 1.2rem;
font-weight: 300;
position: absolute;
bottom: -3rem;
left: ${({left}) => `${left}rem`};
background-color: ${({name}) => stringToHashColor(name)};
border-color: ${({name}) => stringToHashColor(name, 30, 80)};
`