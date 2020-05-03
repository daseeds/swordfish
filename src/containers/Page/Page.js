import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Page extends Component {
    state = {
        loadedPage: null,
    };

    componentDidMount() {
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
        if (this.props.match.params.locale !== this.props.locale)
        {
            this.props.onLocaleChanged(this.props.match.params.locale);
        }
        // TODO: Solve ambiguity between link and page

        if (!this.props.menus) return;
        if ((!this.props.locale || this.props.match.params.locale !== this.props.locale) &&
        (!this.props.page || this.props.match.params.page !== this.props.page)
        ) {
            this.props.onPageLoad(
                this.props.match.params.locale,
                this.props.match.params.page,
                this.props.menus
            );
        }
    }

    render() {
        let page = <Spinner />;

        if (!this.props.loading && this.props.content) {
            page = <p> {JSON.stringify(this.props.content)} </p>;
        }
        if (!this.props.loading && !this.props.content) {
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

        return <div>{page}</div>;
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageLoad: (locale, page, menus) =>
            dispatch(actions.pageFetch(locale, page, menus)),
        onLocaleChanged: (locale) => dispatch(actions.pageSetLocale(locale))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
