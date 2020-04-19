import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import axios from '../../axios-swordfish';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Page from '../../containers/Page/Page';


class Layout extends Component {
    state = {
        locale: 'fr',
        page: 'main',
        locales: null,
        loading: true
    }

    componentDidMount() {
        console.log("[Layout.js] componentDidMount")
        axios.get('/locales.json')
            .then(response => {
                this.setState({ locales: response.data, loading: false });
            })
            .catch(error => {
                this.setState({error: true, loading: false})
            });
    }
    componentDidUpdate(prevProps) {
        console.log("[Layout.js] componentDidUpdate")
        if (prevProps.match.params.page !== this.props.match.params.page) {
            console.log("[Layout.js] ", this.props.match.params);
            // BUG - page or menu ???
            this.setState({page: this.props.match.params.page})


        }
    }


    render() {
        if (this.props.match.params.locale && this.props.match.params.locale !== this.state.locale) {
            this.setState({locale: this.props.match.params.locale})
        }
        // if (this.props.match.params && this.props.match.params.page && this.props.match.params.page !== this.state.page) {
        //     this.setState((state, props) => ({page: props.match.params.page}));
        // }

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
                    {/* <Route path="/:locale/:page" exact component={Page} /> */}
                    <Page 
                        locale={this.state.locale}
                        page={this.state.page}
                        />
                </main>
            </Aux>
        )
    }
}

export default withErrorHandler(Layout, axios);

