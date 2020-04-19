import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import axios from '../../axios-swordfish';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Page from '../../containers/Page/Page';
import { Route } from 'react-router-dom';

class Layout extends Component {
    state = {
        locale: 'fr',
        page: 'main',
        locales: null,
        loading: true
    }

    componentDidMount() {
        axios.get('/locales.json')
            .then(response => {
                this.setState({ locales: response.data, loading: false });
            })
            .catch(error => {
                this.setState({error: true, loading: false})
            });
    }

    render() {
        let loadingSpinner = null;
        if (this.state.loading) {
            loadingSpinner = <Spinner />;
        }             
        return (
            <Aux>
                {loadingSpinner}
                <Toolbar 
                    currentLocale={this.state.locale} 
                    currentPage={this.state.page} 
                    locales={this.state.locales}

                    />
                <main className={classes.Content}>
                    <Route path="/:locale/:page" exact component={Page} />
                </main>
            </Aux>
        )
    }
}

export default withErrorHandler(Layout, axios);

