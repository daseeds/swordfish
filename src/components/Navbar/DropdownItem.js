import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

const DropdownItem = (props) => {
    var localizedName = props.menu.id;

    props.menus.forEach(menu => {
        if (menu.id === props.menu.id) {
          menu.localizedMenus.forEach(localizedMenu => {
            if (localizedMenu.localeId === props.locale) {
              localizedName = localizedMenu.name
            }
          })
        }
      })
    return <NavDropdown.Item href="#" onClick={() => props.changed(props.menu.id)}>{localizedName}</NavDropdown.Item>;

}

export default DropdownItem;