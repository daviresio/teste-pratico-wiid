import {Action} from "../../models/action.model";

const Actions = {
    TOOGLE: 'theme/TOOGLE'
}

export interface ThemeStoreType {
    isDarkThemeEnabled: boolean
}

const INITIAL_STATE: ThemeStoreType = {
    isDarkThemeEnabled: false
}

export const theme = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case Actions.TOOGLE:
            return {...state, isDarkThemeEnabled: !state.isDarkThemeEnabled}
        default:
            return state
    }
}
