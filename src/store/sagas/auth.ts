import {Action} from "../../models/action.model";
import {DataCreators} from './data'
import { all, takeEvery, put } from "redux-saga/effects";
import {push} from "connected-react-router";
import DashboardPage from "../../pages/dashboard/DashboardPage";

const Actions = {
    LOGIN: 'auth/LOGIN',
    LOGOUT: 'auth/LOGOUT',
}

export interface AuthStoreType {
    isLogged: boolean
}

const INITIAL_STATE: AuthStoreType = {
    isLogged: true
}

export const auth = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return {...state, isLogged: true}
        default:
            return state
    }
}


function* login() {
    yield put(push(DashboardPage.routeName))
    yield put(DataCreators.listMenus())
}

export function* authSaga() {
    yield all([
        takeEvery(Actions.LOGIN, login),
    ])
}