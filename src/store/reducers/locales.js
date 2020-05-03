import * as actions from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    error: null,
    locales: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOCALES_FETCH_START:
            return updateObject(state, { loading: true });
        case actions.LOCALES_FETCH_FAILED:
            return updateObject(state, { loading: false, error: action.error });
        case actions.LOCALES_FETCH_SUCCESS:
            return updateObject(state, {
                loading: false,
                locales: action.locales,
                error: null,
            });
        default:
            return state;
    }
};

export default reducer;
