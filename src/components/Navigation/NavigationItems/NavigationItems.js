import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import DropDownItems from './DropDownItems/DropdownItems';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/" active>
            Bed & Breakfast
        </NavigationItem>
        <DropDownItems dropDownTitle="The Rooms" />
        <NavigationItem
            link="/">
            Activity
        </NavigationItem>
    </ul>
);

export default navigationItems;