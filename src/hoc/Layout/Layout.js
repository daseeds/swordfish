import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import axios from '../../axios-swordfish';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";


class Layout extends Component {


    componentDidMount() {
        console.log("[Layout.js] componentDidMount")
        this.props.onFectchNav();
        
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

        let loadingSpinner = null;
        if (this.props.loading) {
            loadingSpinner = <Spinner />;
        }             
        return (
            <Aux>
                {loadingSpinner}
                <Toolbar 
                    locale={this.props.locale} 
                    page={this.props.page} 
                    locales={this.props.nav}

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
        nav: state.nagivation.nav,
        loading: state.nagivation.loading,
        locale: state.nagivation.locale,
        page: state.nagivation.page,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFectchNav: () => dispatch(actions.navFetch()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Layout, axios));

