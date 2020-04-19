import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DropDownItems from '../NavigationItems/DropDownItems/DropdownItems';


const toolbar = (props) => {
    let localesDropDown = null;
    let navigation = null;
    let currentLocaleName = null;
    let currentLocale = null;
    if (props.locales && props.currentLocale) {
        navigation = props.locales[props.currentLocale].menus;
        localesDropDown = props.locales;
        currentLocaleName = props.locales[props.currentLocale].name;
        currentLocale = props.currentLocale;
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
                    dropDownTitle={currentLocaleName}/>
            </nav>
        </header>
    )
}

export default toolbar

