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
        // if (
        //     this.props.match.params.locale !== this.props.locale ||
        //     this.props.match.params.page !== this.props.page
        // ) {
        //     this.props.onPageLoad(
        //         this.props.match.params.locale,
        //         this.props.match.params.page
        //     );
       // }
    }

    render() {
        let page = <Spinner />;

        if (!this.props.loading && this.props.content) {
            page = <p> {this.props.content} </p>;
        }

        if (this.props.error) {
            page = <p> {this.props.error} </p>;
        }

        return (
            <div>
                {navigator.language || navigator.userLanguage}
                {page}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.nagivation.pageLoading,
        content: state.nagivation.content,
        error: state.nagivation.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageLoad: (locale, page) =>
            dispatch(actions.navPageLoad(locale, page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
