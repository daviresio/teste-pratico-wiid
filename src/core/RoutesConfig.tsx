import {history} from './storeRoutes'
import {ConnectedRouter} from 'connected-react-router'
import {Switch, Redirect} from 'react-router-dom'
import React from "react";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UnProtectedRoute from "./UnProtectedRoute";


const RoutesConfig = () => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <UnProtectedRoute path={LoginPage.routeName} component={LoginPage} />
                <ProtectedRoute path={DashboardPage.routeName + '/:submenuId'} component={DashboardPage} />
                <ProtectedRoute path={DashboardPage.routeName} component={DashboardPage} />
                <Redirect path={''} exact to={LoginPage.routeName} />
            </Switch>
        </ConnectedRouter>
    )
}

export default RoutesConfig

