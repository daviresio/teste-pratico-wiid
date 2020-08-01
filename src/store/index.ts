import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore, compose} from "redux"
import rootReducers from "./rootReducers"
import rootSaga from "./sagas";
import localForage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {routerMiddleware} from "connected-react-router";
import {history} from '../core/storeRoutes'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
];


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage: localForage,
    stateReconciler: autoMergeLevel2,
}

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducers)



const configureStore = () => {
    const store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    )

    const persistor = persistStore(store)

    sagaMiddleware.run(rootSaga)

    return {store, persistor}
}

export default configureStore()
