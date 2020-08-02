import {all} from 'redux-saga/effects'
import {authSaga} from "./auth";
import {dataSaga} from "./data";
import {themeSaga} from "./theme";

function* rootSaga() {
    // @ts-ignore
    yield all([...authSaga(), ...dataSaga(), ...themeSaga()])
}

export default rootSaga

