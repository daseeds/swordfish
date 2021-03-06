import * as actions from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    nav: null,
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NAV_FETCH_START:
            return updateObject(state, { loading: true });
        case actions.NAV_FETCH_FAILED:
            return updateObject(state, { loading: false, error: action.error });
        case actions.NAV_FETCH_SUCCESS:
            return updateObject(state, {
                nav: action.nav,
                loading: false,
                error: null,
            });
        default:
            return state;
    }
};

export default reducer;
