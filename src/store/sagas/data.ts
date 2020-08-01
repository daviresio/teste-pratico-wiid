import {Action} from "../../models/action.model";
import {Menu} from "../../models/menu.model";
import {all, put, takeEvery, call, takeLatest} from "redux-saga/effects";
import api from "../../core/network";
import {Mail} from "../../models/mail.model";

const Actions = {
    LIST_MENUS: 'data/LIST_MENUS',
    LIST_MENUS_SUCCESS: 'data/LIST_MENUS_SUCCESS',
    LIST_MAILS: 'data/LIST_MAILS',
    LIST_MAILS_SUCCESS: 'data/LIST_MAILS_SUCCESS',
}


export const DataCreators = {
    listMenus: () => ({type: Actions.LIST_MENUS}),
    listMenusSuccess: (menus: Menu[]) => ({type: Actions.LIST_MENUS_SUCCESS, payload: menus}),
    listMails: (subMenuId: number) => ({type: Actions.LIST_MAILS, payload: subMenuId}),
    listMailsSuccess: (mails: Mail[]) => ({type: Actions.LIST_MAILS_SUCCESS, payload: mails}),
}

export interface DataStoreType {
    itemsMenu: Menu[]
    mails: Mail[]
}

const INITIAL_STATE: DataStoreType = {
    itemsMenu: [],
    mails: [],
}

export const data = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case Actions.LIST_MENUS_SUCCESS:
            return {...state, itemsMenu: action.payload}
        case Actions.LIST_MAILS_SUCCESS:
            return {...state, mails: action.payload}
        default:
            return state
    }
}

function* listMenus() {
    const {data} = yield call(api.get, '/menus')
    yield put(DataCreators.listMenusSuccess(data))
}

function* listMails({payload}: Action) {
    const {data} = yield call(api.get, `/items/${payload}`)
    yield put(DataCreators.listMailsSuccess(data.subMenuItems))
}

export function* dataSaga() {
    yield all([
        takeLatest(Actions.LIST_MENUS, listMenus),
        takeLatest(Actions.LIST_MAILS, listMails),
    ])
}

