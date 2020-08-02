import {ThemeStoreType} from "../store/reducers_sagas/theme";
import {AuthStoreType} from "../store/reducers_sagas/auth";
import {DataStoreType} from "../store/reducers_sagas/data";

export interface State {
    router: any
    theme: ThemeStoreType
    auth: AuthStoreType
    data: DataStoreType
}
