import React from "react";
import { Redirect } from "react-router-dom";
import { getUserLocale } from "../../shared/utility";

const Root = () => {
    const userLocale = getUserLocale();
    if (userLocale) {
        return <Redirect to={"/" + userLocale} />;
    }

    return <Redirect to="/fr" />;
};

export default Root;
