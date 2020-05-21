import * as actions from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    error: null,
    settings: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SETTINGS_FETCH_START:
            return updateObject(state, { loading: true });
        case actions.SETTINGS_FETCH_FAILED:
            return updateObject(state, { loading: false, error: action.error });
        case actions.SETTINGS_FETCH_SUCCESS:
            return updateObject(state, {
                loading: false,
                settings: action.settings,
                error: null,
            });
        default:
            return state;
    }
};

export default reducer;
