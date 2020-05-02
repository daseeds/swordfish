import * as actions from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    nav: null,
    loading: false,
    error: null,
    locale: null,
    page: null,
    content: null,
    pageLoading: false,
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
        case actions.NAV_PAGE_LOAD_START:
            return updateObject(state, { pageLoading: true });
        case actions.NAV_PAGE_LOAD_FAILED:
            return updateObject(state, { pageLoading: false, error: action.error });
        case actions.NAV_PAGE_LOAD_SUCCESS:
            return updateObject(state, {
                pageLoading: false,
                locale: action.locale,
                page: action.page,
                content: action.content,
                error: null,
            });
        default:
            return state;
    }
};

export default reducer;
