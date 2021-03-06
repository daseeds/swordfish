import * as actions from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    error: null,
    locale: null,
    page: null,
    link: null,
    content: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PAGE_FETCH_START:
            return updateObject(state, { loading: true });
        case actions.PAGE_FETCH_FAILED:
            return updateObject(state, { loading: false, error: action.error });
        case actions.PAGE_FETCH_SUCCESS:
            return updateObject(state, {
                loading: false,
                page: action.page,
                content: action.content,
                error: null,
            });
        case actions.PAGE_SET_LOCALE:
            return updateObject(state, {
                locale: action.locale,
            });
        case actions.PAGE_SET_LINK:
            return updateObject(state, {
                link: action.link,
            });
        default:
            return state;
    }
};

export default reducer;
