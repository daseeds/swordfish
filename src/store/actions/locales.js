import * as actions from "./actionsTypes";
import axios from "../../axios-swordfish";

export const localesFetchSuccess = (locales) => {
    return {
        type: actions.LOCALES_FETCH_SUCCESS,
        locales: locales,
    };
};

export const localesFetchFail = (error) => {
    return {
        type: actions.LOCALES_FETCH_FAILED,
        error: error,
    };
};

export const localesFetchStart = () => {
    return {
        type: actions.LOCALES_FETCH_START,
    };
};

export const localesFetch = () => {
    return (dispatch) => {
        dispatch(localesFetchStart());
        axios
            .get("/locales.json")
            .then((res) => {
                dispatch(localesFetchSuccess(res.data));
            })
            .catch((err) => {
                dispatch(localesFetchFail(err));
            });
    };
};
