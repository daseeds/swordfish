import * as actions from "./actionsTypes";
import axios from "../../axios-swordfish";

export const settingsFetchSuccess = (settings) => {
    return {
        type: actions.SETTINGS_FETCH_SUCCESS,
        settings: settings,
    };
};

export const settingsFetchFail = (error) => {
    return {
        type: actions.SETTINGS_FETCH_FAILED,
        error: error,
    };
};

export const settingsFetchStart = () => {
    return {
        type: actions.SETTINGS_FETCH_START,
    };
};

export const settingsFetch = () => {
    return (dispatch) => {
        dispatch(settingsFetchStart());
        axios
            .get("/settings.json")
            .then((res) => {
                dispatch(settingsFetchSuccess(res.data));
            })
            .catch((err) => {
                dispatch(settingsFetchFail(err));
            });
    };
};
