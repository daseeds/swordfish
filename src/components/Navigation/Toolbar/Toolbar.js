import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = () => (
    <header className={classes.Toolbar}>

        {/* <div className={classes.Logo}>
            <Logo />
        </div> */}
        <nav  className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar
