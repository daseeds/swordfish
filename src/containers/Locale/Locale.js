import React from "react";
import { Redirect } from "react-router-dom";

const Locale = (props) => {
    return <Redirect to={"/" + props.match.params.locale + "/test"} />;
};

export default Locale;
