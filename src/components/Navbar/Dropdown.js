import React from 'react';
import DropdownItems from './DropdownItems';
import NavDropdown from 'react-bootstrap/NavDropdown'

const Dropdown = (props) => {

  const rows = [];
  var localizedMenuName = props.menu.id;


  props.menu.localizedMenus.forEach(element => {
    if (element.localeId === props.locale) {
      localizedMenuName = element.name;
    }
  });

  return (
    <NavDropdown title={localizedMenuName} id="basic-nav-dropdown">
      <DropdownItems changed={props.changed} menus={props.menus} menu={props.menu} />
    </NavDropdown>

  )
}


export default Dropdown;