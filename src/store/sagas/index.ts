import {all} from 'redux-saga/effects'
import {authSaga} from "./auth";
import {dataSaga} from "./data";

function* rootSaga() {
    // @ts-ignore
    yield all([...authSaga(), ...dataSaga(),])
}

export default rootSaga

