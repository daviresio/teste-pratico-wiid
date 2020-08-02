import {Action} from "../../models/action.model";
import {DataCreators} from './data'
import { all, takeEvery, put } from "redux-saga/effects";
import {push} from "connected-react-router";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import LoginPage from "../../pages/LoginPage";

const Actions = {
    LOGIN: 'auth/LOGIN',
    LOGOUT: 'auth/LOGOUT',
}

export const AuthCreators = {
    login: () => ({type: Actions.LOGIN}),
    logout: () => ({type: Actions.LOGOUT}),
}

export interface AuthStoreType {
    isLogged: boolean
}

const INITIAL_STATE: AuthStoreType = {
    isLogged: false
}

export const auth = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return {...state, isLogged: true}
        case Actions.LOGOUT:
            return {...state, isLogged: false}
        default:
            return state
    }
}


function* login() {
    yield put(push(DashboardPage.routeName))
    yield put(DataCreators.listMenus())
}

function* logout() {
    yield put(push(LoginPage.routeName))
}

export function* authSaga() {
    yield all([
        takeEvery(Actions.LOGIN, login),
        takeEvery(Actions.LOGOUT, logout),
    ])
}