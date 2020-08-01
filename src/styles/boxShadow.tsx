import {css} from "styled-components";
import {ThemeInnerModel} from "../models/theme.model";

export const BoxShadowDefault = css`
box-shadow: 0 0 .5rem 0 ${({theme}: ThemeInnerModel) => theme.darkColor};
`

export const BoxShadowLight = css`
box-shadow: 0 0 .5rem 0 ${({theme}: ThemeInnerModel) => theme.ligthColor};
`