import React from "react";
//import classes from "./Toolbar.module.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import LocalesMenu from "../LocalesMenu/LocalesMenu";
import Button from "react-bootstrap/Button";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Modal from "../../UI/Modal/Modal";

const toolbar = (props) => {
    let menus = null;

    //let currentLocale = null;

    console.log("[Toolbar.js] ", props);

    if (props.menus && props.locale) {
        //currentLocale = props.currentLocale;
        //TODO: Fix incoherence, layout gives a page and we need a menu
        // for (let [key] of Object.entries(localesDropDown)) {
        //     localesDropDown[key].page = localesDropDown[key].menus[props.currentPage].page;
        //     localesDropDown[key].locale = true;
        // }

        menus = Object.keys(props.menus).map((itemKey) => {
            if (
                props.menus[itemKey].type === null ||
                !props.menus[itemKey].menus
            ) {
                console.log(
                    "[NavigationItem] ",
                    props.menus[itemKey].name[props.locale]
                );
                return (
                    <Nav.Link
                        key={"link-" + itemKey}
                        as={Link}
                        to={
                            "/" +
                            props.locale +
                            "/" +
                            props.menus[itemKey].link[props.locale]
                        }
                    >
                        {props.menus[itemKey].name[props.locale]}
                    </Nav.Link>
                );
            }
            const dropdown = Object.keys(props.menus[itemKey].menus).map(
                (dropdownKey) => {
                    return (
                        <NavDropdown.Item
                            as={Link}
                            key={
                                props.menus[itemKey].menus[dropdownKey].link[
                                    props.locale
                                ]
                            }
                            to={
                                props.menus[itemKey].menus[dropdownKey].link[
                                    props.locale
                                ]
                            }
                        >
                            {
                                props.menus[itemKey].menus[dropdownKey].name[
                                    props.locale
                                ]
                            }
                        </NavDropdown.Item>
                    );
                }
            );

            return (
                <NavDropdown
                    key={"NavDropdown-" + itemKey}
                    title={props.menus[itemKey].name[props.locale]}
                    id="basic-nav-dropdown"
                >
                    {dropdown}
                </NavDropdown>
            );
        });
    }

    let buttonAdd = null;
    if (props.isAuthenticated) {
        buttonAdd = (
            <Button size="sm" variant="success">
                +
            </Button>
        );
    }

    let form = null;

    return (
        <header>
            <Modal show={false}>{form}</Modal>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="#home">
                    Le Manoir de Juganville
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {menus}
                        {buttonAdd}
                    </Nav>
                    <Nav>
                        <LocalesMenu
                            locales={props.locales}
                            locale={props.locale}
                            menus={props.menus}
                            page={props.page}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(toolbar);
