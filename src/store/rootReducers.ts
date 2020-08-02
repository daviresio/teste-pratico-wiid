import {combineReducers} from "redux";
import {theme} from "./reducers_sagas/theme";
import {auth} from "./reducers_sagas/auth";
import {connectRouter} from "connected-react-router";
import {history} from "../core/storeRoutes";
import {data} from "./reducers_sagas/data";

const rootReducers = combineReducers({
    router: connectRouter(history),
    theme,
    auth,
    data,
})

export default rootReducers

