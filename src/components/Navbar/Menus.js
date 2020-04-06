import React from 'react';
import Menu from './Menu';
import Dropdown from './Dropdown';

const Menus = (props) => {
    return props.menus.map((element, index) => {
        if (element.menus.length === 0 && element.menuId == null) {
            return <Menu menu={element} currentMenu={props.menu} changed={props.changed} locale={props.locale} key={element.id} />;
        } 
        if (element.menus.length > 0) {
            return <Dropdown menus={props.menus} menu={element} currentMenu={props.menu} changed={props.changed} locale={props.locale} key={element.id} />;
        }
        return null;
    });
}

export default Menus;