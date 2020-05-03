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
