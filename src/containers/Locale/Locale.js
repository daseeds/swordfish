import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getLinkFromPage} from "../../shared/utility"

const Locale = (props) => {
    let redirect = <Spinner />;
    if (props.settings && props.settings.landingPage && props.menus) {
        redirect = <Redirect to={"/" + props.match.params.locale + "/" + getLinkFromPage(props.settings.landingPage, props.match.params.locale, props.menus)} />;
    }
    
    return redirect;
};

const mapStateToProps = (state) => {
    return {
        settings: state.settings.settings,
        menus: state.navigation.nav,
    };
};

export default connect(
    mapStateToProps,
)(Locale);
