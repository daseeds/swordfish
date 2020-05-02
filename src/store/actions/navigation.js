import * as actions from "./actionsTypes";
import axios from "../../axios-swordfish";

export const navFetchSuccess = (nav) => {
    return {
        type: actions.NAV_FETCH_SUCCESS,
        nav: nav,
    };
};

export const navFetchFail = (error) => {
    return {
        type: actions.NAV_FETCH_FAILED,
        error: error,
    };
};

export const navFetchStart = () => {
    return {
        type: actions.NAV_FETCH_START,
    };
};

export const navFetch = () => {
    return (dispatch) => {
        dispatch(navFetchStart());
        axios
            .get("/menus.json")
            .then((res) => {
                dispatch(navFetchSuccess(res.data));
            })
            .catch((err) => {
                dispatch(navFetchFail(err));
            });
    };
};

export const navPageLoadStart = () => {
    return {
        type: actions.NAV_PAGE_LOAD_START,
    };    
};

export const navPageLoadFail = (error) => {
    return {
        type: actions.NAV_PAGE_LOAD_FAILED,
        error: error,
    };        
};

export const navPageLoadSuccess = (locale, page, content) => {
    return {
        type: actions.NAV_PAGE_LOAD_SUCCESS,
        page: page,
        locale: locale,
        content: content
    };        
};

export const navPageLoad = (locale, page) => {
    return (dispatch) => {
        dispatch(navPageLoadStart(locale, page));
        axios
            .get("/pages/" + page + ".json")
            .then((res) => {
                dispatch(navPageLoadSuccess(locale, page, res.data));
            })
            .catch((err) => {
                dispatch(navPageLoadFail(err));
            });        
    };
};
