import {ThemeStoreType} from "../store/sagas/theme";
import {AuthStoreType} from "../store/sagas/auth";
import {DataStoreType} from "../store/sagas/data";

export interface State {
    router: any
    theme: ThemeStoreType
    auth: AuthStoreType
    data: DataStoreType
}
