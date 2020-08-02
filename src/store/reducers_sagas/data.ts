import {Action} from "../../models/action.model";
import {Menu} from "../../models/menu.model";
import {all, put, call, takeLatest, takeEvery, select} from "redux-saga/effects";
import api from "../../core/network";
import {Mail} from "../../models/mail.model";
import {State} from "../../models/state.model";
import {toast} from "react-toastify";

const Actions = {
    LIST_MENUS: 'data/LIST_MENUS',
    LIST_MENUS_SUCCESS: 'data/LIST_MENUS_SUCCESS',
    LIST_MAILS: 'data/LIST_MAILS',
    LIST_MAILS_SUCCESS: 'data/LIST_MAILS_SUCCESS',
    SELECT_ITEM_FOR_EDIT: 'data/SELECT_ITEM_FOR_EDIT',
    REMOVE_ITEM_FOR_EDIT: 'data/REMOVE_ITEM_FOR_EDIT',
    HANDLE_SELECT_OR_REMOVE_ALL_FOR_EDIT: 'data/HANDLE_SELECT_OR_REMOVE_ALL_FOR_EDIT',
    SELECT_ALL_ITEMS_FOR_EDIT: 'data/SELECT_ALL_ITEMS_FOR_EDIT',
    REMOVE_ALL_ITEMS_FOR_EDIT: 'data/REMOVE_ALL_ITEMS_FOR_EDIT',
    ARCHIVE_MAILS: 'data/ARCHIVE_MAILS',
}

export const DataCreators = {
    listMenus: () => ({type: Actions.LIST_MENUS}),
    listMenusSuccess: (menus: Menu[]) => ({type: Actions.LIST_MENUS_SUCCESS, payload: menus}),
    listMails: (subMenuId: number) => ({type: Actions.LIST_MAILS, payload: subMenuId}),
    listMailsSuccess: (mails: Mail[]) => ({type: Actions.LIST_MAILS_SUCCESS, payload: mails}),
    selectItemForEdit: (itemId: string) => ({type: Actions.SELECT_ITEM_FOR_EDIT, payload: itemId}),
    removeItemForEdit: (itemId: string) => ({type: Actions.REMOVE_ITEM_FOR_EDIT, payload: itemId}),
    selectOrRemoveAllItensForEdit: () => ({type: Actions.HANDLE_SELECT_OR_REMOVE_ALL_FOR_EDIT}),
    selectAllItemsForEdit: () => ({type: Actions.SELECT_ALL_ITEMS_FOR_EDIT}),
    removeAllItemsForEdit: () => ({type: Actions.REMOVE_ALL_ITEMS_FOR_EDIT}),
    archiveMails: () => ({type: Actions.ARCHIVE_MAILS}),
}

export interface DataStoreType {
    itemsMenu: Menu[]
    mails: Mail[]
    selectedItens: string[]
}

const INITIAL_STATE: DataStoreType = {
    itemsMenu: [],
    mails: [],
    selectedItens: []
}

export const data = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case Actions.LIST_MENUS_SUCCESS:
            return {...state, itemsMenu: action.payload}
        case Actions.LIST_MAILS_SUCCESS:
            return {...state, mails: action.payload}
        case Actions.SELECT_ITEM_FOR_EDIT:
            return {...state, selectedItens: [...state.selectedItens, action.payload]}
        case Actions.REMOVE_ITEM_FOR_EDIT:
            return {...state, selectedItens: state.selectedItens.filter((item) => item !== action.payload)}
        case Actions.SELECT_ALL_ITEMS_FOR_EDIT:
            return {...state, selectedItens: state.mails.map((mail) => mail.id)}
        case Actions.REMOVE_ALL_ITEMS_FOR_EDIT:
            return {...state, selectedItens: []}
        case Actions.ARCHIVE_MAILS:
            return {
                ...state, selectedItens: [], mails: state.mails.filter((mail) =>
                    !state.selectedItens.some((itemId) => itemId === mail.id))
            }
        default:
            return state
    }
}

function* listMenus() {
    try {
        const {data} = yield call(api.get, '/menus')
        yield put(DataCreators.listMenusSuccess(data))
    } catch (e) {
        toast.error('🙉 Ocorreu um erro no servidor')
    }
}

function* listMails({payload}: Action) {
    try {
        const {data} = yield call(api.get, `/items/${payload}`)
        yield put(DataCreators.listMailsSuccess(data.subMenuItems))
    } catch (e) {
        toast.error('🙉 Ocorreu um erro no servidor')
    }
}

function* selectOrRemoveAll({payload}: Action) {
    const {selectedItens, mails}: { selectedItens: string[], mails: Mail[] } = yield select((state: State) => {
        return {
            selectedItens: state.data.selectedItens,
            mails: state.data.mails,
        }
    })

    if (selectedItens.length === mails.length) {
        yield put(DataCreators.removeAllItemsForEdit())
    } else {
        yield put(DataCreators.selectAllItemsForEdit())
    }

}

export function* dataSaga() {
    yield all([
        takeLatest(Actions.LIST_MENUS, listMenus),
        takeLatest(Actions.LIST_MAILS, listMails),
        takeEvery(Actions.HANDLE_SELECT_OR_REMOVE_ALL_FOR_EDIT, selectOrRemoveAll),
    ])
}

