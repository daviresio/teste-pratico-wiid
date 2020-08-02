import React from 'react';
import ToogleThemeProvider from "./core/ToogleThemeProvider";
import GlobalStyles from "./styles/GlobalStyles";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import RoutesConfig from "./core/RoutesConfig";
import store from './store'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "./layout/Topbar";


function App() {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <ToogleThemeProvider>
                    <GlobalStyles/>
                    <Topbar />
                    <RoutesConfig/>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
                                    newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover/>
                </ToogleThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
