import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Root from "./containers/Root/Root";
import Locale from "./containers/Locale/Locale";
import Page from "./containers/Page/Page";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { useEffect} from 'react';
import { withFirebase } from './components/Firebase';



const App = (props) => {
    useEffect(() => props.onTryAutoSignup(props.firebase));
    return (
        <div className="App">
            <Layout>
                <Switch>
                    <Route path="/:locale/:link" component={Page} />
                    <Route path="/:locale" component={Locale} />
                    <Route path="/" component={Root} />
                </Switch>
            </Layout>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: (firebase) => dispatch(actions.authCheckState(firebase)),
    };
};

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(App));
