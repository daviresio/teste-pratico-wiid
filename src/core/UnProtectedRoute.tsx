import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import {State} from "../models/state.model";
import DashboardPage from "../pages/dashboard/DashboardPage";

const UnProtectedRoute = ({component: Component, ...rest}: any) => {

    const isLogged = useSelector((state: State) => state.auth.isLogged)

    return (
        <Route {...rest} render={(props: any) => !isLogged ? <Component {...props} />
            : <Redirect to={{pathname: DashboardPage.routeName, state: {from: props.location}}} />} />
    );
};

export default UnProtectedRoute;
