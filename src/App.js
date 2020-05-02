import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Root from "./containers/Root/Root";
import Locale from "./containers/Locale/Locale";
import Page from "./containers/Page/Page";

function App() {
    return (
        <div className="App">
            <Layout>
                <Switch>
                    <Route path="/:locale/:page" component={Page} />
                    <Route path="/:locale" component={Locale} />
                    <Route path="/" component={Root} />
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
