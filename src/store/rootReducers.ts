import {combineReducers} from "redux";
import {theme} from "./sagas/theme";
import {auth} from "./sagas/auth";
import {connectRouter} from "connected-react-router";
import {history} from "../core/storeRoutes";
import {data} from "./sagas/data";

const rootReducers = combineReducers({
    router: connectRouter(history),
    theme,
    auth,
    data,
})

export default rootReducers

