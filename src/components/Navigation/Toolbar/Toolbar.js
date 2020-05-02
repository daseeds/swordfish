import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DropDownItems from "../NavigationItems/DropDownItems/DropdownItems";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from 'react-router-dom'

const toolbar = (props) => {
    let localesDropDown = null;
    let navigation = null;
    let currentLocaleName = null;
    let menus = null;
    //let currentLocale = null;

    console.log("[Toolbar.js] ", props);

    if (props.locales) {
        navigation = props.locales; //[props.currentLocale].menus;
        localesDropDown = props.locales;
        currentLocaleName = "Francais"; //props.locales[props.currentLocale].name;
        //currentLocale = props.currentLocale;
        //TODO: Fix incoherence, layout gives a page and we need a menu
        // for (let [key] of Object.entries(localesDropDown)) {
        //     localesDropDown[key].page = localesDropDown[key].menus[props.currentPage].page;
        //     localesDropDown[key].locale = true;
        // }

        menus = Object.keys(props.locales).map((itemKey) => {
            if (
                props.locales[itemKey].type === null ||
                !props.locales[itemKey].menus
            ) {
                console.log(
                    "[NavigationItem] ",
                    props.locales[itemKey].name[props.locale]
                );
                return (
                    <Nav.Link
                        as={Link}
                        to={
                            "/" +
                            props.locale +
                            "/" +
                            props.locales[itemKey].url[props.locale]
                        }
                    >
                        {props.locales[itemKey].name[props.locale]}
                    </Nav.Link>
                );
            }
            const dropdown = Object.keys(props.locales[itemKey].menus).map(
                (dropdownKey) => {
                    return (
                        <NavDropdown.Item 
                            as={Link}
                            key={props.locales[itemKey].menus[dropdownKey].url[props.locale]}
                            to={props.locales[itemKey].menus[dropdownKey].url[props.locale]}>
                            {props.locales[itemKey].menus[dropdownKey].name[props.locale]}
                        </NavDropdown.Item>
                    );
                }
            );

            return (
                <NavDropdown
                    title={props.locales[itemKey].name[props.locale]}
                    id="basic-nav-dropdown"
                >
                    {dropdown}
                </NavDropdown>
            );
            // return <DropDownItems
            //             items={props.items[itemKey].menus}
            //             key={props.items[itemKey].name[props.locale]}
            //             locale={props.locale}
            //             dropDownTitle={props.items[itemKey].name[props.locale]}/>
        });
    }

    return (
        // <header className={classes.Toolbar}>

        //     <a className={classes.Brand} href="/">
        //         Le Manoir de Juganville
        //     </a>
        //     <nav className={classes.DesktopOnly}>
        //         <NavigationItems items={props.locales} locale={props.locale}/>
        //     </nav>
        //     {/* <nav className={classes.LocalesDropDown}>
        //         <DropDownItems
        //             items={localesDropDown}
        //             dropDownTitle={currentLocaleName}
        //             currentLocale={currentLocale}
        //             />
        //     </nav> */}
        // </header>
        // <div className={classes.root}>

        // </div>
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Le Manoir de Juganville</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {menus}

                </Nav>
                <Nav>
                    <NavDropdown
                        alignRight
                        title="Dropdown"
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item href="#action/3.1">
                            Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                            Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default toolbar;
