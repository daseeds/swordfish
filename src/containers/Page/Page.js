import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withFirebase } from '../../components/Firebase';

class Page extends Component {
    state = {
        loadedPage: null,
    };

    componentDidMount() {
        console.log(
            "[Page.js] componentDidMount",
            this.props.match.params.locale,
            this.props.match.params.page,
            this.props.menus
        );
        if (!this.props.menus) return;
        this.props.onPageLoad(
            this.props.match.params.locale,
            this.props.match.params.page,
            this.props.menus
        );
    }

    componentDidUpdate() {
        console.log("[Page.js] componentDidUpdate", this.props);
        // if (!this.props.locale) return;
        // if (!this.props.page) return;
        if (this.props.match.params.locale !== this.props.locale) {
            this.props.onLocaleChanged(this.props.match.params.locale);
        }
        if (this.props.match.params.link !== this.props.link) {
            this.props.onLinkChanged(this.props.match.params.link);
        }

        if (!this.props.menus) return;

        if (
            this.props.match.params.locale !== this.props.locale ||
            this.props.match.params.link !== this.props.link ||
            !this.props.page
        ) {
            this.props.onPageLoad(
                this.props.match.params.locale,
                this.props.match.params.link,
                this.props.menus
            );
        }
    }

    onAuthGoogleHandler = () => {
        if (this.props.isAuthenticated) {
            this.props.onSignOutGoogle(this.props.firebase);
        } else {
            this.props.onAuthGoogle(this.props.firebase);
        }
    };

    render() {
        let page = <Spinner />;
        let user = null;
        if (this.props.user) {
            console.log(this.props.user);
            user = this.props.user.displayName;
        }

        if (!this.props.loading && this.props.content) {
            page = <p> {JSON.stringify(this.props.content)} </p>;
        }
        if (this.props.page && !this.props.loading && !this.props.content) {
            page = (
                <p>
                    {" "}
                    {this.props.locale}/{this.props.page} - No content for this
                    page{" "}
                </p>
            );
        }
        if (this.props.error) {
            page = <p> {this.props.error} </p>;
        }

        return (
            <div>
                {page}
                <p>{user}</p>
                <button onClick={this.onAuthGoogleHandler}>Sign in</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.pages.loading,
        content: state.pages.content,
        error: state.pages.error,
        locale: state.pages.locale,
        page: state.pages.page,
        menus: state.navigation.nav,
        link: state.pages.link,
        user: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageLoad: (locale, page, menus) =>
            dispatch(actions.pageFetch(locale, page, menus)),
        onLocaleChanged: (locale) => dispatch(actions.pageSetLocale(locale)),
        onLinkChanged: (link) => dispatch(actions.pageSetLink(link)),
        onAuthGoogle: (firebase) => dispatch(actions.authGoogle(firebase)),
        onSignOutGoogle: (firebase) => dispatch(actions.signOutGoogle(firebase))
    };
};

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Page));
