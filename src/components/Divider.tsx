import styled from "styled-components";
import {ThemeInnerModel} from "../models/theme.model";

const Divider = styled.div`
width: 100%;
height: .1rem;
background-image: linear-gradient(to right, transparent, ${({theme}: ThemeInnerModel) => theme.darkColor}, transparent);
`

export default Divider