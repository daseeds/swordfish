import * as actions from "./actionsTypes";
import axios from "../../axios-swordfish";

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

export const pageFetch = (locale, page) => {
    return (dispatch) => {
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

