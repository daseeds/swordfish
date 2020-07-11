import * as actions from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const signOutGoogle = (firebase) => {
    return (dispatch) => {
        firebase.doSignOut()
            .then(function () {
                dispatch(logout());
            })
            .catch(function (error) {
                dispatch(authFailed(error));
            });
    };
};

export const authGoogle = (firebase) => {
    return (dispatch) => {
        dispatch(authStart());
        firebase.doSignInWithGoogle()
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", JSON.stringify(user));
                const expirationTime = user.i.w;
                
                const expirationDate = new Date(
                     expirationTime
                );                
                console.log("expirationTime", expirationTime, expirationDate)
                firebase
                    .user(result.user.uid)
                    .set({
                        username: result.user.displayName,
                        email: result.user.email,
                        roles: {},
                    });                
                dispatch(authSuccess(token, user));
            })
            .catch(function (error) {
                dispatch(authFailed(error));
            });
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZE5x1dxbH64Hqdl1DYX0hGQgYFD4AnC4";
        if (!isSignup) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZE5x1dxbH64Hqdl1DYX0hGQgYFD4AnC4";
        }
        axios
            .post(url, authData)
            .then((response) => {
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.localId);
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFailed(err));
            });
    };
};

// export const setAuthRedirectPath = (path) => {
//     return {
//         type: actions.SET_AUTH_REDIRECT_PATH,
//         path: path,
//     };
// };

export const authCheckState = (firebase) => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        firebase.auth.onAuthStateChanged(user => {
            user ? dispatch(authSuccess(token, user))
            : dispatch(logout());
        })

    };
};
