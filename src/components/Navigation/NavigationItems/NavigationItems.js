import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import DropDownItems from './DropDownItems/DropdownItems';
import Spinner from '../../UI/Spinner/Spinner';

const navigationItems = (props) => {
    let items = <Spinner />;
    if (props.items) {
        items = Object.keys(props.items).map(itemKey => {
            if (props.items[itemKey].type === null || props.items[itemKey].type === "page") {
                return <NavigationItem 
                            key={props.items[itemKey].name}
                            url={'/'+props.currentLocale+'/'+props.items[itemKey].page} >{props.items[itemKey].name}</NavigationItem>
            }
            return <DropDownItems 
                        items={props.items[itemKey].menus} 
                        key={props.items[itemKey].name}
                        currentLocale={props.currentLocale}
                        dropDownTitle={props.items[itemKey].name}/>
        });
    }
    return (
        <ul className={classes.NavigationItems}>
            {items}
        </ul>
    );
}

export default navigationItems;