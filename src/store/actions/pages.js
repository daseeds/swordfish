import * as actions from "./actionsTypes";
import axios from "../../axios-swordfish";
import {getPageFromLink} from "../../shared/utility"

export const pageFetchStart = () => {
    return {
        type: actions.PAGE_FETCH_START,
    };    
};

export const pageFetchFail = (error) => {
    return {
        type: actions.PAGE_FETCH_FAILED,
        error: error,
    };        
};

export const pageFetchSuccess = (locale, page, content) => {
    return {
        type: actions.PAGE_FETCH_SUCCESS,
        page: page,
        locale: locale,
        content: content
    };        
};

export const pageFetch = (locale, link, menus) => {
    const page = getPageFromLink(link, locale, menus);
    if (!page) {
        return (dispatch) => dispatch(pageFetchFail("No page for this link"));
    }
    return (dispatch) => {
        console.log("[PageReducer] Fetch page "+ page);
        dispatch(pageFetchStart(locale, page));
        axios
            .get("/pages/" + page + ".json")
            .then((res) => {
                dispatch(pageFetchSuccess(locale, page, res.data));
            })
            .catch((err) => {
                dispatch(pageFetchFail(err));
            });        
    };
};

export const pageSetLocale = (locale) => {
    return {
        type: actions.PAGE_SET_LOCALE,
        locale: locale,
    };        
};

export const pageSetLink = (link) => {
    return {
        type: actions.PAGE_SET_LINK,
        link: link,
    };        
};