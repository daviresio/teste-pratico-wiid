import styled from "styled-components";
import {Row} from "../styles/flex";
import {ThemeInnerModel} from "../models/theme.model";

const AvatarContainer = styled.div<{size?: string, ref?: any}>`
${Row};
justify-content: center;
width: ${({size = '5rem'}) => size};
height: ${({size = '5rem'}) => size};
border-radius: 50%;
background-color: ${({theme}: ThemeInnerModel) => theme.bodyColor};
border: .1rem solid ${({theme}: ThemeInnerModel) => theme.ligthColor};
cursor: pointer;
position: relative;
`

export default AvatarContainer