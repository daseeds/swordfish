import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import navigationReducer from "./store/reducers/navigation";
import pagesReducer from "./store/reducers/pages";
import localesReducer from "./store/reducers/locales";
import settingsReducer from "./store/reducers/settings";
import authReducer from "./store/reducers/auth";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";

import Firebase, { FirebaseContext } from "./components/Firebase";

const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;

const reducer = combineReducers({
    navigation: navigationReducer,
    pages: pagesReducer,
    locales: localesReducer,
    settings: settingsReducer,
    auth: authReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <FirebaseContext.Provider value={new Firebase()}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FirebaseContext.Provider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
