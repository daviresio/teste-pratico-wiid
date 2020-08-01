import React from 'react';
import ToogleThemeProvider from "./core/ToogleThemeProvider";
import GlobalStyles from "./styles/GlobalStyles";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import RoutesConfig from "./core/RoutesConfig";
import store from './store'


function App() {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <ToogleThemeProvider>
                    <GlobalStyles />
                        <RoutesConfig/>
                </ToogleThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
