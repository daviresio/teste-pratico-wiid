import {Action} from "../../models/action.model";
import {all, takeEvery} from "redux-saga/effects";
import i18n from "../../i18n";

const Actions = {
    TOOGLE_THEME: 'theme/TOOGLE_THEME',
    TOOGLE_DRAWER: 'theme/TOOGLE_DRAWER',
    CHANGE_LANGUAGE: 'theme/CHANGE_LANGUAGE'
}

export const ThemeCreators = {
    toogleTheme: () => ({type: Actions.TOOGLE_THEME}),
    toogleDrawer: () => ({type: Actions.TOOGLE_DRAWER}),
    changeLanguage: (language: string) => ({type: Actions.CHANGE_LANGUAGE, payload: language}),
}

export interface ThemeStoreType {
    isDarkThemeEnabled: boolean
    isDrawerOpened: boolean
    language: string
}

const INITIAL_STATE: ThemeStoreType = {
    isDarkThemeEnabled: false,
    isDrawerOpened: true,
    language: 'pt',
}

export const theme = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case Actions.TOOGLE_THEME:
            return {...state, isDarkThemeEnabled: !state.isDarkThemeEnabled}
        case Actions.TOOGLE_DRAWER:
            return {...state, isDrawerOpened: !state.isDrawerOpened}
        case Actions.CHANGE_LANGUAGE:
            return {...state, language: action.payload}
        default:
            return state
    }
}

function* changeLanguage({payload}: Action) {
    yield i18n.changeLanguage(payload)
}

export function* themeSaga() {
    yield all([
        takeEvery(Actions.CHANGE_LANGUAGE, changeLanguage),
    ])
}
