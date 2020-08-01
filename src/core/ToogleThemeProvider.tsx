import React from 'react';
import { useSelector } from 'react-redux'
import {State} from "../models/state.model";
import { ThemeProvider } from "styled-components";
import {darkTheme, lightTheme} from "../styles/themeVariables";

const ToogleThemeProvider: React.FC = ({children}) => {

    const isDarkThemeEnabled = useSelector((state: State) => state.theme.isDarkThemeEnabled)

    return (
        <ThemeProvider theme={isDarkThemeEnabled ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    );
};

export default ToogleThemeProvider;
