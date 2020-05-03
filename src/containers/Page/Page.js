import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Page extends Component {
    state = {
        loadedPage: null,
    };

    componentDidMount() {
        this.props.onPageLoad(
            this.props.match.params.locale,
            this.props.match.params.page
        );
    }

    componentDidUpdate() {
        console.log("[Page.js] componentDidUpdate", this.props)
        if (
            this.props.match.params.locale !== this.props.locale ||
            this.props.match.params.page !== this.props.page
        ) {
            this.props.onPageLoad(
                this.props.match.params.locale,
                this.props.match.params.page
            );
       }
    }

    render() {
        let page = <Spinner />;

        if (!this.props.loading && this.props.content) {
            page = <p> {JSON.stringify(this.props.content)} </p>;
        }
        if (!this.props.loading && !this.props.content) {
            page = <p> {this.props.locale}/{this.props.page} - No content for this page </p>;
        }        
        if (this.props.error) {
            page = <p> {this.props.error} </p>;
        }

        return (
            <div>
                {page}
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
        page: state.pages.page
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageLoad: (locale, page) =>
            dispatch(actions.pageFetch(locale, page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
