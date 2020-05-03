import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DropDownItems from "../NavigationItems/DropDownItems/DropdownItems";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import LocalesMenu from '../LocalesMenu/LocalesMenu';

const toolbar = (props) => {
    let localesDropDown = null;
    let menus = null;
   
    //let currentLocale = null;

    console.log("[Toolbar.js] ", props);



    if (props.menus) {
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
                        as={Link}
                        to={
                            "/" +
                            props.locale +
                            "/" +
                            props.menus[itemKey].url[props.locale]
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
                                props.menus[itemKey].menus[dropdownKey].url[
                                    props.locale
                                ]
                            }
                            to={
                                props.menus[itemKey].menus[dropdownKey].url[
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
                    title={props.menus[itemKey].name[props.locale]}
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
        //         <NavigationItems items={props.menus} locale={props.locale}/>
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
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="#home">
                    Le Manoir de Juganville
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">{menus}</Nav>
                    <Nav>
                        <LocalesMenu 
                            locales={props.locales} 
                            locale={props.locale}
                            menus={props.menus} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default toolbar;
