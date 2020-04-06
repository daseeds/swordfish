import React from 'react';
import DropdownItem from './DropdownItem';

const DropdownItems = (props) => {
    return props.menu.menus.map(item => {
        return <DropdownItem menus={props.menus} menu={item} changed={props.changed} key={item.id} />;
    });
}

export default DropdownItems;