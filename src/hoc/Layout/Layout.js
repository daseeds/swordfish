import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import axios from '../../axios-swordfish';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";


class Layout extends Component {


    componentDidMount() {
        console.log("[Layout.js] componentDidMount")
        this.props.onFectchNav();
        this.props.onFetchLocales();
        this.props.onFetchSettings();

        
    }
    componentDidUpdate(prevProps) {
        console.log("[Layout.js] componentDidUpdate")
        // if (prevProps.match.params.page !== this.props.match.params.page) {
        //     console.log("[Layout.js] ", this.props.match.params);
        //     // BUG - page or menu ???
        //     this.setState({page: this.props.match.params.page})
        // }
    }


    render() {
        // if (this.props.match.params.locale && this.props.match.params.locale !== this.state.locale) {
        //     this.setState({locale: this.props.match.params.locale})
        // }
        // if (this.props.match.params && this.props.match.params.page && this.props.match.params.page !== this.state.page) {
        //     this.setState((state, props) => ({page: props.match.params.page}));
        // }

          
        return (
            <Aux>
                <Toolbar 
                    locale={this.props.locale} 
                    page={this.props.page} 
                    menus={this.props.nav}
                    locales={this.props.locales}

                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.navigation.nav,
        loading: state.navigation.loading,
        locale: state.pages.locale,
        page: state.pages.page,
        locales: state.locales.locales
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFectchNav: () => dispatch(actions.navFetch()),
        onFetchLocales: () => dispatch(actions.localesFetch()),
        onFetchSettings: () => dispatch(actions.settingsFetch()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Layout, axios));

