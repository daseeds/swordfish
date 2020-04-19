import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DropDownItems from '../NavigationItems/DropDownItems/DropdownItems';


const toolbar = (props) => {
    let localesDropDown = null;
    let navigation = null;
    let currentLocaleName = null;
    let currentLocale = null;
    console.log("[Toolbar.js] ", props)
    if (props.locales && props.currentLocale && props.currentPage) {
        navigation = props.locales[props.currentLocale].menus;
        localesDropDown = props.locales;
        currentLocaleName = props.locales[props.currentLocale].name;
        currentLocale = props.currentLocale;
        //TODO: Fix incoherence, layout gives a page and we need a menu
        for (let [key] of Object.entries(localesDropDown)) {
            localesDropDown[key].page = localesDropDown[key].menus[props.currentPage].page;
            localesDropDown[key].locale = true;
        }
    }
    return (
        <header className={classes.Toolbar}>

            <a className={classes.Brand} href="/">
                Le Manoir de Juganville
            </a>
            <nav className={classes.DesktopOnly}>
                <NavigationItems items={navigation} currentLocale={currentLocale}/>
            </nav>
            <nav className={classes.LocalesDropDown}>
                <DropDownItems 
                    items={localesDropDown} 
                    dropDownTitle={currentLocaleName}
                    currentLocale={currentLocale}
                    />
            </nav>
        </header>
    )
}

export default toolbar

