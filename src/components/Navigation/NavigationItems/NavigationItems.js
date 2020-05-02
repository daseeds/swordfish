import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import DropDownItems from './DropDownItems/DropdownItems';
import Spinner from '../../UI/Spinner/Spinner';

const navigationItems = (props) => {
    let items = <Spinner />;
    if (props.items) {
        items = Object.keys(props.items).map(itemKey => {
            if (props.items[itemKey].type === null || !props.items[itemKey].menus) {
                console.log("[NavigationItem] ", props.items[itemKey].name[props.locale])
                return <NavigationItem 
                            key={props.items[itemKey].name[props.locale]}
                            url={'/'+props.locale+'/'+props.items[itemKey].url[props.locale]}
                            locale={props.locale} >{props.items[itemKey].name[props.locale]}</NavigationItem>
            }
            return <DropDownItems 
                        items={props.items[itemKey].menus} 
                        key={props.items[itemKey].name[props.locale]}
                        locale={props.locale}
                        dropDownTitle={props.items[itemKey].name[props.locale]}/>
        });
    }
    return (
        <ul className={classes.NavigationItems}>
            {items}
        </ul>
    );
}

export default navigationItems;