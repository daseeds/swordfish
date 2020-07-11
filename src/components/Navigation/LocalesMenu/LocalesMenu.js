import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import PlaceHolder from "../../UI/PlaceHolder/PlaceHolder";
import {getLinkFromPage} from "../../../shared/utility";

const LocalesMenu = (props) => {
    let locales = null;
    let localesMenuTitle = <PlaceHolder />;

    if (props.locales && props.locale && props.page && props.menus) {
        locales = Object.keys(props.locales).map((itemKey) => {
            return (
                <NavDropdown.Item
                    as={Link}
                    key={"locale-" + props.locales[itemKey].name}
                    to={"/" + itemKey + "/" + getLinkFromPage(props.page, itemKey, props.menus)}
                >
                    {props.locales[itemKey].name}
                </NavDropdown.Item>
            );
        });
        localesMenuTitle = (
            <NavDropdown
                alignRight
                title={props.locales[props.locale].name}
                id="basic-nav-dropdown"
            >
                {locales}
            </NavDropdown>
        );
    }
    return (<React.Fragment>{ localesMenuTitle }</React.Fragment>);
};

export default LocalesMenu;
