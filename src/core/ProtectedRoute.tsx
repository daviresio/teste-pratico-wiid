import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import {State} from "../models/state.model";
import LoginPage from "../pages/LoginPage";

const ProtectedRoute = ({component: Component, ...rest}: any) => {

    const isLogged = useSelector((state: State) => state.auth.isLogged)

    return (
        <Route {...rest} render={(props: any) => isLogged ? <Component {...props} />
            : <Redirect to={{pathname: LoginPage.routeName, state: {from: props.location}}} />} />
    );
};

export default ProtectedRoute;
